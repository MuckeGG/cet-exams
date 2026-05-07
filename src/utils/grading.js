// 批改结果存储键
const GRADING_RESULT_KEY = 'cet_grading_results'

/**
 * 保存批改结果
 */
export const saveGradingResult = (paperId, setIndex, userAnswers, results, score) => {
  try {
    const stored = localStorage.getItem(GRADING_RESULT_KEY)
    const data = stored ? JSON.parse(stored) : {}
    const key = `${paperId}-${setIndex}`
    data[key] = {
      paperId,
      setIndex,
      userAnswers,
      results,
      score,
      timestamp: Date.now()
    }
    localStorage.setItem(GRADING_RESULT_KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

/**
 * 获取批改结果
 */
export const getGradingResult = (paperId, setIndex) => {
  try {
    const stored = localStorage.getItem(GRADING_RESULT_KEY)
    if (!stored) return null
    const data = JSON.parse(stored)
    return data[`${paperId}-${setIndex}`] || null
  } catch {
    return null
  }
}

/**
 * 获取某试卷的所有批改历史
 */
export const getGradingHistory = (paperId) => {
  try {
    const stored = localStorage.getItem(GRADING_RESULT_KEY)
    if (!stored) return []
    const data = JSON.parse(stored)
    return Object.values(data).filter(r => r.paperId === paperId)
  } catch {
    return []
  }
}

/**
 * 计算得分（710分制）
 * 听力：25题 = 88.75分
 * 阅读：20题(5匹配+5匹配+10选择) = 106.5分
 * 写作：106.5分
 * 翻译：106.5分
 */
export const calculateScore = (results, type = 'total') => {
  if (!results) return 0

  const listeningTotal = 88.75
  const readingTotal = 106.5
  const writingTotal = 106.5
  const translationTotal = 106.5

  const totalListening = results.listening?.length || 25
  const totalReading = results.reading?.length || 20

  const correctListening = results.listening?.filter(r => r === true).length || 0
  const correctReading = results.reading?.filter(r => r === true).length || 0
  // 写作和翻译为主观题，无法自动批改，按满分计
  const correctWriting = results.writing === 'marked' ? 1 : 0
  const correctTranslation = results.translation === 'marked' ? 1 : 0

  const listeningScore = (correctListening / totalListening) * listeningTotal
  const readingScore = (correctReading / totalReading) * readingTotal
  const writingScore = correctWriting * writingTotal
  const translationScore = correctTranslation * translationTotal

  if (type === 'listening') return Math.round(listeningScore)
  if (type === 'reading') return Math.round(readingScore)
  if (type === 'writing') return Math.round(writingScore)
  if (type === 'translation') return Math.round(translationScore)

  return Math.round(listeningScore + readingScore + writingScore + translationScore)
}

/**
 * 对比答案并返回结果
 */
export const gradeAnswers = (userAnswers, correctAnswers) => {
  const results = {}

  // 听力
  if (correctAnswers.listening && userAnswers.listening) {
    results.listening = userAnswers.listening.map((ans, i) =>
      ans === correctAnswers.listening[i]
    )
  }

  // 阅读
  if (correctAnswers.reading && userAnswers.reading) {
    results.reading = userAnswers.reading.map((ans, i) =>
      ans === correctAnswers.reading[i]
    )
  }

  // 写作和翻译标记为待批改
  if (userAnswers.writing) results.writing = 'marked'
  if (userAnswers.translation) results.translation = 'marked'

  return results
}
