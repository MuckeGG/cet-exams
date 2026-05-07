import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const key = 'cet_total_visits'
    const todayKey = `cet_visits_${new Date().toISOString().split('T')[0]}`

    // 自增累计和今日访问
    const [total, today] = await Promise.all([
      kv.incr(key),
      kv.incr(todayKey)
    ])

    // 今日 key 24 小时过期
    await kv.expire(todayKey, 86400)

    return res.status(200).json({ total, today })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get visitor count' })
  }
}
