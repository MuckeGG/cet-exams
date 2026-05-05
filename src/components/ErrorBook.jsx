import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMistakes, getRepeatedMistakes, removeMistake, clearMistakes, exportMistakes } from '../utils/errorTracking'
import { getPaperById } from '../data/examPapers'

const ErrorBook = () => {
  const [mistakes, setMistakes] = useState([])
  const [showRepeatedOnly, setShowRepeatedOnly] = useState(false)

  useEffect(() => {
    const allMistakes = Object.values(getMistakes())
    setMistakes(allMistakes.sort((a, b) => new Date(b.lastErrorDate) - new Date(a.lastErrorDate)))
  }, [])

  const handleRemove = (questionId) => {
    if (removeMistake(questionId)) {
      const allMistakes = Object.values(getMistakes())
      setMistakes(allMistakes.sort((a, b) => new Date(b.lastErrorDate) - new Date(a.lastErrorDate)))
    }
  }

  const handleClear = () => {
    if (window.confirm('确定要清空错题本吗？此操作不可恢复。')) {
      clearMistakes()
      setMistakes([])
    }
  }

  const handleExport = () => {
    const toExport = showRepeatedOnly ? mistakes.filter(m => m.errorCount > 1) : mistakes
    if (toExport.length === 0) {
      alert('没有可导出的错题')
      return
    }
    exportMistakes(toExport)
  }

  const filteredMistakes = showRepeatedOnly
    ? mistakes.filter(m => m.errorCount > 1)
    : mistakes

  const getPaperInfo = (paperId) => {
    if (!paperId) return ''
    const paper = getPaperById(paperId)
    return paper ? `${paper.year}年${paper.session} ${paper.type}` : paperId
  }

  const totalErrors = mistakes.reduce((sum, m) => sum + m.errorCount, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  to="/"
                  className="text-sm text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  返回主页
                </Link>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">错题本</h1>
              <p className="text-neutral-500 text-xs sm:text-sm">
                共 {mistakes.length} 道错题，总错误次数 {totalErrors}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                disabled={mistakes.length === 0}
                className="px-3 sm:px-4 py-2 text-sm bg-black text-white rounded hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
              >
                导出错题
              </button>
              {mistakes.length > 0 && (
                <button
                  onClick={handleClear}
                  className="px-3 sm:px-4 py-2 text-sm border border-neutral-300 rounded hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  清空
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{mistakes.length}</div>
            <div className="text-xs text-neutral-500">错题总数</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mistakes.filter(m => m.errorCount > 1).length}
            </div>
            <div className="text-xs text-neutral-500">重复错误</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mistakes.filter(m => m.type === '听力').length}
            </div>
            <div className="text-xs text-neutral-500">听力错题</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mistakes.filter(m => m.type === '阅读').length}
            </div>
            <div className="text-xs text-neutral-500">阅读错题</div>
          </div>
        </div>

        {/* 筛选按钮 */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setShowRepeatedOnly(false)}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              !showRepeatedOnly
                ? 'bg-black text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            全部错题
          </button>
          <button
            onClick={() => setShowRepeatedOnly(true)}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              showRepeatedOnly
                ? 'bg-red-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            只看重复错误
          </button>
        </div>

        {/* 错题列表 */}
        {filteredMistakes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">✓</div>
            <p className="text-neutral-500 mb-4">
              {showRepeatedOnly ? '没有重复错误的题目' : '错题本为空'}
            </p>
            <p className="text-sm text-neutral-400">
              {showRepeatedOnly ? '继续刷题，看看有哪些题目重复出错' : '完成答题批改后，错题会自动记录到这里'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMistakes.map((mistake) => (
              <div
                key={mistake.questionId}
                className={`p-4 border rounded-lg transition-colors ${
                  mistake.errorCount > 1
                    ? 'border-red-300 bg-red-50'
                    : 'border-neutral-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        mistake.type === '听力'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {mistake.type}
                      </span>
                      <span className="font-medium">第{mistake.questionNum}题</span>
                      {mistake.errorCount > 1 && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">
                          错误 {mistake.errorCount} 次
                        </span>
                      )}
                      <span className="text-xs text-neutral-400">
                        {getPaperInfo(mistake.paperId)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-neutral-500">你的答案: </span>
                        <span className="font-bold text-red-600">{mistake.userAnswer}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500">正确答案: </span>
                        <span className="font-bold text-green-600">{mistake.correctAnswer}</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400 mt-2">
                      最后一次错误: {new Date(mistake.lastErrorDate).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(mistake.questionId)}
                    className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                    title="删除"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorBook
