import { cet4Translation } from './cet4-translation'
import { cet6Translation } from './cet6-translation'

const allTranslation = { ...cet4Translation, ...cet6Translation }

export function getTranslationData(paperId) {
  return allTranslation[paperId] || null
}

export { cet4Translation, cet6Translation }
