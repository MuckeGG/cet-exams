// 词典查询工具
// 使用免费 Dictionary API (https://dictionaryapi.dev/)

const DICT_CACHE_KEY = 'cet_dict_cache'
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000 // 30天

/**
 * 从缓存获取单词释义
 */
function getFromCache(word) {
  try {
    const stored = localStorage.getItem(DICT_CACHE_KEY)
    if (!stored) return null
    const cache = JSON.parse(stored)
    const entry = cache[word.toLowerCase()]
    if (!entry) return null
    // 检查是否过期
    if (Date.now() - entry.timestamp > CACHE_EXPIRY) return null
    return entry.data
  } catch {
    return null
  }
}

/**
 * 保存到缓存
 */
function saveToCache(word, data) {
  try {
    const stored = localStorage.getItem(DICT_CACHE_KEY)
    const cache = stored ? JSON.parse(stored) : {}
    cache[word.toLowerCase()] = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(DICT_CACHE_KEY, JSON.stringify(cache))
  } catch {}
}

/**
 * 查询单词释义
 * @param {string} word - 要查询的单词
 * @returns {Promise<{ phonetic: string, definitions: Array<{ partOfSpeech: string, definition: string, example: string }> } | null>}
 */
export async function lookupWord(word) {
  if (!word || word.length < 2) return null

  const cleanWord = word.toLowerCase().trim()

  // 先查缓存
  const cached = getFromCache(cleanWord)
  if (cached) return cached

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`)
    if (!response.ok) return null

    const data = await response.json()
    if (!data || !data[0]) return null

    const entry = data[0]
    const result = {
      phonetic: entry.phonetic || entry.phonetics?.find(p => p.text)?.text || '',
      definitions: []
    }

    // 提取释义
    for (const meaning of entry.meanings || []) {
      for (const def of meaning.definitions || []) {
        result.definitions.push({
          partOfSpeech: meaning.partOfSpeech || '',
          definition: def.definition || '',
          example: def.example || ''
        })
      }
    }

    // 只保留前5个释义
    result.definitions = result.definitions.slice(0, 5)

    // 缓存结果
    saveToCache(cleanWord, result)

    return result
  } catch {
    return null
  }
}

/**
 * 批量查询单词释义
 */
export async function lookupWords(words) {
  const results = {}
  for (const word of words) {
    results[word] = await lookupWord(word)
  }
  return results
}
