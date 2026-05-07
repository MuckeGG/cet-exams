// 数据导入导出工具
const DATA_VERSION = 1

const STORAGE_KEYS = [
  'cet_vocabulary',
  'cet_grading_results',
  'cet_error_book',
  'cet_study_log',
  'cet_study_goal',
  'cet_progress',
  'cet_dict_cache',
  'cet_theme',
  'cet_annotations'
]

/**
 * 导出所有数据为 JSON
 */
export function exportAllData() {
  try {
    const data = {
      version: DATA_VERSION,
      exportedAt: new Date().toISOString(),
      entries: {}
    }

    for (const key of STORAGE_KEYS) {
      const value = localStorage.getItem(key)
      if (value !== null) {
        data.entries[key] = value
      }
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `cet_backup_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return { success: true, message: '数据已导出' }
  } catch (e) {
    return { success: false, message: '导出失败: ' + e.message }
  }
}

/**
 * 导入数据
 * @param {File} file - JSON 文件
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function importAllData(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)

        if (!data.version || !data.entries) {
          resolve({ success: false, message: '无效的备份文件' })
          return
        }

        // 确认覆盖
        const existingKeys = STORAGE_KEYS.filter(k => localStorage.getItem(k) !== null)
        if (existingKeys.length > 0) {
          if (!window.confirm(`检测到已有 ${existingKeys.length} 项数据，导入将覆盖现有数据。是否继续？`)) {
            resolve({ success: false, message: '已取消导入' })
            return
          }
        }

        // 导入数据
        let importedCount = 0
        for (const [key, value] of Object.entries(data.entries)) {
          if (STORAGE_KEYS.includes(key)) {
            localStorage.setItem(key, value)
            importedCount++
          }
        }

        resolve({ success: true, message: `成功导入 ${importedCount} 项数据，页面将刷新` })
      } catch {
        resolve({ success: false, message: '文件格式错误' })
      }
    }

    reader.onerror = () => {
      resolve({ success: false, message: '读取文件失败' })
    }

    reader.readAsText(file)
  })
}

/**
 * 清除所有数据
 */
export function clearAllData() {
  try {
    for (const key of STORAGE_KEYS) {
      localStorage.removeItem(key)
    }
    return { success: true, message: '所有数据已清除' }
  } catch (e) {
    return { success: false, message: '清除失败: ' + e.message }
  }
}

/**
 * 获取数据概览
 */
export function getDataOverview() {
  const overview = {}

  try {
    // 生词本
    const vocab = localStorage.getItem('cet_vocabulary')
    overview.vocabularyCount = vocab ? JSON.parse(vocab).length : 0

    // 批改记录
    const grading = localStorage.getItem('cet_grading_results')
    overview.gradingCount = grading ? Object.keys(JSON.parse(grading)).length : 0

    // 错题
    const errors = localStorage.getItem('cet_error_book')
    overview.errorCount = errors ? JSON.parse(errors).length : 0

    // 学习天数
    const studyLog = localStorage.getItem('cet_study_log')
    overview.studyDays = studyLog ? Object.keys(JSON.parse(studyLog)).length : 0

    // 总存储大小
    let totalSize = 0
    for (const key of STORAGE_KEYS) {
      const value = localStorage.getItem(key)
      if (value) totalSize += value.length * 2 // UTF-16
    }
    overview.storageSize = `${(totalSize / 1024).toFixed(1)} KB`
  } catch {}

  return overview
}
