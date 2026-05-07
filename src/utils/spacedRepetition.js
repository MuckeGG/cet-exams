// SM-2 间隔重复算法实现

/**
 * 根据用户评分计算下次复习参数
 * @param {object} word - 单词数据 { easeFactor, interval, reviewCount }
 * @param {number} quality - 用户评分 0-5 (0=完全不认识, 3=模糊, 5=完全认识)
 * @returns {object} - { easeFactor, interval, nextReview }
 */
export function calculateNextReview(word, quality) {
  let { easeFactor = 2.5, interval = 0, reviewCount = 0 } = word

  // SM-2 算法
  if (quality >= 3) {
    // 认识
    if (reviewCount === 0) {
      interval = 1
    } else if (reviewCount === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    reviewCount++
  } else {
    // 不认识，重置
    reviewCount = 0
    interval = 1
  }

  // 更新 easeFactor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  // 计算下次复习时间
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    reviewCount,
    mastered: interval >= 21, // 间隔超过21天算掌握
    nextReview: nextReview.toISOString()
  }
}

/**
 * 获取今日待复习单词
 * @param {Array} vocabulary - 生词本
 * @returns {Array} - 待复习单词
 */
export function getDueWords(vocabulary) {
  const now = new Date()
  return vocabulary.filter(word => {
    if (word.mastered) return false
    if (!word.nextReview) return true // 从未复习过
    return new Date(word.nextReview) <= now
  })
}

/**
 * 获取评分标签
 */
export function getQualityLabel(quality) {
  const labels = {
    0: '完全不认识',
    1: '几乎不认识',
    2: '有点印象',
    3: '模糊记得',
    4: '基本认识',
    5: '完全认识'
  }
  return labels[quality] || ''
}

/**
 * 获取评分对应的颜色
 */
export function getQualityColor(quality) {
  if (quality <= 1) return 'bg-red-500 hover:bg-red-600'
  if (quality <= 2) return 'bg-orange-500 hover:bg-orange-600'
  if (quality <= 3) return 'bg-yellow-500 hover:bg-yellow-600'
  if (quality <= 4) return 'bg-green-500 hover:bg-green-600'
  return 'bg-emerald-500 hover:bg-emerald-600'
}
