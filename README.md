# CET-4/CET-6 大学英语四六级真题网站

一个收录了 2019-2025 年大学英语四六级真题的在线练习平台，支持在线答题、自动批改、错题记录和生词收藏。

## 功能特性

- **真题浏览**：支持 CET-4 和 CET-6 两个级别，涵盖 2019-2025 年共 6 年真题
- **PDF 在线查看**：基于 react-pdf 实现试卷在线预览，支持缩放和阅读进度追踪
- **PDF 标注书写**：支持画笔、荧光笔、橡皮三种工具，可在 PDF 上直接做笔记
- **听力播放**：集成听力音频播放器
- **在线答题**：支持听力和阅读选择题在线作答
- **自动批改**：提交后自动评分，显示得分和错题详情
- **错题本**：自动记录答错题目，支持按试卷筛选和重做
- **生词本**：支持手动添加生词，内置四六级词库，支持释义和例句查看
- **学习概览**：Dashboard 展示学习统计数据
- **阅读进度**：记录每套试卷的阅读百分比，支持跨页面恢复
- **访客统计**：实时记录每日学习人数和总访问次数
- **暗色模式**：支持亮色/暗色主题切换
- **移动端适配**：响应式布局，支持手机和平板访问

## 技术栈

- **前端框架**：React 19
- **构建工具**：Vite 8
- **样式方案**：Tailwind CSS 4
- **路由管理**：React Router 7
- **PDF 渲染**：react-pdf + pdfjs-dist
- **数据存储**：LocalStorage（答题进度、错题、生词、标注）
- **后端服务**：Vercel Serverless Functions
- **访客统计**：Supabase（PostgreSQL + REST API）
- **资源托管**：阿里云 OSS（PDF 试卷、音频文件）

## 项目结构

```
src/
├── components/
│   ├── ExamBrowser.jsx       # 题库浏览页面
│   ├── ExamDetail.jsx        # 试卷详情（PDF查看、答题、批改、标注）
│   ├── AnnotationCanvas.jsx  # PDF 标注画布组件
│   ├── AnnotationToolbar.jsx # 标注工具栏
│   ├── VocabularyBook.jsx    # 生词本
│   ├── VocabularyBrowser.jsx # 词库浏览
│   ├── FlashcardReview.jsx   # 闪卡复习
│   ├── WordQuiz.jsx          # 单词测验
│   ├── Dashboard.jsx         # 学习概览
│   ├── ErrorBook.jsx         # 错题本
│   └── Settings.jsx          # 设置页面
├── contexts/
│   └── ThemeContext.jsx       # 主题上下文
├── hooks/
│   └── useAnnotation.js      # 标注状态管理 Hook
├── data/
│   ├── examPapers.js         # 试卷数据
│   ├── answers/              # 答案数据
│   ├── vocabulary/           # 词库数据
│   ├── translation/          # 翻译数据
│   └── writing/              # 写作数据
├── utils/
│   ├── grading.js            # 答题批改逻辑
│   ├── vocabulary.js         # 生词本管理
│   ├── annotations.js        # 标注数据持久化
│   ├── assetUrl.js           # 资源 URL 处理
│   ├── dataManager.js        # 数据导入导出
│   ├── dictionary.js         # 词典查询
│   ├── spacedRepetition.js   # 间隔重复算法
│   └── studyTracker.js       # 学习追踪
└── App.jsx                   # 主应用与路由配置

api/
└── visitor.js                # Vercel Serverless Function（访客统计）
```

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

项目部署在 Vercel，大型资源文件（PDF、音频）托管在阿里云 OSS。

```bash
# 设置环境变量（OSS 资源地址）
VITE_ASSET_BASE=https://cet-exam.oss-cn-guangzhou.aliyuncs.com/public

# 构建并部署
npm run build
```

---

## 更新日志

### v1.1（2026-05-07）

**新功能**
- PDF 标注书写：支持画笔、荧光笔、橡皮三种工具，6 种颜色，3 种粗细
- 标注数据持久化到 localStorage，支持撤销和清除
- 首页访客统计：实时显示今日学习人数和总访问次数
- 每人每天只计数一次（基于 localStorage 去重）
- 总访问次数初始值 25322

**架构优化**
- 迁移到 Vercel 部署，支持 Serverless Functions
- 大型资源文件（PDF、音频）迁移到阿里云 OSS
- 通过 `VITE_ASSET_BASE` 环境变量切换资源地址
- 使用 Supabase 作为访客统计后端（PostgreSQL + REST API）
- 添加 React ErrorBoundary 错误边界

**修复**
- 修复 Vercel 部署后白屏问题（ErrorBoundary 闭合标签缺失）
- 修复 Supabase RLS 策略阻止访客计数写入

### v1.0（2026-05-06）

- 初始版本发布
- 支持 CET-4/CET-6 真题浏览和在线答题
- 支持 PDF 在线查看和听力播放
- 支持自动批改、错题本、生词本
- 支持移动端响应式布局
