import { cet4CoreWords } from './cet4-core'
import { cet6CoreWords } from './cet6-core'

export { cet4CoreWords, cet6CoreWords }

/**
 * 获取指定级别的核心词汇
 * @param {'cet4'|'cet6'} level
 * @returns {Array}
 */
export function getCoreWords(level = 'cet4') {
  return level === 'cet6' ? cet6CoreWords : cet4CoreWords
}

/**
 * 搜索核心词汇
 * @param {string} keyword
 * @param {'cet4'|'cet6'} level
 * @returns {Array}
 */
export function searchCoreWords(keyword, level = 'cet4') {
  const words = getCoreWords(level)
  const lower = keyword.toLowerCase()
  return words.filter(w =>
    w.word.toLowerCase().includes(lower) ||
    w.definitions.some(d => d.def.includes(keyword))
  )
}
