import { cet4Answers } from './cet4-answers'
import { cet6Answers } from './cet6-answers'

const allAnswers = { ...cet4Answers, ...cet6Answers }

/**
 * 获取指定试卷和套别的答案
 * @param {string} paperId - 试卷ID，如 'cet4-2024-06'
 * @param {number} setIndex - 套别索引，从0开始
 * @returns {{ listening: string[], reading: string[] } | null}
 */
export function getAnswers(paperId, setIndex) {
  const paperAnswers = allAnswers[paperId]
  if (!paperAnswers) return null
  return paperAnswers[setIndex] || null
}

/**
 * 检查指定试卷是否有答案数据
 * @param {string} paperId
 * @param {number} setIndex
 * @returns {boolean}
 */
export function hasAnswers(paperId, setIndex) {
  return getAnswers(paperId, setIndex) !== null
}
