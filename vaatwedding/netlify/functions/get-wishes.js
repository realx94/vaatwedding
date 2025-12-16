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

    // First, get the form ID by name
    const formsUrl = `https://api.netlify.com/api/v1/sites/${siteId}/forms`
    console.log('Fetching forms list from:', formsUrl)

    const formsResponse = await fetch(formsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!formsResponse.ok) {
      throw new Error(`Netlify API error getting forms: ${formsResponse.status}`)
    }

    const forms = await formsResponse.json()
    const wishesForm = forms.find(f => f.name === 'wishes')

    if (!wishesForm) {
      console.log('Wishes form not found')
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([])
      }
    }

    console.log('Found wishes form:', wishesForm.id, 'submissions:', wishesForm.submission_count)

    // If no submissions, return empty array
    if (wishesForm.submission_count === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([])
      }
    }

    // Fetch submissions using form ID
    const url = `https://api.netlify.com/api/v1/forms/${wishesForm.id}/submissions`
    console.log('Fetching wishes from:', url)

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log('Response status:', response.status)

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
