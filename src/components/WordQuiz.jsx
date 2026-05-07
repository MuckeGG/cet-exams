import { useState, useMemo, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getVocabulary } from '../utils/vocabulary'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateQuestions(words, count = 10) {
  if (words.length < 4) return []
  const selected = shuffleArray(words).slice(0, Math.min(count, words.length))
  const questions = []

  for (const word of selected) {
    const type = Math.random() < 0.4 ? 'e2c' : Math.random() < 0.7 ? 'c2e' : 'spell'
    const correctDef = word.definitions?.[0]
    if (!correctDef) continue

    // Get distractors
    const otherWords = words.filter(w => w.word !== word.word && w.definitions?.[0])
    const distractors = shuffleArray(otherWords).slice(0, 3)

    if (type === 'e2c') {
      // English to Chinese
      const options = shuffleArray([
        { text: correctDef.definition, correct: true },
        ...distractors.map(d => ({ text: d.definitions[0].definition, correct: false }))
      ])
      questions.push({
        type: 'e2c',
        prompt: word.word,
        phonetic: word.phonetic,
        options,
        correctIndex: options.findIndex(o => o.correct)
      })
    } else if (type === 'c2e') {
      // Chinese to English
      const options = shuffleArray([
        { text: word.word, correct: true },
        ...distractors.map(d => ({ text: d.word, correct: false }))
      ])
      questions.push({
        type: 'c2e',
        prompt: correctDef.definition,
        options,
        correctIndex: options.findIndex(o => o.correct)
      })
    } else {
      // Spelling - remove some letters
      questions.push({
        type: 'spell',
        prompt: correctDef.definition,
        answer: word.word,
        hint: word.word.replace(/[aeiou]/gi, '_'),
        phonetic: word.phonetic
      })
    }
  }

  return questions
}

const WordQuiz = () => {
  const vocabulary = useMemo(() => getVocabulary().filter(w => w.definitions?.length > 0), [])
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [spellInput, setSpellInput] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const startQuiz = useCallback((count = 10) => {
    const q = generateQuestions(vocabulary, count)
    setQuestions(q)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setSpellInput('')
    setShowResult(false)
    setCorrectCount(0)
    setFinished(false)
    setQuizStarted(true)
  }, [vocabulary])

  const handleSelect = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === questions[currentIndex].correctIndex) {
      setCorrectCount(prev => prev + 1)
    }
  }

  const handleSpellSubmit = (e) => {
    e.preventDefault()
    if (showResult) return
    setShowResult(true)
    if (spellInput.trim().toLowerCase() === questions[currentIndex].answer.toLowerCase()) {
      setCorrectCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setSpellInput('')
      setShowResult(false)
    }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/vocabulary"
                className="text-sm text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回生词本
              </Link>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">单词测验</h1>
            <p className="text-neutral-500 text-sm">测试你对生词本中单词的掌握程度</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {vocabulary.length < 4 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">生词本中至少需要 4 个有释义的单词才能开始测验</p>
              <p className="text-sm text-neutral-400 mb-6">当前有 {vocabulary.length} 个有效单词</p>
              <Link
                to="/vocabulary/browse"
                className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
              >
                去添加单词
              </Link>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-lg font-medium mb-2">准备好了吗？</p>
              <p className="text-neutral-500 mb-8">共 {vocabulary.length} 个有效单词可供测验</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => startQuiz(10)}
                  className="py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  开始测验（10 题）
                </button>
                <button
                  onClick={() => startQuiz(20)}
                  className="py-3 border border-neutral-300 rounded-lg hover:border-black transition-colors"
                >
                  开始测验（20 题）
                </button>
                {vocabulary.length >= 50 && (
                  <button
                    onClick={() => startQuiz(50)}
                    className="py-3 border border-neutral-300 rounded-lg hover:border-black transition-colors"
                  >
                    开始测验（50 题）
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (finished) {
    const percentage = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold">测验结果</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <p className="text-4xl font-bold mb-2">{percentage}%</p>
          <p className="text-neutral-500 mb-6">
            {questions.length} 题中答对 {correctCount} 题
          </p>
          <p className="text-lg mb-8">
            {percentage >= 80 ? '太棒了！掌握得很好！' :
             percentage >= 60 ? '不错，继续加油！' :
             '还需要多复习哦！'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => startQuiz(questions.length)}
              className="px-6 py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
            >
              再来一次
            </button>
            <Link
              to="/vocabulary"
              className="px-6 py-2 border border-neutral-300 rounded hover:border-black transition-colors"
            >
              返回生词本
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentIndex]

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">单词测验</h1>
            <div className="text-right">
              <p className="text-sm text-neutral-500">
                {currentIndex + 1} / {questions.length}
              </p>
              <p className="text-sm text-green-600">正确: {correctCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question type badge */}
        <div className="mb-4">
          <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-500 rounded">
            {question.type === 'e2c' ? '英译中' : question.type === 'c2e' ? '中译英' : '拼写'}
          </span>
        </div>

        {/* Question prompt */}
        <div className="mb-8">
          <p className="text-2xl sm:text-3xl font-bold mb-2">
            {question.type === 'spell' ? question.prompt : question.prompt}
          </p>
          {question.phonetic && question.type !== 'c2e' && (
            <p className="text-neutral-400">{question.phonetic}</p>
          )}
          {question.type === 'spell' && (
            <p className="text-neutral-400 mt-2">提示: {question.hint}</p>
          )}
        </div>

        {/* Answer area */}
        {question.type === 'spell' ? (
          <form onSubmit={handleSpellSubmit} className="space-y-4">
            <input
              type="text"
              value={spellInput}
              onChange={(e) => setSpellInput(e.target.value)}
              disabled={showResult}
              placeholder="输入单词拼写..."
              className="w-full px-4 py-3 text-lg border border-neutral-300 rounded-lg focus:outline-none focus:border-black disabled:bg-neutral-50"
              autoFocus
            />
            {!showResult && (
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                确认
              </button>
            )}
          </form>
        ) : (
          <div className="space-y-3">
            {question.options.map((opt, i) => {
              let btnClass = 'w-full text-left p-4 border rounded-lg transition-colors '
              if (showResult) {
                if (i === question.correctIndex) {
                  btnClass += 'border-green-500 bg-green-50'
                } else if (i === selectedAnswer) {
                  btnClass += 'border-red-500 bg-red-50'
                } else {
                  btnClass += 'border-neutral-200 opacity-50'
                }
              } else {
                btnClass += i === selectedAnswer
                  ? 'border-black bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-400'
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={btnClass}
                >
                  <span className="text-neutral-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt.text}
                </button>
              )
            })}
          </div>
        )}

        {/* Result feedback */}
        {showResult && (
          <div className="mt-6">
            {question.type === 'spell' && (
              <p className={`text-lg font-medium ${spellInput.trim().toLowerCase() === question.answer.toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>
                {spellInput.trim().toLowerCase() === question.answer.toLowerCase()
                  ? '正确！'
                  : `正确答案是: ${question.answer}`}
              </p>
            )}
            {question.type !== 'spell' && selectedAnswer !== question.correctIndex && (
              <p className="text-red-600 text-sm">
                正确答案是: {String.fromCharCode(65 + question.correctIndex)}. {question.options[question.correctIndex].text}
              </p>
            )}
            <button
              onClick={handleNext}
              className="mt-4 w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              {currentIndex + 1 >= questions.length ? '查看结果' : '下一题'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WordQuiz
