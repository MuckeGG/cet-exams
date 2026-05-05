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
 * 听力：25题，每题3.55分 = 88.75分
 * 阅读：30题，每题3.55分 = 106.5分
 * 写作：106.5分
 * 翻译：106.5分
 */
export const calculateScore = (results, type = 'total') => {
  if (!results) return 0

  const听力Total = 88.75
  const阅读Total = 106.5
  const写作Total = 106.5
  const翻译Total = 106.5
  const total = 710

  const correctListening = results.listening?.filter((r, i) => r === true).length || 0
  const correctReading = results.reading?.filter((r, i) => r === true).length || 0
  // 写作和翻译为主观题，无法自动批改，按满分计
  const correctWriting = results.writing === 'marked' ? 1 : 0
  const correctTranslation = results.translation === 'marked' ? 1 : 0

  const listeningScore = (correctListening / 25) * 听力Total
  const readingScore = (correctReading / 30) * 阅读Total
  const writingScore = correctWriting * 写作Total
  const translationScore = correctTranslation * 翻译Total

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
