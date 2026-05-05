import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getVocabulary, removeWord, clearVocabulary, exportVocabulary } from '../utils/vocabulary'
import { getPaperById } from '../data/examPapers'

const VocabularyBook = () => {
  const [vocabulary, setVocabulary] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setVocabulary(getVocabulary())
  }, [])

  const handleRemove = (word) => {
    if (removeWord(word)) {
      setVocabulary(getVocabulary())
    }
  }

  const handleClear = () => {
    if (window.confirm('确定要清空生词本吗？此操作不可恢复。')) {
      clearVocabulary()
      setVocabulary([])
    }
  }

  const handleExport = () => {
    if (vocabulary.length === 0) {
      alert('生词本为空')
      return
    }
    exportVocabulary(vocabulary)
  }

  const filteredVocabulary = vocabulary.filter(v =>
    v.word.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPaperInfo = (paperId) => {
    if (!paperId) return ''
    const paper = getPaperById(paperId)
    return paper ? `${paper.year}年${paper.session} ${paper.type}` : paperId
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  to="/"
                  className="text-sm text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  返回主页
                </Link>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">生词本</h1>
              <p className="text-neutral-500 text-xs sm:text-sm">共 {vocabulary.length} 个收藏单词</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                disabled={vocabulary.length === 0}
                className="px-3 sm:px-4 py-2 text-sm bg-black text-white rounded hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
              >
                导出生词
              </button>
              {vocabulary.length > 0 && (
                <button
                  onClick={handleClear}
                  className="px-3 sm:px-4 py-2 text-sm border border-neutral-300 rounded hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  清空
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 搜索框 */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索单词..."
            className="w-full sm:max-w-md px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
          />
        </div>

        {/* 单词列表 */}
        {filteredVocabulary.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-neutral-500 mb-4">
              {searchTerm ? '没有找到匹配的单词' : '生词本为空'}
            </p>
            <p className="text-sm text-neutral-400">
              {searchTerm ? '尝试其他搜索词' : '在答题批改后，可以收藏不认识的单词'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredVocabulary.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg hover:border-neutral-400 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-bold">{item.word}</span>
                    {item.paperId && (
                      <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded">
                        {getPaperInfo(item.paperId)}
                      </span>
                    )}
                  </div>
                  {item.context && (
                    <p className="text-sm text-neutral-500 mb-1">"{item.context}"</p>
                  )}
                  <p className="text-xs text-neutral-400">
                    添加于 {new Date(item.addedAt).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.word)}
                  className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                  title="删除"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VocabularyBook
