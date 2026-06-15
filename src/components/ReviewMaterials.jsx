import { Link } from 'react-router-dom'

const subjects = [
  {
    id: 'python',
    title: 'Python 编程实践',
    subtitle: 'Python Programming',
    description: '涵盖基础语法、数据结构、函数、面向对象、字符串处理、文件操作、异常处理及常用模块等全部章节',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-700',
    borderHover: 'hover:border-green-500',
    chapters: [
      'Python 基础知识',
      '数据结构',
      '流程控制',
      '函数',
      '面向对象',
      '字符串处理',
      '文件操作',
      '异常处理',
      '模块与包',
    ],
    link: '/python-review.html',
    isExternal: true,
    semester: '2025 春季',
    status: 'available',
  },
  // 后续科目可在此添加
  // {
  //   id: 'subject-id',
  //   title: '科目名称',
  //   subtitle: 'English Name',
  //   description: '科目描述',
  //   icon: (...),
  //   gradient: 'from-blue-500 to-indigo-700',
  //   borderHover: 'hover:border-blue-500',
  //   chapters: [...],
  //   link: '/review-page.html',
  //   isExternal: true,
  //   semester: '2025 春季',
  //   status: 'available',
  // },
]

const ReviewMaterials = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
          <h1 className="text-xl sm:text-2xl font-bold dark:text-white">复习资料</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">各科目期末复习资料汇总，点击卡片进入对应内容</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}

          {/* Placeholder: Add Subject */}
          <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
            <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-sm text-neutral-400">更多科目即将上线</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const SubjectCard = ({ subject }) => {
  const CardWrapper = subject.isExternal ? 'a' : Link
  const linkProps = subject.isExternal
    ? { href: subject.link }
    : { to: subject.link }

  return (
    <CardWrapper
      {...linkProps}
      className={`group block border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${subject.borderHover}`}
    >
      {/* Card Top: Gradient Banner */}
      <div className={`bg-gradient-to-br ${subject.gradient} px-6 py-5 flex items-center gap-4`}>
        <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
          {subject.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white">{subject.title}</h2>
          <p className="text-sm text-white/70">{subject.subtitle}</p>
        </div>
        <span className="text-xs text-white/60 bg-white/10 px-2.5 py-1 rounded-full flex-shrink-0">
          {subject.semester}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-6 py-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          {subject.description}
        </p>

        {/* Chapter List */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {subject.chapters.map((chapter, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {chapter}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-xs text-neutral-400">{subject.chapters.length} 个章节</span>
          <span className="text-sm font-medium text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors flex items-center gap-1">
            开始复习
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </CardWrapper>
  )
}

export default ReviewMaterials
