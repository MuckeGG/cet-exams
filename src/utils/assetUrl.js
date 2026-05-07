// 资源 URL 辅助函数
// 本地开发时使用相对路径（资源在 public/ 目录）
// 部署时通过 VITE_ASSET_BASE 环境变量指向 OSS 地址
const BASE = import.meta.env.VITE_ASSET_BASE || ''

export const assetUrl = (path) => `${BASE}${path}`
