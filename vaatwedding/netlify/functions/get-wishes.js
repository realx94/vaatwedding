exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const siteId = process.env.SITE_ID
    const token = process.env.NETLIFY_API_TOKEN

    if (!siteId || !token) {
      console.error('Missing config:', { siteId: !!siteId, token: !!token })
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Configuration missing', details: { siteId: !!siteId, token: !!token } })
      }
    }

    const url = `https://api.netlify.com/api/v1/sites/${siteId}/forms/wishes/submissions`
    console.log('Fetching wishes from:', url)

    // Fetch wishes submissions from Netlify API
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log('Response status:', response.status)

    // If form doesn't exist yet (404), return empty array
    if (response.status === 404) {
      console.log('Form not found (404) - likely no submissions yet or form name mismatch')
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([])
      }
    }

    if (!response.ok) {
      throw new Error(`Netlify API error: ${response.status}`)
    }

    const submissions = await response.json()

    // Transform submissions to match expected format
    const data = submissions.map(sub => ({
      name: sub.data.name || '',
      message: sub.data.message || '',
      ts: new Date(sub.created_at).getTime()
    }))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.error('Error fetching wishes submissions:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    }
  }
}
