import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getVocabulary, updateWordReview } from '../utils/vocabulary'
import { getDueWords, calculateNextReview, getQualityLabel, getQualityColor } from '../utils/spacedRepetition'

const FlashcardReview = () => {
  const [vocabulary, setVocabulary] = useState(getVocabulary())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [reviewedCount, setReviewedCount] = useState(0)

  const dueWords = useMemo(() => getDueWords(vocabulary), [vocabulary])
  const currentWord = dueWords[currentIndex]

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev)
    if (!isFlipped) {
      setShowRating(true)
    }
  }, [isFlipped])

  const handleRate = useCallback((quality) => {
    if (!currentWord) return

    const reviewData = calculateNextReview(currentWord, quality)
    updateWordReview(currentWord.word, reviewData)

    setVocabulary(getVocabulary())
    setReviewedCount(prev => prev + 1)

    if (currentIndex + 1 >= dueWords.length) {
      setCompleted(true)
    } else {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
      setShowRating(false)
    }
  }, [currentWord, currentIndex, dueWords.length])

  const handleRestart = () => {
    setVocabulary(getVocabulary())
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowRating(false)
    setCompleted(false)
    setReviewedCount(0)
  }

  if (dueWords.length === 0) {
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
            <h1 className="text-xl sm:text-2xl font-bold">卡片复习</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-lg font-medium mb-2">没有待复习的单词</p>
          <p className="text-neutral-500 mb-6">所有单词都已复习完毕，请稍后再来</p>
          <Link
            to="/vocabulary"
            className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
          >
            返回生词本
          </Link>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold">卡片复习</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-lg font-medium mb-2">今日复习完成！</p>
          <p className="text-neutral-500 mb-6">共复习了 {reviewedCount} 个单词</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
            >
              再来一轮
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <div>
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
              <h1 className="text-xl sm:text-2xl font-bold">卡片复习</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-500">待复习</p>
              <p className="text-2xl font-bold">{dueWords.length - currentIndex}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-neutral-500 mb-1">
            <span>进度</span>
            <span>{currentIndex + 1} / {dueWords.length}</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / dueWords.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="relative w-full max-w-lg mx-auto cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={handleFlip}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              minHeight: '300px'
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 border-2 border-neutral-200 rounded-2xl bg-white"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className="text-3xl sm:text-4xl font-bold mb-3">{currentWord?.word}</p>
              {currentWord?.phonetic && (
                <p className="text-lg text-neutral-400">{currentWord.phonetic}</p>
              )}
              <p className="text-sm text-neutral-400 mt-6">点击卡片查看释义</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 border-2 border-neutral-200 rounded-2xl bg-neutral-50"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <p className="text-2xl font-bold mb-4">{currentWord?.word}</p>
              {currentWord?.phonetic && (
                <p className="text-sm text-neutral-400 mb-3">{currentWord.phonetic}</p>
              )}
              <div className="text-center space-y-1">
                {currentWord?.definitions?.map((def, i) => (
                  <p key={i} className="text-neutral-700">
                    {def.partOfSpeech && <span className="text-neutral-400 italic mr-1">[{def.partOfSpeech}]</span>}
                    {def.definition}
                  </p>
                ))}
              </div>
              {currentWord?.context && (
                <p className="text-sm text-neutral-500 mt-4 italic">"{currentWord.context}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Rating buttons */}
        {showRating && (
          <div className="max-w-lg mx-auto mt-8">
            <p className="text-center text-sm text-neutral-500 mb-3">你对这个单词的熟悉程度：</p>
            <div className="grid grid-cols-3 gap-2">
              {[0, 3, 5].map(quality => (
                <button
                  key={quality}
                  onClick={() => handleRate(quality)}
                  className={`py-3 px-4 text-white text-sm font-medium rounded-lg transition-colors ${getQualityColor(quality)}`}
                >
                  {quality === 0 && '不认识'}
                  {quality === 3 && '模糊'}
                  {quality === 5 && '认识'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[1, 2, 4].map(quality => (
                <button
                  key={quality}
                  onClick={() => handleRate(quality)}
                  className="py-2 px-4 text-neutral-500 text-xs border border-neutral-200 rounded-lg hover:border-neutral-400 transition-colors"
                >
                  {getQualityLabel(quality)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard hint */}
        <p className="text-center text-xs text-neutral-400 mt-8">
          提示：按空格键翻转卡片
        </p>
      </div>
    </div>
  )
}

export default FlashcardReview
