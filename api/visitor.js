export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const SUPABASE_URL = 'https://gpnwrsfwdswuqbssbxrr.supabase.co'
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwbndyc2Z3ZHN3dXFic3NieHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMjIyMDIsImV4cCI6MjA5MzY5ODIwMn0.t3cbASlUoqVF9a5hdvWyphX4TW9SMtp06ZO2F0Uuqn0'
  const today = new Date().toISOString().split('T')[0]
  const shouldCount = req.query.count !== 'false'
  const TOTAL_BASE = 25322

  try {
    if (shouldCount) {
      // Increment both today and total
      const [todayRes, totalRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_counter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({ p_date: today })
        }),
        fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_counter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({ p_date: 'total' })
        })
      ])

      const todayCount = await todayRes.json()
      const totalCount = await totalRes.json()

      return res.status(200).json({
        today: todayCount,
        total: totalCount + TOTAL_BASE
      })
    } else {
      // Just read current counts without incrementing
      const [todayRes, totalRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/visitors?date=eq.${today}&select=count`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        }),
        fetch(`${SUPABASE_URL}/rest/v1/visitors?date=eq.total&select=count`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        })
      ])

      const todayData = await todayRes.json()
      const totalData = await totalRes.json()

      return res.status(200).json({
        today: todayData[0]?.count || 0,
        total: (totalData[0]?.count || 0) + TOTAL_BASE
      })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get visitor count' })
  }
}
