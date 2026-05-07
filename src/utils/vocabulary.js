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
 * @param {string} word - 单词
 * @param {string} context - 上下文
 * @param {string} paperId - 来源试卷
 * @param {object} dictData - 词典数据 { phonetic, definitions }
 */
export const addWord = (word, context = '', paperId = '', dictData = null) => {
  try {
    const stored = localStorage.getItem(VOCABULARY_KEY)
    const vocabulary = stored ? JSON.parse(stored) : []

    // 检查是否已存在
    if (vocabulary.some(v => v.word === word)) {
      return { success: false, message: '单词已存在' }
    }

    const entry = {
      word,
      context,
      paperId,
      addedAt: new Date().toISOString(),
      // 词典数据
      phonetic: dictData?.phonetic || '',
      definitions: dictData?.definitions || [],
      // 间隔重复数据
      mastered: false,
      reviewCount: 0,
      easeFactor: 2.5,
      interval: 0,
      nextReview: null
    }

    vocabulary.push(entry)
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabulary))
    return { success: true, message: '已添加' }
  } catch {
    return { success: false, message: '添加失败' }
  }
}

/**
 * 更新单词的词典数据
 */
export const updateWordDictData = (word, dictData) => {
  try {
    const stored = localStorage.getItem(VOCABULARY_KEY)
    if (!stored) return false

    const vocabulary = JSON.parse(stored)
    const index = vocabulary.findIndex(v => v.word === word)
    if (index === -1) return false

    vocabulary[index].phonetic = dictData.phonetic || ''
    vocabulary[index].definitions = dictData.definitions || []

    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabulary))
    return true
  } catch {
    return false
  }
}

/**
 * 更新单词的复习数据
 */
export const updateWordReview = (word, reviewData) => {
  try {
    const stored = localStorage.getItem(VOCABULARY_KEY)
    if (!stored) return false

    const vocabulary = JSON.parse(stored)
    const index = vocabulary.findIndex(v => v.word === word)
    if (index === -1) return false

    Object.assign(vocabulary[index], reviewData)
    localStorage.setItem(VOCABULARY_KEY, JSON.stringify(vocabulary))
    return true
  } catch {
    return false
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
    if (item.phonetic) {
      lines.push(`   音标: ${item.phonetic}`)
    }
    if (item.definitions?.length > 0) {
      item.definitions.forEach(def => {
        lines.push(`   ${def.partOfSpeech ? `[${def.partOfSpeech}] ` : ''}${def.definition}`)
        if (def.example) {
          lines.push(`   例: ${def.example}`)
        }
      })
    }
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
