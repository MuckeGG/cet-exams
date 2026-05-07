import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import { getPaperById } from '../data/examPapers'
import { gradeAnswers, calculateScore, saveGradingResult, getGradingResult } from '../utils/grading'
import { recordMultipleMistakes } from '../utils/errorTracking'
import { addWord } from '../utils/vocabulary'
import { lookupWord } from '../utils/dictionary'
import { getAnswers, hasAnswers } from '../data/answers'
import { getWritingData } from '../data/writing'
import { getTranslationData } from '../data/translation'
import { useAnnotation } from '../hooks/useAnnotation'
import AnnotationCanvas from './AnnotationCanvas'
import AnnotationToolbar from './AnnotationToolbar'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const PROGRESS_KEY = 'cet_progress'

const loadProgress = (paperId, setIndex) => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      return data[`${paperId}-${setIndex}`] || 0
    }
  } catch {}
  return 0
}

const saveProgress = (paperId, setIndex, progress) => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    const data = stored ? JSON.parse(stored) : {}
    data[`${paperId}-${setIndex}`] = progress
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data))
  } catch {}
}

const ExamDetail = () => {
  const { type, id } = useParams()
  const paper = getPaperById(id)
  const [selectedSet, setSelectedSet] = useState(0)
  const [pdfScale, setPdfScale] = useState(1.0)
  const [numPages, setNumPages] = useState(null)
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef(null)

  // 答题/批改状态
  const [mode, setMode] = useState('view') // 'view' | 'answer' | 'result'
  const [userAnswers, setUserAnswers] = useState({ listening: [], reading: [], writing: '', translation: '' })
  const [gradingResult, setGradingResult] = useState(null)

  // 文本选择状态
  const [selectionPopup, setSelectionPopup] = useState(null) // { x, y, text, context }

  // 写作和翻译数据
  const writingData = paper ? getWritingData(paper.id) : null
  const translationData = paper ? getTranslationData(paper.id) : null
  const [showModelEssay, setShowModelEssay] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)

  // 标注系统
  const {
    activeTool, setActiveTool, strokeColor, setStrokeColor,
    strokeWidth, setStrokeWidth, pageStrokes, isDrawingMode,
    addStroke, undo, clearAllAnnotations, canUndo, hasAnnotations
  } = useAnnotation(paper?.id, selectedSet, pdfScale)

  // Load saved progress when set changes
  useEffect(() => {
    if (paper) {
      setProgress(loadProgress(paper.id, selectedSet))
    }
  }, [paper, selectedSet])

  // 加载已保存的批改结果
  useEffect(() => {
    if (paper) {
      const saved = getGradingResult(paper.id, selectedSet)
      if (saved) {
        setGradingResult(saved)
        setMode('result')
      }
    }
  }, [paper, selectedSet])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const saveTimerRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const maxScroll = scrollHeight - clientHeight
    const pct = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : (scrollTop > 0 ? 100 : 0)
    setProgress(pct)
    if (paper) {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        saveProgress(paper.id, selectedSet, pct)
      }, 1000)
    }
  }, [paper, selectedSet])

  // Throttled scroll tracking + close selection popup on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let ticking = false
    const onScroll = () => {
      setSelectionPopup(null)
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  if (!paper) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">试卷不存在</h2>
          <Link to="/exam" className="text-blue-600 hover:underline">
            返回历年真题
          </Link>
        </div>
      </div>
    )
  }

  const currentSet = paper.sets?.[selectedSet]
  const answers = getAnswers(paper.id, selectedSet)

  // 选择答案
  const handleSelectAnswer = (section, index, value) => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev }
      if (section === 'listening' || section === 'reading') {
        newAnswers[section] = [...(prev[section] || [])]
        newAnswers[section][index] = value
      } else {
        newAnswers[section] = value
      }
      return newAnswers
    })
  }

  // 提交批改
  const handleSubmitGrading = () => {
    if (!answers) {
      alert('暂无答案数据')
      return
    }

    const results = gradeAnswers(userAnswers, answers)
    const score = calculateScore(results)
    const totalScore = calculateScore(results)

    // 保存批改结果
    saveGradingResult(paper.id, selectedSet, userAnswers, results, totalScore)

    // 记录错题
    const mistakeList = []
    const { listening, reading } = results

    if (listening) {
      listening.forEach((correct, i) => {
        if (!correct) {
          mistakeList.push({
            questionId: `${paper.id}-${selectedSet}-听力-${i + 1}`,
            paperId: paper.id,
            setIndex: selectedSet,
            type: '听力',
            questionNum: i + 1,
            userAnswer: userAnswers.listening[i] || '未答',
            correctAnswer: answers.listening[i]
          })
        }
      })
    }

    if (reading) {
      reading.forEach((correct, i) => {
        if (!correct) {
          mistakeList.push({
            questionId: `${paper.id}-${selectedSet}-阅读-${i + 1}`,
            paperId: paper.id,
            setIndex: selectedSet,
            type: '阅读',
            questionNum: i + 1,
            userAnswer: userAnswers.reading[i] || '未答',
            correctAnswer: answers.reading[i]
          })
        }
      })
    }

    if (mistakeList.length > 0) {
      recordMultipleMistakes(mistakeList)
    }

    setGradingResult({ results, score: totalScore, mistakeCount: mistakeList.length })
    setMode('result')
  }

  // 添加到生词本
  const handleAddToVocabulary = async (word, context = '') => {
    // 先查询词典
    const dictData = await lookupWord(word)
    const result = addWord(word, context, paper.id, dictData)
    if (result.success) {
      const msg = dictData?.definitions?.[0]
        ? `"${word}" 已添加到生词本\n${dictData.phonetic || ''}\n${dictData.definitions[0].definition}`
        : `"${word}" 已添加到生词本`
      alert(msg)
    } else {
      alert(result.message)
    }
    setSelectionPopup(null)
  }

  // 处理PDF文本选择
  const handleTextSelection = useCallback((e) => {
    const selection = window.getSelection()
    const text = selection?.toString().trim()
    if (!text || text.length < 2 || text.length > 50) {
      setSelectionPopup(null)
      return
    }
    // 只选择英文单词
    if (!/^[a-zA-Z\s'-]+$/.test(text)) {
      setSelectionPopup(null)
      return
    }
    // 获取选区位置
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const containerRect = scrollRef.current?.getBoundingClientRect()
    if (!containerRect) return

    // 提取上下文句子
    let context = ''
    try {
      const parentText = range.startContainer.parentElement?.textContent || ''
      const start = Math.max(0, parentText.lastIndexOf('.', range.startOffset) + 1)
      const end = parentText.indexOf('.', range.endOffset)
      context = parentText.slice(start, end === -1 ? undefined : end + 1).trim()
    } catch {}

    setSelectionPopup({
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top - containerRect.top - 10,
      text: text.split(/\s+/)[0], // 取第一个单词
      context
    })
  }, [])

  // 重新答题
  const handleRetry = () => {
    setUserAnswers({ listening: [], reading: [], writing: '', translation: '' })
    setGradingResult(null)
    setMode('answer')
  }

  const correctListening = gradingResult?.results?.listening?.filter(r => r).length || 0
  const correctReading = gradingResult?.results?.reading?.filter(r => r).length || 0
  const totalListening = gradingResult?.results?.listening?.length || 25
  const totalReading = gradingResult?.results?.reading?.length || 20

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-neutral-200 sticky top-0 bg-white z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-2 sm:py-0 sm:h-14">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to={`/exam/${type}`}
                className="text-sm sm:text-base text-neutral-500 hover:text-black transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">返回</span>
              </Link>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="font-bold text-sm sm:text-base">
                {paper.year}年{paper.session} {paper.type}
              </span>
            </div>
            <div className="flex items-center gap-2 pb-1 sm:pb-0">
              {/* 模式切换按钮 */}
              {mode === 'view' && hasAnswers(paper.id, selectedSet) && (
                <button
                  onClick={() => setMode('answer')}
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  开始答题
                </button>
              )}
              {mode === 'answer' && (
                <button
                  onClick={handleSubmitGrading}
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  提交批改
                </button>
              )}
              {mode === 'result' && (
                <button
                  onClick={handleRetry}
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                >
                  重新答题
                </button>
              )}
              {currentSet?.analysisPdfUrl && (
                <a
                  href={currentSet.analysisPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border border-neutral-300 rounded hover:border-black transition-colors"
                >
                  查看解析
                </a>
              )}
              {currentSet?.pdfUrl && (
                <a
                  href={currentSet.pdfUrl}
                  download
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
                >
                  下载PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Set Tabs */}
      {paper.sets && paper.sets.length > 1 && (
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex gap-1 py-2 overflow-x-auto">
              {paper.sets.map((set, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSet(idx)
                    setMode('view')
                    setUserAnswers({ listening: [], reading: [], writing: '', translation: '' })
                    setGradingResult(null)
                  }}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap ${
                    selectedSet === idx
                      ? 'bg-black text-white'
                      : 'bg-white border border-neutral-300 text-neutral-600 hover:border-black'
                  }`}
                >
                  {set.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 批改结果界面 */}
      {mode === 'result' && gradingResult && (
        <div className="bg-green-50 border-b border-green-200 px-4 sm:px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-4">批改结果</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-3xl font-bold text-green-600">{gradingResult.score}</div>
                <div className="text-sm text-neutral-500">总分 (710)</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-3xl font-bold text-blue-600">{correctListening}/{totalListening}</div>
                <div className="text-sm text-neutral-500">听力正确</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-3xl font-bold text-blue-600">{correctReading}/{totalReading}</div>
                <div className="text-sm text-neutral-500">阅读正确</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                <div className="text-3xl font-bold text-red-600">{gradingResult.mistakeCount}</div>
                <div className="text-sm text-neutral-500">错题数</div>
              </div>
            </div>

            {/* 错题详情 */}
            {gradingResult.mistakeCount > 0 && (
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h3 className="font-bold mb-3">错题详情</h3>
                <div className="space-y-2 text-sm">
                  {gradingResult.results.listening?.map((correct, i) => (
                    !correct && (
                      <div key={`l-${i}`} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                        <span className="font-medium">听力 第{i + 1}题:</span>
                        <span>你的答案: <span className="text-red-600 font-bold">{userAnswers.listening[i] || '未答'}</span></span>
                        <span>正确答案: <span className="text-green-600 font-bold">{answers.listening[i]}</span></span>
                      </div>
                    )
                  ))}
                  {gradingResult.results.reading?.map((correct, i) => {
                    const qNum = i < 5 ? 26 + i : i < 10 ? 31 + (i - 5) : 36 + (i - 10)
                    return !correct && (
                      <div key={`r-${i}`} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                        <span className="font-medium">阅读 第{qNum}题:</span>
                        <span>你的答案: <span className="text-red-600 font-bold">{userAnswers.reading[i] || '未答'}</span></span>
                        <span>正确答案: <span className="text-green-600 font-bold">{answers.reading[i]}</span></span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <p className="text-sm text-neutral-500 mt-4">
              注：写作和翻译为主观题，需查看解析自行批改
            </p>
          </div>
        </div>
      )}

      {/* 答题界面 */}
      {mode === 'answer' && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 sm:px-6 py-6 max-h-[60vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold mb-4">答题卡</h2>

            {/* 听力 */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">听力 (1-25)</h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-neutral-500 mb-1">{i + 1}</div>
                    <div className="flex gap-1 justify-center">
                      {['A', 'B', 'C', 'D'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleSelectAnswer('listening', i, opt)}
                          className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                            userAnswers.listening[i] === opt
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-neutral-300 hover:border-blue-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 阅读 */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">阅读 (26-55)</h3>
              {/* Section A: 匹配题 Q26-30 (选项A-O) */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-600 mb-2">Section A 匹配 (26-30)</h4>
                <div className="space-y-2">
                  {Array.from({ length: 5 }, (_, i) => {
                    const opts = 'ABCDEFGHIJKLMNO'.split('')
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 w-8 text-right">{i + 26}</span>
                        <select
                          value={userAnswers.reading[i] || ''}
                          onChange={(e) => handleSelectAnswer('reading', i, e.target.value)}
                          className="border border-neutral-300 rounded px-2 py-1 text-sm"
                        >
                          <option value="">--</option>
                          {opts.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Section B: 匹配题 Q31-35 (选项A-J) */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-600 mb-2">Section B 匹配 (31-35)</h4>
                <div className="space-y-2">
                  {Array.from({ length: 5 }, (_, i) => {
                    const opts = 'ABCDEFGHIJ'.split('')
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 w-8 text-right">{i + 31}</span>
                        <select
                          value={userAnswers.reading[i + 5] || ''}
                          onChange={(e) => handleSelectAnswer('reading', i + 5, e.target.value)}
                          className="border border-neutral-300 rounded px-2 py-1 text-sm"
                        >
                          <option value="">--</option>
                          {opts.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Section C: 选择题 Q36-55 (选项A-D) */}
              <div>
                <h4 className="text-sm font-medium text-neutral-600 mb-2">Section C 选择 (36-55)</h4>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-neutral-500 mb-1">{i + 36}</div>
                      <div className="flex gap-1 justify-center">
                        {['A', 'B', 'C', 'D'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleSelectAnswer('reading', i + 10, opt)}
                            className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                              userAnswers.reading[i + 10] === opt
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-neutral-300 hover:border-blue-400'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 写作和翻译 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">写作</h3>
                {writingData && (
                  <div className="mb-2 p-2 bg-neutral-50 rounded text-xs text-neutral-600">
                    <p className="font-medium mb-1">{writingData.title}</p>
                    <p className="line-clamp-3">{writingData.topic}</p>
                    {writingData.tips && (
                      <p className="mt-1 text-neutral-400">提示: {writingData.tips}</p>
                    )}
                  </div>
                )}
                <textarea
                  value={userAnswers.writing}
                  onChange={(e) => handleSelectAnswer('writing', 0, e.target.value)}
                  placeholder="请输入你的作文..."
                  className="w-full h-32 p-3 border border-neutral-300 rounded-lg resize-none"
                />
                {writingData && (
                  <div className="mt-2">
                    <button
                      onClick={() => setShowModelEssay(!showModelEssay)}
                      className="text-xs text-neutral-400 hover:text-black transition-colors"
                    >
                      {showModelEssay ? '隐藏范文' : '查看范文'}
                    </button>
                    {showModelEssay && (
                      <div className="mt-2 p-3 bg-neutral-50 rounded-lg text-sm">
                        <p className="font-medium mb-2">参考范文</p>
                        <p className="whitespace-pre-line text-neutral-700">{writingData.modelEssay}</p>
                        {writingData.keyPhrases?.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-xs text-neutral-500 mb-1">重点短语</p>
                            <div className="flex flex-wrap gap-1">
                              {writingData.keyPhrases.map((p, i) => (
                                <span key={i} className="text-xs px-1.5 py-0.5 bg-white border border-neutral-200 rounded">{p}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold mb-2">翻译</h3>
                {translationData && (
                  <div className="mb-2 p-2 bg-neutral-50 rounded text-xs text-neutral-600">
                    <p className="line-clamp-4">{translationData.source}</p>
                    {translationData.tips && (
                      <p className="mt-1 text-neutral-400">提示: {translationData.tips}</p>
                    )}
                  </div>
                )}
                <textarea
                  value={userAnswers.translation}
                  onChange={(e) => handleSelectAnswer('translation', 0, e.target.value)}
                  placeholder="请输入你的翻译..."
                  className="w-full h-32 p-3 border border-neutral-300 rounded-lg resize-none"
                />
                {translationData && (
                  <div className="mt-2">
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="text-xs text-neutral-400 hover:text-black transition-colors"
                    >
                      {showTranslation ? '隐藏参考译文' : '查看参考译文'}
                    </button>
                    {showTranslation && (
                      <div className="mt-2 p-3 bg-neutral-50 rounded-lg text-sm">
                        <p className="font-medium mb-2">参考译文</p>
                        <p className="text-neutral-700">{translationData.translation}</p>
                        {translationData.keyExpressions?.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-xs text-neutral-500 mb-1">重点表达</p>
                            <div className="flex flex-wrap gap-1">
                              {translationData.keyExpressions.map((e, i) => (
                                <span key={i} className="text-xs px-1.5 py-0.5 bg-white border border-neutral-200 rounded">{e}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 单词收藏提示 */}
            <div className="mt-4 p-3 bg-white rounded-lg border border-neutral-200">
              <p className="text-sm text-neutral-600">
                提示：在查看PDF时，选中文本后可以添加到生词本
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Listening Audio - Above PDF */}
        {currentSet?.audioUrl && (
          <div className="bg-neutral-50 border-b border-neutral-200 px-4 sm:px-6 py-3 sm:py-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">听力音频</span>
                </div>
                <audio
                  controls
                  className="w-full sm:flex-1 h-10 sm:h-8"
                  src={currentSet.audioUrl}
                >
                  您的浏览器不支持音频播放
                </audio>
              </div>
            </div>
          </div>
        )}

        {/* PDF Toolbar */}
        <div className="bg-neutral-50 border-b border-neutral-200 px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-neutral-500 hidden sm:inline">缩放:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPdfScale(Math.max(0.5, pdfScale - 0.1))}
                className="w-7 h-7 rounded border border-neutral-300 text-neutral-600 hover:border-black text-xs flex items-center justify-center"
              >
                −
              </button>
              <span className="text-xs w-12 text-center">{Math.round(pdfScale * 100)}%</span>
              <button
                onClick={() => setPdfScale(Math.min(2, pdfScale + 0.1))}
                className="w-7 h-7 rounded border border-neutral-300 text-neutral-600 hover:border-black text-xs flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          {/* Progress Display */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${progress > 0 ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-neutral-100 text-neutral-400 border border-neutral-300'}`}>
              {progress > 0 ? `已阅读 ${progress}%` : '未读'}
            </span>
          </div>
          {currentSet?.pdfUrl && (
            <a
              href={currentSet.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              新窗口
            </a>
          )}
        </div>

        {/* Annotation Toolbar */}
        <AnnotationToolbar
          activeTool={activeTool}
          onToolChange={setActiveTool}
          strokeColor={strokeColor}
          onColorChange={setStrokeColor}
          strokeWidth={strokeWidth}
          onWidthChange={setStrokeWidth}
          onUndo={undo}
          onClearPage={clearAllAnnotations}
          canUndo={canUndo}
          hasAnnotations={hasAnnotations}
        />

        {/* PDF Viewer */}
        <div
          ref={scrollRef}
          className={`overflow-y-auto bg-neutral-200 p-2 sm:p-4 relative${isDrawingMode ? ' drawing-mode' : ''}`}
          style={{ height: mode === 'answer' ? 'calc(100vh - 500px)' : 'calc(100vh - 220px)' }}
          onMouseUp={isDrawingMode ? undefined : handleTextSelection}
        >
          {/* 文本选择浮动按钮 */}
          {selectionPopup && (
            <div
              className="absolute z-30 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 flex items-center gap-2"
              style={{ left: `${selectionPopup.x}px`, top: `${selectionPopup.y}px`, transform: 'translate(-50%, -100%)' }}
            >
              <span className="text-sm font-medium text-neutral-700 max-w-32 truncate">{selectionPopup.text}</span>
              <button
                onClick={() => handleAddToVocabulary(selectionPopup.text, selectionPopup.context)}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
              >
                添加到生词本
              </button>
              <button
                onClick={() => setSelectionPopup(null)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {currentSet?.pdfUrl ? (
            <div className="flex justify-center">
              <Document
                file={currentSet.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center py-20 text-neutral-500 bg-white shadow-2xl">
                    <span className="text-sm">加载中...</span>
                  </div>
                }
                error={
                  <div className="flex flex-col items-center justify-center py-20 text-neutral-500 bg-white shadow-2xl gap-2">
                    <span className="text-sm">PDF 加载失败</span>
                    <a href={currentSet.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                      在新窗口打开
                    </a>
                  </div>
                }
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page-${index + 1}`} className="relative" style={{ marginBottom: '8px' }}>
                    <Page
                      pageNumber={index + 1}
                      scale={pdfScale}
                      width={Math.round(595 * pdfScale)}
                      renderTextLayer={true}
                      renderAnnotationLayer={false}
                      loading={
                        <div className="bg-white shadow-2xl flex items-center justify-center" style={{ width: `${Math.round(595 * pdfScale)}px`, height: `${Math.round(842 * pdfScale)}px` }}>
                          <span className="text-sm text-neutral-400">加载页...</span>
                        </div>
                      }
                    />
                    <AnnotationCanvas
                      pageNumber={index + 1}
                      pageWidth={Math.round(595 * pdfScale)}
                      pageHeight={Math.round(842 * pdfScale)}
                      strokes={pageStrokes[index + 1] || []}
                      isDrawingMode={isDrawingMode}
                      activeTool={activeTool}
                      strokeColor={strokeColor}
                      strokeWidth={strokeWidth}
                      onStrokeComplete={(stroke) => addStroke(index + 1, stroke)}
                      pdfScale={pdfScale}
                    />
                  </div>
                ))}
              </Document>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              暂无真题PDF
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExamDetail
