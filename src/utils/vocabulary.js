// 生词本存储键
const VOCABULARY_KEY = 'cet_vocabulary'

/**
 * 获取生词本
 */
export const getVocabulary = () => {
  try {
    const stored = localStorage.getItem(VOCABULARY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * 添加单词到生词本
 */
export const addWord = (word, context = '', paperId = '') => {
  try {
    const stored = localStorage.getItem(VOCABULARY_KEY)
    const vocabulary = stored ? JSON.parse(stored) : []

    // 检查是否已存在
    if (vocabulary.some(v => v.word === word)) {
      return { success: false, message: '单词已存在' }
    }

    vocabulary.push({
      word,
      context,
      paperId,
      addedAt: new Date().toISOString()
    })

    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabulary))
    return { success: true, message: '已添加' }
  } catch {
    return { success: false, message: '添加失败' }
  }
}

/**
 * 从生词本删除单词
 */
export const removeWord = (word) => {
  try {
    const stored = localStorage.getItem(VOCABULARY_KEY)
    if (!stored) return false

    const vocabulary = JSON.parse(stored)
    const filtered = vocabulary.filter(v => v.word !== word)

    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(filtered))
    return true
  } catch {
    return false
  }
}

/**
 * 清空生词本
 */
export const clearVocabulary = () => {
  try {
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify([]))
    return true
  } catch {
    return false
  }
}

/**
 * 导出生词本为Txt文件
 */
export const exportVocabulary = (vocabulary, paperInfo = '') => {
  const lines = []

  vocabulary.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.word}`)
    if (item.context) {
      lines.push(`   语境: ${item.context}`)
    }
    lines.push('')
  })

  const content = `生词本导出\n${new Date().toLocaleDateString('zh-CN')}\n${'='.repeat(40)}\n\n${lines.join('\n')}`

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `生词本_${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
