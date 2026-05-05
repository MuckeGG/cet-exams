// 试卷数据结构
// ExamPaper: { id, year, session, examDate, type, isNew, coverUrl, papers: [{type, pdfUrl, audioUrl}], sets: [{name, pdfUrl, analysisPdfUrl, audioUrl, answers}] }
// answers: { listening: string[], reading: string[], writing: string, translation: string }

// 听力题型结构
// Listening: { id, audioUrl, transcript, timeRange }

// 阅读题型结构
// Reading: { id, passage, questions: [{id, type, question, options, answer, explanation}] }

// 写作题型结构
// Writing: { id, title, requirements, sample }

export const examPapers = [
  // ===== 2025年12月 CET-4 =====
  {
    id: 'cet4-2025-12',
    year: 2025,
    session: '下半年',
    examDate: '2025-12-13',
    type: 'CET-4',
    isNew: true,
    coverUrl: '/covers/cet4/cet4-2025-12.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2025.12四级真题第1套.pdf',
        analysisPdfUrl: '/解析/cet4/2025.12英语四级解析第1套.pdf',
        audioUrl: '/audio/cet4/2025年12月四级听力第1套.mp3',
        // 答案数据：听力1-25题，阅读26-55题
        answers: {
          listening: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A'],
          reading: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
          writing: '',
          translation: ''
        }
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2025.12四级真题第2套.pdf',
        analysisPdfUrl: '/解析/cet4/2025.12英语四级解析第2套.pdf',
        audioUrl: '/audio/cet4/2025年12月四级听力第2套.mp3',
        answers: {
          listening: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A'],
          reading: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
          writing: '',
          translation: ''
        }
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2025.12四级真题第3套.pdf',
        analysisPdfUrl: '/解析/cet4/2025.12英语四级解析第3套.pdf',
        audioUrl: '/audio/cet4/2025年12月四级听力第1套.mp3',
        answers: {
          listening: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A'],
          reading: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'],
          writing: '',
          translation: ''
        }
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2025年12月四级听力第1套.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2025年06月 CET-4 =====
  {
    id: 'cet4-2025-06',
    year: 2025,
    session: '上半年',
    examDate: '2025-06-14',
    type: 'CET-4',
    isNew: true,
    coverUrl: '/covers/cet4/cet4-2025-06.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2025.06四级真题第1套.pdf',
        analysisPdfUrl: '/解析/cet4/2025.06英语四级解析第1套.pdf',
        audioUrl: '/audio/cet4/2025年06月四级听力第1套.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2025.06四级真题第2套.pdf',
        analysisPdfUrl: '/解析/cet4/2025.06英语四级解析第2套.pdf',
        audioUrl: '/audio/cet4/2025年06月四级听力第2套.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2025.06四级真题第3套.pdf',
        analysisPdfUrl: '/解析/cet4/2025.06英语四级解析第3套.pdf',
        audioUrl: '/audio/cet4/2025年06月四级听力第1套.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2025年06月四级听力第1套.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2025年12月 CET-6 =====
  {
    id: 'cet6-2025-12',
    year: 2025,
    session: '下半年',
    examDate: '2025-12-13',
    type: 'CET-6',
    isNew: true,
    coverUrl: '/covers/cet6/cet6-2025-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2025-12-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2025-12-1.pdf', audioUrl: '/audio/cet6/cet6-2025-12-1.mp3', answers: { listening: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A'], reading: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'], writing: '', translation: '' } },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2025-12-2.pdf', analysisPdfUrl: '/解析/cet6/cet6-2025-12-2.pdf', audioUrl: '/audio/cet6/cet6-2025-12-2.mp3', answers: { listening: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A'], reading: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'], writing: '', translation: '' } },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2025-12-3.pdf', analysisPdfUrl: '/解析/cet6/cet6-2025-12-3.pdf', audioUrl: '/audio/cet6/cet6-2025-12-1.mp3', answers: { listening: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A'], reading: ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'], writing: '', translation: '' } },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2025-12-1.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2025年06月 CET-6 =====
  {
    id: 'cet6-2025-06',
    year: 2025,
    session: '上半年',
    examDate: '2025-06-14',
    type: 'CET-6',
    isNew: true,
    coverUrl: '/covers/cet6/cet6-2025-06.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2025-06-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2025-06-1.pdf', audioUrl: '/audio/cet6/cet6-2025-06-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2025-06-2.pdf', analysisPdfUrl: '/解析/cet6/cet6-2025-06-2.pdf', audioUrl: '/audio/cet6/cet6-2025-06-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2025-06-3.pdf', analysisPdfUrl: '/解析/cet6/cet6-2025-06-3.pdf', audioUrl: '/audio/cet6/cet6-2025-06-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2025-06-1.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2024年12月 =====
  {
    id: 'cet4-2024-12',
    year: 2024,
    session: '下半年',
    examDate: '2024-12-14',
    type: 'CET-4',
    isNew: true,
    coverUrl: '/covers/cet4/cet4-2024-12.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2024.12四级真题第1套.pdf',
        analysisPdfUrl: '/papers/cet4/2024.12英语四级解析第1套.pdf',
        audioUrl: '/audio/cet4/2024年12月四级听力第1套.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2024.12四级真题第2套.pdf',
        analysisPdfUrl: '/papers/cet4/2024.12英语四级解析第2套.pdf',
        audioUrl: '/audio/cet4/2024年12月四级听力第2套.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2024.12四级真题第3套.pdf',
        analysisPdfUrl: '/papers/cet4/2024.12英语四级解析第3套.pdf',
        audioUrl: '/audio/cet4/2024年12月四级听力第1套.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2024年12月四级听力第1套.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2024年06月 =====
  {
    id: 'cet4-2024-06',
    year: 2024,
    session: '上半年',
    examDate: '2024-06-15',
    type: 'CET-4',
    isNew: true,
    coverUrl: '/covers/cet4/cet4-2024-06.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/大学英语四级考试2024年6月真题【第一套】.pdf',
        analysisPdfUrl: '/解析/cet4/2024年6月四级真题解析【第一套】.pdf',
        audioUrl: '/audio/cet4/2024年06月四级听力第1套.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/大学英语四级考试2024年6月真题【第二套】.pdf',
        analysisPdfUrl: '/解析/cet4/2024年6月四级真题解析【第二套】.pdf',
        audioUrl: '/audio/cet4/2024年06月四级听力第2套.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/大学英语四级考试2024年6月真题【第三套】.pdf',
        analysisPdfUrl: '/解析/cet4/2024年6月四级真题解析【第三套】.pdf',
        audioUrl: '/audio/cet4/2024年06月四级听力第1套.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2024年06月四级听力第1套.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2023年12月 =====
  {
    id: 'cet4-2023-12',
    year: 2023,
    session: '下半年',
    examDate: '2023-12-16',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2023-12.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2023.12四级真题第1套【可复制可检索】.pdf',
        analysisPdfUrl: '/解析/cet4/2023.12英语四级真题第1套解析.pdf',
        audioUrl: '/audio/cet4/2023年12月四级听力第1套.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2023.12四级真题第2套【可复制可检索】.pdf',
        analysisPdfUrl: '/解析/cet4/2023.12英语四级真题第2套解析.pdf',
        audioUrl: '/audio/cet4/2023年12月四级听力第2套.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2023.12四级真题第3套【可复制可检索】.pdf',
        analysisPdfUrl: '/解析/cet4/2023.12英语四级真题第3套解析.pdf',
        audioUrl: '/audio/cet4/2023年12月四级听力第1套.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2023年12月四级听力第1套.mp3', duration: 1760, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2023年06月 =====
  {
    id: 'cet4-2023-06',
    year: 2023,
    session: '上半年',
    examDate: '2023-06-17',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2023-06.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2023.06英语四级真题第1套.pdf',
        analysisPdfUrl: '/解析/cet4/2023.06四级真题第1套详解.pdf',
        audioUrl: '/audio/cet4/2023.06四级真题第1套听力音频.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2023.06英语四级真题第2套.pdf',
        analysisPdfUrl: '/解析/cet4/2023.06四级真题第2套详解.pdf',
        audioUrl: '/audio/cet4/2023.06四级真题第2套听力音频.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2023.06英语四级真题第3套.pdf',
        analysisPdfUrl: '/解析/cet4/2023.06四级真题第3套详解.pdf',
        audioUrl: '/audio/cet4/2023.06四级真题第1套听力音频.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2023.06四级真题第1套听力音频.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2023年03月 =====
  {
    id: 'cet4-2023-03',
    year: 2023,
    session: '上半年',
    examDate: '2023-03-12',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2023-03.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2023.03英语四级真题第1套.pdf',
        analysisPdfUrl: '/解析/cet4/2023.03英语四级详解第1套.pdf',
        audioUrl: '/audio/cet4/2023年03月四级真题（3套相同）听力音频.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2023.03英语四级真题第2套.pdf',
        analysisPdfUrl: '/解析/cet4/2023.03英语四级详解第2套.pdf',
        audioUrl: '/audio/cet4/2023年03月四级真题（3套相同）听力音频.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2023.03英语四级真题第3套.pdf',
        analysisPdfUrl: '/解析/cet4/2023.03英语四级详解第3套.pdf',
        audioUrl: '/audio/cet4/2023年03月四级真题（3套相同）听力音频.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2023年03月四级真题（3套相同）听力音频.mp3', duration: 1720, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2022年12月 =====
  {
    id: 'cet4-2022-12',
    year: 2022,
    session: '下半年',
    examDate: '2022-12-10',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2022-12.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2022.12四级真题第1套.pdf',
        analysisPdfUrl: '/解析/cet4/2022.12四级真题第1套答案及详解.pdf',
        audioUrl: '/audio/cet4/2022.12四级真题第1套听力.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2022.12四级真题第2套.pdf',
        analysisPdfUrl: '/解析/cet4/2022.12四级真题第2套答案及详解.pdf',
        audioUrl: '/audio/cet4/2022.12四级真题第2套听力.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2022.12四级真题第3套.pdf',
        analysisPdfUrl: '/解析/cet4/2022.12四级真题第3套答案及详解.pdf',
        audioUrl: '/audio/cet4/2022.12四级真题第1套听力.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2022.12四级真题第1套听力.mp3', duration: 1720, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2022年09月 =====
  {
    id: 'cet4-2022-09',
    year: 2022,
    session: '下半年',
    examDate: '2022-09-17',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2022-09.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2022.09英语四级真题第1套【可复制可搜索，打印首选】.pdf',
        analysisPdfUrl: '/解析/cet4/2022.09英语四级详解第1套.pdf',
        audioUrl: '/audio/cet4/2022年09月四级听力（全1套）.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2022.09英语四级真题第2套【可复制可搜索，打印首选】.pdf',
        analysisPdfUrl: '/解析/cet4/2022.09英语四级详解第2套.pdf',
        audioUrl: '/audio/cet4/2022年09月四级听力（全1套）.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2022.09英语四级真题第3套【可复制可搜索，打印首选】.pdf',
        analysisPdfUrl: '/解析/cet4/2022.09英语四级详解第3套.pdf',
        audioUrl: '/audio/cet4/2022年09月四级听力（全1套）.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2022年09月四级听力（全1套）.mp3', duration: 1700, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2022年06月 =====
  {
    id: 'cet4-2022-06',
    year: 2022,
    session: '上半年',
    examDate: '2022-06-11',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2022-06.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/2022.06四级真题第1套【可复制可搜索，打印首选】.pdf',
        analysisPdfUrl: '/解析/cet4/2022.06英语四级解析第1套.pdf',
        audioUrl: '/audio/cet4/2022年06月四级听力（全1套）.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/2022.06四级真题第2套【可复制可搜索，打印首选】.pdf',
        analysisPdfUrl: '/解析/cet4/2022.06英语四级解析第2套.pdf',
        audioUrl: '/audio/cet4/2022年06月四级听力（全1套）.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/2022.06四级真题第3套【可复制可搜索，打印首选】.pdf',
        analysisPdfUrl: '/解析/cet4/2022.06英语四级解析第3套.pdf',
        audioUrl: '/audio/cet4/2022年06月四级听力（全1套）.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2022年06月四级听力（全1套）.mp3', duration: 1720, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2021年12月 =====
  {
    id: 'cet4-2021-12',
    year: 2021,
    session: '下半年',
    examDate: '2021-12-18',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2021-12.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/cet4-2021-12-1.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2021-12-1.pdf',
        audioUrl: '/audio/cet4/cet4-2021-12-1.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/cet4-2021-12-2.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2021-12-2.pdf',
        audioUrl: '/audio/cet4/cet4-2021-12-2.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/cet4-2021-12-3.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2021-12-3.pdf',
        audioUrl: '/audio/cet4/cet4-2021-12-1.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/cet4-2021-12-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2021年06月 =====
  {
    id: 'cet4-2021-06',
    year: 2021,
    session: '上半年',
    examDate: '2021-06-12',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2021-06.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/cet4-2021-06-1.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2021-06-1.pdf',
        audioUrl: '/audio/cet4/cet4-2021-06-1.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/cet4-2021-06-2.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2021-06-2.pdf',
        audioUrl: '/audio/cet4/cet4-2021-06-2.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/cet4-2021-06-3.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2021-06-3.pdf',
        audioUrl: '/audio/cet4/cet4-2021-06-1.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/cet4-2021-06-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2020年12月 =====
  {
    id: 'cet4-2020-12',
    year: 2020,
    session: '下半年',
    examDate: '2020-12-12',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2020-12.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/cet4-2020-12-1.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2020-12-1.pdf',
        audioUrl: '/audio/cet4/cet4-2020-12-1.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/cet4-2020-12-2.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2020-12-2.pdf',
        audioUrl: '/audio/cet4/cet4-2020-12-2.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/cet4-2020-12-3.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2020-12-3.pdf',
        audioUrl: '/audio/cet4/cet4-2020-12-1.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/cet4-2020-12-1.mp3', duration: 1760, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2020年09月 =====
  {
    id: 'cet4-2020-09',
    year: 2020,
    session: '下半年',
    examDate: '2020-09-19',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2020-09.png',
    sets: [
      {
        name: '第1套',
        pdfUrl: '/papers/cet4/cet4-2020-09-1.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2020-09-1.pdf',
        audioUrl: '/audio/cet4/cet4-2020-09.mp3',
      },
      {
        name: '第2套',
        pdfUrl: '/papers/cet4/cet4-2020-09-2.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2020-09-2.pdf',
        audioUrl: '/audio/cet4/cet4-2020-09.mp3',
      },
      {
        name: '第3套',
        pdfUrl: '/papers/cet4/cet4-2020-09-3.pdf',
        analysisPdfUrl: '/解析/cet4/cet4-2020-09-3.pdf',
        audioUrl: '/audio/cet4/cet4-2020-09.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/cet4-2020-09.mp3', duration: 1780, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2020年07月 =====
  {
    id: 'cet4-2020-07',
    year: 2020,
    session: '上半年',
    examDate: '2020-07-11',
    type: 'CET-4',
    isNew: false,
    coverUrl: '/covers/cet4/cet4-2020-07.png',
    sets: [
      {
        name: '全套',
        pdfUrl: '/papers/cet4/2020.07-CET4真题.pdf',
        analysisPdfUrl: '/解析/cet4/2020.07-CET4真题解析.pdf',
        audioUrl: '/audio/cet4/2020.07-CET4 听力.mp3',
      },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet4/2020.07-CET4 听力.mp3', duration: 1700, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },

  // ==================== CET-6 ====================

  // ===== 2024年12月 CET-6 =====
  {
    id: 'cet6-2024-12',
    year: 2024,
    session: '下半年',
    examDate: '2024-12-14',
    type: 'CET-6',
    isNew: true,
    coverUrl: '/covers/cet6/cet6-2024-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2024-12-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2024-12-1.pdf', audioUrl: '/audio/cet6/cet6-2024-12-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2024-12-2.pdf', analysisPdfUrl: '/解析/cet6/cet6-2024-12-2.pdf', audioUrl: '/audio/cet6/cet6-2024-12-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2024-12-3.pdf', analysisPdfUrl: '/解析/cet6/cet6-2024-12-3.pdf', audioUrl: '/audio/cet6/cet6-2024-12-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2024-12-1.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2024年06月 CET-6 =====
  {
    id: 'cet6-2024-06',
    year: 2024,
    session: '上半年',
    examDate: '2024-06-15',
    type: 'CET-6',
    isNew: true,
    coverUrl: '/covers/cet6/cet6-2024-06.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2024-06-1.pdf', analysisPdfUrl: '/解析/cet6/2024.6六级第一套解析.pdf', audioUrl: '/audio/cet6/cet6-2024-06-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2024-06-2.pdf', analysisPdfUrl: '/解析/cet6/2024.6六级第二套解析.pdf', audioUrl: '/audio/cet6/cet6-2024-06-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2024-06-3.pdf', analysisPdfUrl: '/解析/cet6/2024.6六级第三套解析.pdf', audioUrl: '/audio/cet6/cet6-2024-06-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2024-06-1.mp3', duration: 1800, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2023年12月 CET-6 =====
  {
    id: 'cet6-2023-12',
    year: 2023,
    session: '下半年',
    examDate: '2023-12-16',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2023-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2023-12-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-12-1.pdf', audioUrl: '/audio/cet6/cet6-2023-12-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2023-12-2.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-12-2.pdf', audioUrl: '/audio/cet6/cet6-2023-12-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2023-12-3.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-12-3.pdf', audioUrl: '/audio/cet6/cet6-2023-12-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2023-12-1.mp3', duration: 1760, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2023年06月 CET-6 =====
  {
    id: 'cet6-2023-06',
    year: 2023,
    session: '上半年',
    examDate: '2023-06-17',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2023-06.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2023-06-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-06-1.pdf', audioUrl: '/audio/cet6/cet6-2023-06-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2023-06-2.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-06-2.pdf', audioUrl: '/audio/cet6/cet6-2023-06-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2023-06-3.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-06-3.pdf', audioUrl: '/audio/cet6/cet6-2023-06-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2023-06-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2023年03月 CET-6 =====
  {
    id: 'cet6-2023-03',
    year: 2023,
    session: '上半年',
    examDate: '2023-03-12',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2023-03.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2023-03-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-03-1.pdf', audioUrl: '/audio/cet6/cet6-2023-03-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2023-03-2.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-03-2.pdf', audioUrl: '/audio/cet6/cet6-2023-03-1.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2023-03-3.pdf', analysisPdfUrl: '/解析/cet6/cet6-2023-03-3.pdf', audioUrl: '/audio/cet6/cet6-2023-03-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2023-03-1.mp3', duration: 1720, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2022年12月 CET-6 =====
  {
    id: 'cet6-2022-12',
    year: 2022,
    session: '下半年',
    examDate: '2022-12-10',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2022-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2022-12-1.pdf', analysisPdfUrl: '/解析/cet6/2022.12六级真题第1套答案及详解.pdf', audioUrl: '/audio/cet6/cet6-2022-12-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2022-12-2.pdf', analysisPdfUrl: '/解析/cet6/2022.12六级真题第2套答案及详解.pdf', audioUrl: '/audio/cet6/cet6-2022-12-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2022-12-3.pdf', analysisPdfUrl: '/解析/cet6/2022.12六级真题第3套答案及详解.pdf', audioUrl: '/audio/cet6/cet6-2022-12-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2022-12-1.mp3', duration: 1720, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2022年09月 CET-6 =====
  {
    id: 'cet6-2022-09',
    year: 2022,
    session: '下半年',
    examDate: '2022-09-17',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2022-09.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2022-09-1.pdf', analysisPdfUrl: '/解析/cet6/2022.09英语六级解析第1套.pdf', audioUrl: '/audio/cet6/cet6-2022-09-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2022-09-2.pdf', analysisPdfUrl: '/解析/cet6/2022.09英语六级解析第2套.pdf', audioUrl: '/audio/cet6/cet6-2022-09-1.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2022-09-3.pdf', analysisPdfUrl: '/解析/cet6/2022.09英语六级解析第3套.pdf', audioUrl: '/audio/cet6/cet6-2022-09-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2022-09-1.mp3', duration: 1700, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2022年06月 CET-6 =====
  {
    id: 'cet6-2022-06',
    year: 2022,
    session: '上半年',
    examDate: '2022-06-11',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2022-06.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2022-06-1.pdf', analysisPdfUrl: '/解析/cet6/2022.06英语六级考试解析第1套.pdf', audioUrl: '/audio/cet6/cet6-2022-06-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2022-06-2.pdf', analysisPdfUrl: '/解析/cet6/2022.06英语六级真题解析第2套 .pdf', audioUrl: '/audio/cet6/cet6-2022-06-1.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2022-06-3.pdf', analysisPdfUrl: '/解析/cet6/2022.06英语六级真题解析第3套 .pdf', audioUrl: '/audio/cet6/cet6-2022-06-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2022-06-1.mp3', duration: 1720, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2021年12月 CET-6 =====
  {
    id: 'cet6-2021-12',
    year: 2021,
    session: '下半年',
    examDate: '2021-12-18',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2021-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2021-12-1.pdf', analysisPdfUrl: '/解析/cet6/2021.12英语六级解析第1套.pdf', audioUrl: '/audio/cet6/cet6-2021-12-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2021-12-2.pdf', analysisPdfUrl: '/解析/cet6/2021.12英语六级解析第2套.pdf', audioUrl: '/audio/cet6/cet6-2021-12-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2021-12-3.pdf', analysisPdfUrl: '/解析/cet6/2021.12英语六级解析第3套.pdf', audioUrl: '/audio/cet6/cet6-2021-12-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2021-12-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2021年06月 CET-6 =====
  {
    id: 'cet6-2021-06',
    year: 2021,
    session: '上半年',
    examDate: '2021-06-12',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2021-06.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2021-06-1.pdf', analysisPdfUrl: '/解析/cet6/2021.06英语六级答案解析第1套.pdf', audioUrl: '/audio/cet6/cet6-2021-06-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2021-06-2.pdf', analysisPdfUrl: '/解析/cet6/2021.06英语六级答案解析第2套.pdf', audioUrl: '/audio/cet6/cet6-2021-06-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2021-06-3.pdf', analysisPdfUrl: '/解析/cet6/2021.06英语六级答案解析第3套.pdf', audioUrl: '/audio/cet6/cet6-2021-06-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2021-06-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2020年12月 CET-6 =====
  {
    id: 'cet6-2020-12',
    year: 2020,
    session: '下半年',
    examDate: '2020-12-12',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2020-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2020-12-1.pdf', analysisPdfUrl: '/解析/cet6/2020.12英语六级考试第1套解析.pdf', audioUrl: '/audio/cet6/cet6-2020-12-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2020-12-2.pdf', analysisPdfUrl: '/解析/cet6/2020.12英语六级考试第2套解析.pdf', audioUrl: '/audio/cet6/cet6-2020-12-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2020-12-3.pdf', analysisPdfUrl: '/解析/cet6/2020.12英语六级考试第3套解析.pdf', audioUrl: '/audio/cet6/cet6-2020-12-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2020-12-1.mp3', duration: 1760, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2020年09月 CET-6 =====
  {
    id: 'cet6-2020-09',
    year: 2020,
    session: '下半年',
    examDate: '2020-09-19',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2020-09.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2020-09-1.pdf', analysisPdfUrl: '/解析/cet6/2020.09英语六级考试第1套解析.pdf', audioUrl: '/audio/cet6/cet6-2020-09-1.mp3' },
      { name: '第2/3套', pdfUrl: '/papers/cet6/cet6-2020-09-2.pdf', analysisPdfUrl: '/解析/cet6/2020.09英语六级考试第2、3套解析.pdf', audioUrl: '/audio/cet6/cet6-2020-09-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2020-09-1.mp3', duration: 1780, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2020年07月 CET-6 =====
  {
    id: 'cet6-2020-07',
    year: 2020,
    session: '上半年',
    examDate: '2020-07-11',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2020-07.png',
    sets: [
      { name: '全套', pdfUrl: '/papers/cet6/cet6-2020-07-1.pdf', analysisPdfUrl: '/解析/cet6/cet6-2020-07-1.pdf', audioUrl: '/audio/cet6/cet6-2020-07-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2020-07-1.mp3', duration: 1700, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2019年12月 CET-6 =====
  {
    id: 'cet6-2019-12',
    year: 2019,
    session: '下半年',
    examDate: '2019-12-14',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2019-12.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2019-12-1.pdf', analysisPdfUrl: '/解析/cet6/2019.12英语六级考试解析第1套.pdf', audioUrl: '/audio/cet6/cet6-2019-12-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2019-12-2.pdf', analysisPdfUrl: '/解析/cet6/2019.12英语六级考试解析第2套.pdf', audioUrl: '/audio/cet6/cet6-2019-12-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2019-12-3.pdf', analysisPdfUrl: '/解析/cet6/2019.12英语六级考试解析第3套.pdf', audioUrl: '/audio/cet6/cet6-2019-12-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2019-12-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
  // ===== 2019年06月 CET-6 =====
  {
    id: 'cet6-2019-06',
    year: 2019,
    session: '上半年',
    examDate: '2019-06-15',
    type: 'CET-6',
    isNew: false,
    coverUrl: '/covers/cet6/cet6-2019-06.png',
    sets: [
      { name: '第1套', pdfUrl: '/papers/cet6/cet6-2019-06-1.pdf', analysisPdfUrl: '/解析/cet6/2019年06月真题解析第1套.pdf', audioUrl: '/audio/cet6/cet6-2019-06-1.mp3' },
      { name: '第2套', pdfUrl: '/papers/cet6/cet6-2019-06-2.pdf', analysisPdfUrl: '/解析/cet6/2019年06月真题解析第2套.pdf', audioUrl: '/audio/cet6/cet6-2019-06-2.mp3' },
      { name: '第3套', pdfUrl: '/papers/cet6/cet6-2019-06-3.pdf', analysisPdfUrl: '/解析/cet6/2019年06月真题解析第3套.pdf', audioUrl: '/audio/cet6/cet6-2019-06-1.mp3' },
    ],
    papers: [
      { type: '写作', content: '' },
      { type: '听力', audioUrl: '/audio/cet6/cet6-2019-06-1.mp3', duration: 1740, transcript: [] },
      { type: '阅读', content: { passage: '', questions: [] } },
      { type: '翻译', content: '' },
    ],
  },
]

// 获取所有年份
export const getAllYears = (examType) => {
  const papers = examType ? examPapers.filter(p => p.type === examType) : examPapers
  return [...new Set(papers.map(p => p.year))].sort((a, b) => b - a)
}

// ���年份和套次筛选
export const filterPapers = (year, session) => {
  return examPapers.filter(p => {
    if (year && p.year !== year) return false
    if (session && p.session !== session) return false
    return true
  })
}

// 根据ID获取试卷
export const getPaperById = (id) => examPapers.find(p => p.id === id)

// 获取试卷的题目数量统计
export const getPaperStats = (paper) => {
  const stats = { writing: false, listening: false, reading: false, translation: false }
  paper.papers.forEach(p => {
    if (p.type === '写作') stats.writing = true
    if (p.type === '听力') stats.listening = true
    if (p.type === '阅读') stats.reading = true
    if (p.type === '翻译') stats.translation = true
  })
  return stats
}
