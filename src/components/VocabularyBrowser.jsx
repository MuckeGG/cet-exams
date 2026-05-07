import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getCoreWords } from '../data/vocabulary'
import { addWord } from '../utils/vocabulary'

const frequencyLabels = { 5: '极高频', 4: '高频', 3: '中频', 2: '低频', 1: '低频' }
const frequencyColors = {
  5: 'bg-red-100 text-red-700',
  4: 'bg-orange-100 text-orange-700',
  3: 'bg-yellow-100 text-yellow-700',
  2: 'bg-neutral-100 text-neutral-500',
  1: 'bg-neutral-100 text-neutral-500'
}

const VocabularyBrowser = () => {
  const [level, setLevel] = useState('cet4')
  const [searchTerm, setSearchTerm] = useState('')
  const [frequencyFilter, setFrequencyFilter] = useState(0)
  const [addedWords, setAddedWords] = useState(new Set())

  const allWords = useMemo(() => getCoreWords(level), [level])

  const filteredWords = useMemo(() => {
    let words = allWords
    if (searchTerm) {
      const lower = searchTerm.toLowerCase()
      words = words.filter(w =>
        w.word.toLowerCase().includes(lower) ||
        w.definitions.some(d => d.def.includes(searchTerm))
      )
    }
    if (frequencyFilter > 0) {
      words = words.filter(w => w.frequency >= frequencyFilter)
    }
    return words
  }, [allWords, searchTerm, frequencyFilter])

  const handleAddToVocabulary = (word) => {
    const result = addWord(word.word, '', '', {
      phonetic: word.phonetic,
      definitions: word.definitions.map(d => ({
        partOfSpeech: d.pos,
        definition: d.def
      }))
    })
    if (result.success) {
      setAddedWords(prev => new Set([...prev, word.word]))
    }
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
                  to="/vocabulary"
                  className="text-sm text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  返回生词本
                </Link>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">核心词汇库</h1>
              <p className="text-neutral-500 text-xs sm:text-sm">
                {level === 'cet4' ? 'CET-4' : 'CET-6'} 共 {allWords.length} 个核心词汇
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 筛选区 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* 级别切换 */}
          <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setLevel('cet4')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${level === 'cet4' ? 'bg-black text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
            >
              CET-4
            </button>
            <button
              onClick={() => setLevel('cet6')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${level === 'cet6' ? 'bg-black text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
            >
              CET-6
            </button>
          </div>

          {/* 搜索框 */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索单词或释义..."
            className="flex-1 sm:max-w-xs px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
          />

          {/* 频率筛选 */}
          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(Number(e.target.value))}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option value={0}>全部频率</option>
            <option value={5}>极高频</option>
            <option value={4}>高频以上</option>
            <option value={3}>中频以上</option>
          </select>
        </div>

        {/* 单词列表 */}
        <div className="text-sm text-neutral-500 mb-4">
          显示 {filteredWords.length} / {allWords.length} 个单词
        </div>

        {filteredWords.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500">没有找到匹配的单词</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredWords.map((word) => (
              <div
                key={word.word}
                className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{word.word}</span>
                      {word.phonetic && (
                        <span className="text-sm text-neutral-400">{word.phonetic}</span>
                      )}
                      <span className={`text-xs px-1.5 py-0.5 rounded ${frequencyColors[word.frequency]}`}>
                        {frequencyLabels[word.frequency]}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {word.definitions.map((def, i) => (
                        <p key={i} className="text-sm text-neutral-600">
                          <span className="text-neutral-400 italic mr-1">{def.pos}</span>
                          {def.def}
                        </p>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToVocabulary(word)}
                    disabled={addedWords.has(word.word)}
                    className={`shrink-0 px-3 py-1.5 text-xs rounded transition-colors ${
                      addedWords.has(word.word)
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    {addedWords.has(word.word) ? '已添加' : '加入生词本'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VocabularyBrowser
