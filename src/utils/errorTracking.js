// 错题本存储键
const MISTAKES_KEY = 'cet_mistakes'

/**
 * 获取所有错题
 */
export const getMistakes = () => {
  try {
    const stored = localStorage.getItem(MISTAKES_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * 记录错题
 */
export const recordMistake = (mistake) => {
  try {
    const stored = localStorage.getItem(MISTAKES_KEY)
    const mistakes = stored ? JSON.parse(stored) : {}

    const key = mistake.questionId
    const existing = mistakes[key]

    if (existing) {
      // 已存在，更新错误次数
      mistakes[key] = {
        ...existing,
        userAnswer: mistake.userAnswer,
        correctAnswer: mistake.correctAnswer,
        errorCount: existing.errorCount + 1,
        lastErrorDate: new Date().toISOString()
      }
    } else {
      // 新错题
      mistakes[key] = {
        questionId: mistake.questionId,
        paperId: mistake.paperId,
        setIndex: mistake.setIndex,
        type: mistake.type,
        questionNum: mistake.questionNum,
        userAnswer: mistake.userAnswer,
        correctAnswer: mistake.correctAnswer,
        errorCount: 1,
        lastErrorDate: new Date().toISOString()
      }
    }

    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes))
    return true
  } catch {
    return false
  }
}

/**
 * 批量记录错题（用于一次批改后记录多道错题）
 */
export const recordMultipleMistakes = (mistakeList) => {
  try {
    const stored = localStorage.getItem(MISTAKES_KEY)
    const mistakes = stored ? JSON.parse(stored) : {}

    mistakeList.forEach(mistake => {
      const key = mistake.questionId
      const existing = mistakes[key]

      if (existing) {
        mistakes[key] = {
          ...existing,
          userAnswer: mistake.userAnswer,
          correctAnswer: mistake.correctAnswer,
          errorCount: existing.errorCount + 1,
          lastErrorDate: new Date().toISOString()
        }
      } else {
        mistakes[key] = {
          questionId: mistake.questionId,
          paperId: mistake.paperId,
          setIndex: mistake.setIndex,
          type: mistake.type,
          questionNum: mistake.questionNum,
          userAnswer: mistake.userAnswer,
          correctAnswer: mistake.correctAnswer,
          errorCount: 1,
          lastErrorDate: new Date().toISOString()
        }
      }
    })

    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes))
    return true
  } catch {
    return false
  }
}

/**
 * 获取重复错误的题目（错误次数 > 1）
 */
export const getRepeatedMistakes = () => {
  const mistakes = getMistakes()
  return Object.values(mistakes).filter(m => m.errorCount > 1)
}

/**
 * 删除某条错题
 */
export const removeMistake = (questionId) => {
  try {
    const stored = localStorage.getItem(MISTAKES_KEY)
    if (!stored) return false

    const mistakes = JSON.parse(stored)
    delete mistakes[questionId]

    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes))
    return true
  } catch {
    return false
  }
}

/**
 * 清空错题本
 */
export const clearMistakes = () => {
  try {
    localStorage.setItem(MISTAKES_KEY, JSON.stringify({}))
    return true
  } catch {
    return false
  }
}

/**
 * 导出错题为Txt文件
 */
export const exportMistakes = (mistakes) => {
  const lines = []

  // 按科目分组
  const byType = {}
  mistakes.forEach(m => {
    if (!byType[m.type]) byType[m.type] = []
    byType[m.type].push(m)
  })

  lines.push(`错题本导出`)
  lines.push(`${new Date().toLocaleDateString('zh-CN')}`)
  lines.push(`总错误题数: ${mistakes.length}`)
  lines.push(`${'='.repeat(40)}\n`)

  Object.keys(byType).forEach(type => {
    lines.push(`【${type}】`)
    byType[type].forEach((m, i) => {
      lines.push(`${i + 1}. 第${m.questionNum}题`)
      lines.push(`   你的答案: ${m.userAnswer}`)
      lines.push(`   正确答案: ${m.correctAnswer}`)
      lines.push(`   错误次数: ${m.errorCount}`)
      lines.push('')
    })
    lines.push('')
  })

  const content = lines.join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `错题本_${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
