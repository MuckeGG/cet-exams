# CET-4/CET-6 大学英语四六级真题网站

一个收录了 2019-2025 年大学英语四六级真题的在线练习平台，支持在线答题、自动批改、错题记录和生词收藏。

## 功能特性

- **真题浏览**：支持 CET-4 和 CET-6 两个级别，涵盖 2019-2025 年共 6 年真题
- **PDF 在线查看**：基于 react-pdf 实现试卷在线预览，支持缩放和阅读进度追踪
- **听力播放**：集成听力音频播放器
- **在线答题**：支持听力和阅读选择题在线作答
- **自动批改**：提交后自动评分，显示得分和错题详情
- **错题本**：自动记录答错题目，支持按试卷筛选和重做
- **生词本**：支持手动添加生词，内置四六级词库，支持释义和例句查看
- **阅读进度**：记录每套试卷的阅读百分比，支持跨页面恢复
- **移动端适配**：响应式布局，支持手机和平板访问

## 技术栈

- **前端框架**：React 19
- **构建工具**：Vite 8
- **样式方案**：Tailwind CSS 4
- **路由管理**：React Router 7
- **PDF 渲染**：react-pdf + pdfjs-dist
- **数据存储**：LocalStorage（答题进度、错题、生词）

## 项目结构

```
src/
├── components/
│   ├── ExamBrowser.jsx    # 题库浏览页面
│   ├── ExamDetail.jsx     # 试卷详情（PDF查看、答题、批改）
│   ├── VocabularyBook.jsx # 生词本
│   └── ErrorBook.jsx      # 错题本
├── data/
│   └── examPapers.js      # 试卷数据（年份、套次、PDF路径、答案）
├── utils/
│   ├── grading.js         # 答题批改逻辑
│   ├── errorTracking.js   # 错题记录管理
│   └── vocabulary.js      # 生词本管理
└── App.jsx                # 主应用与路由配置
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

项目为纯前端应用，构建产物可部署到任意静态托管服务（GitHub Pages、Vercel、Nginx 等）。

```bash
npm run build
# 将 dist/ 目录部署到服务器
```
