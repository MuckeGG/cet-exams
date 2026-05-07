import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { exportAllData, importAllData, clearAllData, getDataOverview } from '../utils/dataManager'

const Settings = () => {
  const [overview, setOverview] = useState({})
  const [message, setMessage] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setOverview(getDataOverview())
  }, [])

  const handleExport = () => {
    const result = exportAllData()
    setMessage(result)
    setTimeout(() => setMessage(null), 3000)
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await importAllData(file)
    setMessage(result)
    if (result.success) {
      setTimeout(() => window.location.reload(), 1500)
    } else {
      setTimeout(() => setMessage(null), 3000)
    }
    e.target.value = ''
  }

  const handleClear = () => {
    if (!window.confirm('确定要清除所有数据吗？此操作不可恢复！')) return
    if (!window.confirm('再次确认：这将删除所有学习记录、生词本、批改结果等数据。')) return

    const result = clearAllData()
    setMessage(result)
    if (result.success) {
      setTimeout(() => window.location.reload(), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/"
              className="text-sm text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回主页
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">设置</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.message}
          </div>
        )}

        {/* Data Overview */}
        <div className="border border-neutral-200 rounded-lg p-5 mb-6">
          <h2 className="font-bold mb-4">数据概览</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-neutral-500">生词本</p>
              <p className="text-xl font-bold">{overview.vocabularyCount || 0} 词</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">批改记录</p>
              <p className="text-xl font-bold">{overview.gradingCount || 0} 次</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">学习天数</p>
              <p className="text-xl font-bold">{overview.studyDays || 0} 天</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">存储大小</p>
              <p className="text-xl font-bold">{overview.storageSize || '0 KB'}</p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="border border-neutral-200 rounded-lg p-5 mb-6">
          <h2 className="font-bold mb-4">数据管理</h2>
          <div className="space-y-4">
            {/* Export */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">导出数据</p>
                <p className="text-sm text-neutral-500">将所有学习数据导出为 JSON 文件</p>
              </div>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
              >
                导出
              </button>
            </div>

            {/* Import */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">导入数据</p>
                <p className="text-sm text-neutral-500">从 JSON 备份文件恢复数据</p>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-neutral-300 rounded hover:border-black transition-colors"
                >
                  导入
                </button>
              </div>
            </div>

            {/* Clear */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div>
                <p className="font-medium text-red-600">清除所有数据</p>
                <p className="text-sm text-neutral-500">删除所有本地存储的学习数据</p>
              </div>
              <button
                onClick={handleClear}
                className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
              >
                清除
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="border border-neutral-200 rounded-lg p-5">
          <h2 className="font-bold mb-4">关于</h2>
          <p className="text-sm text-neutral-500 mb-2">
            大学英语四六级考试真题练习平台
          </p>
          <p className="text-sm text-neutral-500">
            所有数据均存储在浏览器本地（localStorage），不会上传到任何服务器。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings
