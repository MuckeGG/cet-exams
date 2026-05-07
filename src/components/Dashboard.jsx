import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStudyLog, getStreak, getWeeklyStats, getStudyGoal, setStudyGoal, getTodayProgress, hasStudiedToday } from '../utils/studyTracker'
import { getVocabulary } from '../utils/vocabulary'
import { getGradingHistory } from '../utils/grading'

const Dashboard = () => {
  const [streak, setStreak] = useState({ current: 0, longest: 0 })
  const [weeklyStats, setWeeklyStats] = useState([])
  const [goal, setGoal] = useState({ dailyMinutes: 30, dailyWords: 10 })
  const [todayProgress, setTodayProgress] = useState({ minutes: 0, words: 0, percentage: 0 })
  const [vocabularyCount, setVocabularyCount] = useState(0)
  const [showGoalEditor, setShowGoalEditor] = useState(false)

  useEffect(() => {
    setStreak(getStreak())
    setWeeklyStats(getWeeklyStats())
    setGoal(getStudyGoal())
    setTodayProgress(getTodayProgress())
    setVocabularyCount(getVocabulary().length)
  }, [])

  const handleSaveGoal = (newGoal) => {
    setStudyGoal(newGoal)
    setGoal(newGoal)
    setShowGoalEditor(false)
  }

  const maxDuration = Math.max(...weeklyStats.map(d => d.duration), 1)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between">
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
              <h1 className="text-xl sm:text-2xl font-bold">学习概览</h1>
            </div>
            <button
              onClick={() => setShowGoalEditor(!showGoalEditor)}
              className="px-3 py-1.5 text-sm border border-neutral-300 rounded hover:border-black transition-colors"
            >
              设置目标
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Goal Editor */}
        {showGoalEditor && (
          <GoalEditor currentGoal={goal} onSave={handleSaveGoal} onCancel={() => setShowGoalEditor(false)} />
        )}

        {/* Today's Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="border border-neutral-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">连续打卡</p>
                <p className="text-2xl font-bold">{streak.current} 天</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400">最长连续: {streak.longest} 天</p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">生词本</p>
                <p className="text-2xl font-bold">{vocabularyCount} 词</p>
              </div>
            </div>
            <Link to="/vocabulary" className="text-xs text-neutral-400 hover:text-black transition-colors">
              查看详情 →
            </Link>
          </div>

          <div className="border border-neutral-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">今日进度</p>
                <p className="text-2xl font-bold">{todayProgress.percentage}%</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400">
              {todayProgress.minutes}分钟 / {todayProgress.words}词
            </p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="border border-neutral-200 rounded-lg p-5 mb-8">
          <h2 className="font-bold mb-4">本周学习时长</h2>
          <div className="flex items-end gap-2 h-40">
            {weeklyStats.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                  <div
                    className="w-full max-w-[40px] bg-black rounded-t transition-all duration-300"
                    style={{ height: `${Math.max(4, (day.duration / maxDuration) * 100)}%` }}
                    title={`${day.duration}分钟`}
                  />
                </div>
                <span className="text-xs text-neutral-500">{day.dayName}</span>
                <span className="text-xs text-neutral-400">{day.duration > 0 ? `${day.duration}'` : '-'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="font-bold mb-4">快速入口</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/exam/cet4"
            className="border border-neutral-200 rounded-lg p-4 text-center hover:border-black transition-colors"
          >
            <div className="text-2xl mb-2">📖</div>
            <p className="text-sm font-medium">CET-4 真题</p>
          </Link>
          <Link
            to="/exam/cet6"
            className="border border-neutral-200 rounded-lg p-4 text-center hover:border-black transition-colors"
          >
            <div className="text-2xl mb-2">📚</div>
            <p className="text-sm font-medium">CET-6 真题</p>
          </Link>
          <Link
            to="/vocabulary/review"
            className="border border-neutral-200 rounded-lg p-4 text-center hover:border-black transition-colors"
          >
            <div className="text-2xl mb-2">🃏</div>
            <p className="text-sm font-medium">卡片复习</p>
          </Link>
          <Link
            to="/vocabulary/quiz"
            className="border border-neutral-200 rounded-lg p-4 text-center hover:border-black transition-colors"
          >
            <div className="text-2xl mb-2">✍️</div>
            <p className="text-sm font-medium">单词测验</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

const GoalEditor = ({ currentGoal, onSave, onCancel }) => {
  const [minutes, setMinutes] = useState(currentGoal.dailyMinutes)
  const [words, setWords] = useState(currentGoal.dailyWords)

  return (
    <div className="mb-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
      <h3 className="font-bold mb-3">设置每日学习目标</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <label className="text-sm text-neutral-500 mb-1 block">每日学习时长（分钟）</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-24 px-3 py-1.5 border border-neutral-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-500 mb-1 block">每日背单词数</label>
          <input
            type="number"
            value={words}
            onChange={(e) => setWords(Number(e.target.value))}
            className="w-24 px-3 py-1.5 border border-neutral-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={() => onSave({ dailyMinutes: minutes, dailyWords: words })}
            className="px-4 py-1.5 bg-black text-white rounded hover:bg-neutral-800 transition-colors"
          >
            保存
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-1.5 border border-neutral-300 rounded hover:border-black transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
