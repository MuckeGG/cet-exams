// 学习打卡与追踪工具
const STUDY_LOG_KEY = 'cet_study_log'
const STUDY_GOAL_KEY = 'cet_study_goal'

/**
 * 获取今天日期字符串 YYYY-MM-DD
 */
function getToday() {
  return new Date().toISOString().split('T')[0]
}

/**
 * 获取所有学习记录
 */
export function getStudyLog() {
  try {
    const stored = localStorage.getItem(STUDY_LOG_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * 记录今日学习
 * @param {object} data - { duration(分钟), questionsAnswered, wordsReviewed }
 */
export function recordStudy(data) {
  try {
    const log = getStudyLog()
    const today = getToday()

    if (!log[today]) {
      log[today] = { duration: 0, questionsAnswered: 0, wordsReviewed: 0, sessions: 0 }
    }

    log[today].duration += data.duration || 0
    log[today].questionsAnswered += data.questionsAnswered || 0
    log[today].wordsReviewed += data.wordsReviewed || 0
    log[today].sessions += 1

    localStorage.setItem(STUDY_LOG_KEY, JSON.stringify(log))
    return true
  } catch {
    return false
  }
}

/**
 * 检查今天是否已打卡
 */
export function hasStudiedToday() {
  const log = getStudyLog()
  return !!log[getToday()]
}

/**
 * 计算连续打卡天数
 */
export function getStreak() {
  const log = getStudyLog()
  const dates = Object.keys(log).sort().reverse()

  if (dates.length === 0) return { current: 0, longest: 0 }

  let current = 0
  let longest = 0
  let tempStreak = 0
  const today = new Date()

  // 从今天往前检查连续天数
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    if (log[dateStr]) {
      tempStreak++
      if (i === 0 || current > 0) current = tempStreak
    } else {
      if (i === 0) continue // 今天还没学习，从昨天开始算
      longest = Math.max(longest, tempStreak)
      tempStreak = 0
      if (current > 0) break
    }
  }
  longest = Math.max(longest, tempStreak)

  return { current, longest }
}

/**
 * 获取本周学习统计
 */
export function getWeeklyStats() {
  const log = getStudyLog()
  const today = new Date()
  const weekData = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const dayNames = ['日', '一', '二', '三', '四', '五', '六']

    weekData.push({
      date: dateStr,
      dayName: dayNames[date.getDay()],
      ...(log[dateStr] || { duration: 0, questionsAnswered: 0, wordsReviewed: 0 })
    })
  }

  return weekData
}

/**
 * 获取学习目标
 */
export function getStudyGoal() {
  try {
    const stored = localStorage.getItem(STUDY_GOAL_KEY)
    return stored ? JSON.parse(stored) : { dailyMinutes: 30, dailyWords: 10 }
  } catch {
    return { dailyMinutes: 30, dailyWords: 10 }
  }
}

/**
 * 设置学习目标
 */
export function setStudyGoal(goal) {
  try {
    localStorage.setItem(STUDY_GOAL_KEY, JSON.stringify(goal))
    return true
  } catch {
    return false
  }
}

/**
 * 获取今日学习进度百分比
 */
export function getTodayProgress() {
  const log = getStudyLog()
  const goal = getStudyGoal()
  const today = log[getToday()]

  if (!today) return { minutes: 0, words: 0, percentage: 0 }

  const minutePercent = Math.min(100, Math.round((today.duration / goal.dailyMinutes) * 100))
  const wordPercent = goal.dailyWords > 0 ? Math.min(100, Math.round((today.wordsReviewed / goal.dailyWords) * 100)) : 100

  return {
    minutes: today.duration,
    words: today.wordsReviewed,
    percentage: Math.round((minutePercent + wordPercent) / 2)
  }
}
