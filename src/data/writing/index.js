import { cet4Writing } from './cet4-writing'
import { cet6Writing } from './cet6-writing'

const allWriting = { ...cet4Writing, ...cet6Writing }

export function getWritingData(paperId) {
  return allWriting[paperId] || null
}

export { cet4Writing, cet6Writing }
