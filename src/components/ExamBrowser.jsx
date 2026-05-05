import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { examPapers, getAllYears, getPaperStats } from '../data/examPapers'

const PROGRESS_KEY = 'cet_progress'

const getPaperProgress = (paperId, setCount) => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (!stored) return 0
    const data = JSON.parse(stored)
    let maxProgress = 0
    for (let i = 0; i < setCount; i++) {
      const p = data[`${paperId}-${i}`] || 0
      if (p > maxProgress) maxProgress = p
    }
    return maxProgress
  } catch {
    return 0
  }
}

const ExamBrowser = ({ setExamType }) => {
  const { type } = useParams()
  const navigate = useNavigate()
  // Determine examType from URL param: 'cet4' or 'cet6'
  const currentType = type === 'cet6' ? 'CET-6' : 'CET-4'

  const years = getAllYears(currentType)
  const sessions = ['上半年', '下半年']

  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null)
  const [showNewOnly, setShowNewOnly] = useState(false)

  const filteredPapers = useMemo(() => {
    return examPapers.filter(paper => {
      if (paper.type !== currentType) return false
      if (selectedYear && paper.year !== selectedYear) return false
      if (selectedSession && paper.session !== selectedSession) return false
      if (showNewOnly && !paper.isNew) return false
      return true
    })
  }, [selectedYear, selectedSession, showNewOnly, currentType])

  const clearFilters = () => {
    setSelectedYear(null)
    setSelectedSession(null)
    setShowNewOnly(false)
  }

  const hasActiveFilters = selectedYear || selectedSession || showNewOnly

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
              <h1 className="text-xl sm:text-2xl font-bold">历年真题</h1>
              <p className="text-neutral-500 text-xs sm:text-sm">浏览{currentType === 'CET-4' ? '2020' : '2019'}-2025年全部{currentType}真题</p>
            </div>
            {/* CET-4 / CET-6 Toggle */}
            <div className="flex items-center gap-1 bg-neutral-200 rounded p-0.5">
              <button
                onClick={() => navigate('/exam/cet4')}
                className={`px-3 sm:px-4 py-1.5 text-sm rounded transition-colors ${
                  currentType === 'CET-4'
                    ? 'bg-black text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                CET-4
              </button>
              <button
                onClick={() => navigate('/exam/cet6')}
                className={`px-3 sm:px-4 py-1.5 text-sm rounded transition-colors ${
                  currentType === 'CET-6'
                    ? 'bg-black text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                CET-6
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-neutral-200">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">年份:</span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded ${
                  !selectedYear
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                全部
              </button>
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded ${
                    selectedYear === year
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Session Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">批次:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedSession(null)}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded ${
                  !selectedSession
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                全部
              </button>
              {sessions.map(session => (
                <button
                  key={session}
                  onClick={() => setSelectedSession(session)}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded ${
                    selectedSession === session
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {session}
                </button>
              ))}
            </div>
          </div>

          {/* New Only Toggle */}
          <button
            onClick={() => setShowNewOnly(!showNewOnly)}
            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded border ${
              showNewOnly
                ? 'bg-black text-white border-black'
                : 'bg-white text-neutral-600 border-neutral-300 hover:border-black'
            }`}
          >
           只看最新
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-neutral-500 hover:text-black"
            >
              清除筛选
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-neutral-500">
            共 {filteredPapers.length} 套试卷
          </p>
        </div>

        {/* Exam Papers Grid - Cover Image Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPapers.map(paper => {
            const stats = getPaperStats(paper)
            return (
              <Link
                key={paper.id}
                to={`/exam/${currentType === 'CET-6' ? 'cet6' : 'cet4'}/${paper.id}`}
                className="group block rounded-xl overflow-hidden border-2 border-neutral-200 transition-all duration-300"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#000000'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Cover Image */}
                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                  {paper.coverUrl ? (
                    <img
                      src={paper.coverUrl}
                      alt={`${paper.year}年${paper.session}真题封面`}
                      className="w-full h-full object-cover object-top transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                      <span className="text-neutral-400 text-sm">暂无封面</span>
                    </div>
                  )}
                  {/* Title Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-12">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 bg-white/90 text-neutral-800 rounded">
                        {paper.type}
                      </span>
                      {paper.isNew && (
                        <span className="text-xs font-medium px-2 py-0.5 bg-red-500 text-white rounded">
                          新
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-white">
                      {paper.year}年{paper.session}
                    </h3>
                    <p className="text-xs text-white/70">{paper.examDate}</p>
                  </div>
                  {/* Sets badge */}
                  {paper.sets && paper.sets.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {paper.sets.length}套
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-white">
                  {/* Question Types */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {stats.writing && (
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
                        写作
                      </span>
                    )}
                    {stats.listening && (
                      <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded">
                        听力
                      </span>
                    )}
                    {stats.reading && (
                      <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded">
                        阅读
                      </span>
                    )}
                    {stats.translation && (
                      <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded">
                        翻译
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {paper.sets?.[0]?.pdfUrl && (
                        <a
                          href={paper.sets[0].pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          真题PDF
                        </a>
                      )}
                    </div>
                    {(() => {
                      const pct = getPaperProgress(paper.id, paper.sets?.length || 1)
                      return pct > 0 ? (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
                          {pct >= 100 ? '已完成' : `已阅读 ${pct}%`}
                        </span>
                      ) : (
                        <span className="text-sm text-neutral-400 group-hover:text-black transition-colors font-medium">
                          开始练习 →
                        </span>
                      )
                    })()}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500 mb-4">没有找到符合条件的试卷</p>
            <button
              onClick={clearFilters}
              className="text-sm text-black underline"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamBrowser
