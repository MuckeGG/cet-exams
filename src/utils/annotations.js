// 标注数据持久化
const ANNOTATIONS_KEY = 'cet_annotations'

/**
 * 获取某套试卷的所有标注
 */
export const getAnnotations = (paperId, setIndex) => {
  try {
    const stored = localStorage.getItem(ANNOTATIONS_KEY)
    if (!stored) return {}
    const data = JSON.parse(stored)
    return data[`${paperId}-${setIndex}`] || {}
  } catch {
    return {}
  }
}

/**
 * 获取某页标注
 */
export const getPageAnnotations = (paperId, setIndex, pageNum) => {
  try {
    const all = getAnnotations(paperId, setIndex)
    return all[String(pageNum)] || null
  } catch {
    return null
  }
}

/**
 * 保存某页笔画数据
 */
export const savePageAnnotations = (paperId, setIndex, pageNum, strokes) => {
  try {
    const stored = localStorage.getItem(ANNOTATIONS_KEY)
    const data = stored ? JSON.parse(stored) : {}
    const setKey = `${paperId}-${setIndex}`
    if (!data[setKey]) data[setKey] = {}
    data[setKey][String(pageNum)] = {
      strokes,
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem(ANNOTATIONS_KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

/**
 * 清除某套试卷所有标注
 */
export const clearSetAnnotations = (paperId, setIndex) => {
  try {
    const stored = localStorage.getItem(ANNOTATIONS_KEY)
    if (!stored) return true
    const data = JSON.parse(stored)
    delete data[`${paperId}-${setIndex}`]
    localStorage.setItem(ANNOTATIONS_KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

/**
 * 某套试卷是否有标注
 */
export const hasAnnotations = (paperId, setIndex) => {
  try {
    const all = getAnnotations(paperId, setIndex)
    return Object.values(all).some(page => page.strokes && page.strokes.length > 0)
  } catch {
    return false
  }
}
