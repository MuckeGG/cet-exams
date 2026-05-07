import { useState, useEffect, Component } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { assetUrl } from './utils/assetUrl'
import ExamBrowser from './components/ExamBrowser'
import ExamDetail from './components/ExamDetail'
import VocabularyBook from './components/VocabularyBook'
import VocabularyBrowser from './components/VocabularyBrowser'
import FlashcardReview from './components/FlashcardReview'
import WordQuiz from './components/WordQuiz'
import Dashboard from './components/Dashboard'
import ErrorBook from './components/ErrorBook'
import Settings from './components/Settings'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

// Navigation Component
const Navigation = ({ examType, onExamTypeChange }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { dark, toggle } = useTheme()

  return (
    <nav className="border-b border-black dark:border-neutral-700 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-black rounded flex items-center justify-center">
              <span className="text-xs font-bold">CET</span>
            </div>
            <span className="font-bold text-sm sm:text-base">大学英语四六级考试真题</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm ${isHome ? 'font-bold' : 'text-neutral-500'}`}
            >
              首页
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm ${location.pathname === '/dashboard' ? 'font-bold' : 'text-neutral-500'}`}
            >
              学习概览
            </Link>
            <Link
              to="/vocabulary"
              className={`text-sm ${location.pathname.startsWith('/vocabulary') ? 'font-bold' : 'text-neutral-500'}`}
            >
              生词本
            </Link>
            <Link
              to="/errors"
              className={`text-sm ${location.pathname === '/errors' ? 'font-bold' : 'text-neutral-500'}`}
            >
              错题本
            </Link>
            {/* CET-4 / CET-6 Toggle */}
            <div className="flex items-center gap-1 bg-neutral-100 rounded p-0.5">
              <button
                onClick={() => onExamTypeChange('CET-4')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  examType === 'CET-4'
                    ? 'bg-black text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                CET-4
              </button>
              <button
                onClick={() => onExamTypeChange('CET-6')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  examType === 'CET-6'
                    ? 'bg-black text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                CET-6
              </button>
            </div>
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={dark ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {/* Settings */}
            <Link
              to="/settings"
              className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="设置"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-neutral-100"
            aria-label="菜单"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm ${isHome ? 'font-bold' : 'text-neutral-500'}`}
              >
                首页
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm ${location.pathname === '/dashboard' ? 'font-bold' : 'text-neutral-500'}`}
              >
                学习概览
              </Link>
              <Link
                to="/vocabulary"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm ${location.pathname.startsWith('/vocabulary') ? 'font-bold' : 'text-neutral-500'}`}
              >
                生词本
              </Link>
              <Link
                to="/errors"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm ${location.pathname === '/errors' ? 'font-bold' : 'text-neutral-500'}`}
              >
                错题本
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">考试类型:</span>
                <div className="flex gap-1 bg-neutral-100 rounded p-0.5">
                  <button
                    onClick={() => { onExamTypeChange('CET-4'); setMobileMenuOpen(false) }}
                    className={`px-3 py-1 text-sm rounded transition-colors text-center ${
                      examType === 'CET-4'
                        ? 'bg-black text-white'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    CET-4
                  </button>
                  <button
                    onClick={() => { onExamTypeChange('CET-6'); setMobileMenuOpen(false) }}
                    className={`px-3 py-1 text-sm rounded transition-colors text-center ${
                      examType === 'CET-6'
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
        )}
      </div>
    </nav>
  )
}

// Home Page Component
const HomePage = ({ examType, onExamTypeChange }) => {
  // Calculate days until June 13, 2026
  const targetDate = new Date('2026-06-13')
  const today = new Date()
  const diffTime = targetDate - today
  const days = diffTime / (1000 * 60 * 60 * 24)

  const [visitorStats, setVisitorStats] = useState({ today: 0, total: 0 })
  useEffect(() => {
    fetch('/api/visitor')
      .then(r => r.json())
      .then(data => {
        if (data && typeof data.today === 'number') {
          setVisitorStats({ today: data.today, total: data.total })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation examType={examType} onExamTypeChange={onExamTypeChange} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-center">
          大学英语四六级
        </h1>
        <p className="text-neutral-500 text-base md:text-lg mb-6 md:mb-8 text-center">
          收集了2019-2025的大学英语四六级真题
        </p>

        {/* Buttons and Countdown */}
        <div className="flex flex-col items-center gap-3 mb-6 md:mb-8 w-full max-w-[200px] sm:max-w-2xl sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            to="/exam/cet4"
            className={`w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium text-center transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              examType === 'CET-4'
                ? 'bg-black text-white'
                : 'bg-white text-black border border-black'
            }`}
          >
            CET-4真题
          </Link>
          <Link
            to="/exam/cet6"
            className={`w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium text-center transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              examType === 'CET-6'
                ? 'bg-black text-white'
                : 'bg-white text-black border border-black'
            }`}
          >
            CET-6真题
          </Link>

          {/* Countdown */}
          <div className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 text-center flex items-center gap-2 sm:gap-3 transition-transform duration-300 hover:scale-[1.02] w-full sm:w-auto justify-center" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            <span className="text-xs sm:text-sm font-bold">距下次CET考试还有</span>
            <span className="text-xl sm:text-2xl font-bold">{days.toFixed(1)}</span>
            <span className="text-xs sm:text-sm font-bold">天</span>
          </div>
        </div>

        {/* Visitor Counter */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6 md:mb-8 text-neutral-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm">今日 <span className="font-bold text-neutral-600">{visitorStats.today}</span></span>
          </div>
          <div className="w-px h-4 bg-neutral-300" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">累计 <span className="font-bold text-neutral-600">{visitorStats.total.toLocaleString()}</span></span>
          </div>
        </div>

        {/* QR Code - below buttons, centered */}
        <div className="border border-black rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 transition-transform duration-300 hover:scale-[1.02] relative w-full max-w-lg sm:max-w-xl" style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
          <p className="absolute top-2 right-3 text-xs sm:text-sm font-bold text-neutral-400 opacity-60">我是广告，不给你关哈哈哈</p>
          <img
            src={assetUrl('/作者二维码.jpg')}
            alt="作者二维码"
            className="w-32 sm:w-40 flex-shrink-0 rounded-lg"
          />
          <div className="text-center sm:text-left">
            <p className="text-lg sm:text-2xl font-bold text-red-600 mb-2">需要打印试卷吗？</p>
            <p className="text-base sm:text-xl font-bold text-neutral-800">广州大学（桂花岗校区）打印</p>
            <p className="text-sm sm:text-lg font-bold text-neutral-700 mt-1">黑白单面 0.2元/张</p>
            <p className="text-sm sm:text-lg font-bold text-neutral-700">黑白双面 0.3元/张</p>
            <p className="text-sm sm:text-lg font-bold text-neutral-700">可配送到宿舍，或自取</p>
          </div>
        </div>
      </section>

    </div>
  )
}

// Error Boundary
class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace' }}>
          <h1 style={{ color: 'red' }}>出错了</h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

// App with Router
function App() {
  const [examType, setExamType] = useState('CET-4')

  return (
    <ErrorBoundary>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage examType={examType} onExamTypeChange={setExamType} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exam/:type" element={<ExamBrowser setExamType={setExamType} />} />
          <Route path="/exam/:type/:id" element={<ExamDetail />} />
          <Route path="/vocabulary" element={<VocabularyBook />} />
          <Route path="/vocabulary/browse" element={<VocabularyBrowser />} />
          <Route path="/vocabulary/review" element={<FlashcardReview />} />
          <Route path="/vocabulary/quiz" element={<WordQuiz />} />
          <Route path="/errors" element={<ErrorBook />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
