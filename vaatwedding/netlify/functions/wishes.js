const fs = require('fs')
const path = require('path')

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}')
      const item = {
        name: String(data.name || '').trim(),
        message: String(data.message || '').trim(),
        ts: Date.now()
      }

      if (!item.name || !item.message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ ok: false, error: 'Invalid data' })
        }
      }

      // Read existing wishes from public data file
      const dataPath = path.join(process.cwd(), 'public', 'data', 'wishes.json')
      let list = []
      
      try {
        if (fs.existsSync(dataPath)) {
          const cur = fs.readFileSync(dataPath, 'utf-8')
          list = JSON.parse(cur || '[]')
        }
      } catch (err) {
        console.error('Error reading wishes:', err)
      }

      // Add new wish
      const next = [item, ...list]

      // Write back to file
      try {
        fs.mkdirSync(path.dirname(dataPath), { recursive: true })
        fs.writeFileSync(dataPath, JSON.stringify(next, null, 2))
      } catch (err) {
        console.error('Error writing wishes:', err)
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ ok: false, error: 'Failed to save' })
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, count: next.length })
      }
    } catch (err) {
      console.error('Error:', err)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ ok: false, error: err.message })
      }
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  }
}
