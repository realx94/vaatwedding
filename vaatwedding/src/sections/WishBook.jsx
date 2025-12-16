import React, { useEffect, useState } from 'react'

export default function WishBook() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/data/wishes.json')
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setList(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const add = (e) => {
    e?.preventDefault()
    if (!name || !message) return
    setSaving(true)
    
    // Submit to Netlify Forms
    const formData = new FormData()
    formData.append('form-name', 'wishes')
    formData.append('name', name)
    formData.append('message', message)
    formData.append('timestamp', new Date().toISOString())
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(r => {
        if (!r.ok) throw new Error('fail')
        // Add to local list immediately for UI feedback
        const newItem = { name, message, ts: Date.now() }
        setList([newItem, ...list])
        setName('')
        setMessage('')
        alert('Cảm ơn lời chúc của bạn! ❤️')
      })
      .catch((err) => {
        console.error('Error submitting wish:', err)
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.')
      })
      .finally(() => setSaving(false))
  }

  const downloadJson = () => {
    try {
      const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'wishes.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {}
  }

  return (
    <section className="section py-10 reveal book-section" id="wishbook-section">
      {/* Hidden form for Netlify Forms detection */}
      <form name="wishes" netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <textarea name="message"></textarea>
        <input type="text" name="timestamp" />
      </form>
      
      <h2 className="heading">Sổ lời chúc</h2>
      <div className="mt-6 book-bg">
        <div className="book-seam" />
        <div className="book-inner grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="card p-6">
            <form onSubmit={add}>
              <div className="space-y-3">
                <input 
                  className="border rounded-md p-2 w-full" 
                  placeholder="Họ tên" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  required
                />
                <textarea 
                  className="border rounded-md p-2 w-full" 
                  rows={3} 
                  placeholder="Lời chúc" 
                  value={message} 
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit"
                className="mt-4 px-4 py-2 rounded-md btn-gradient" 
                disabled={saving}
              >
                {saving ? 'Đang gửi...' : 'Gửi lời chúc'}
              </button>
            </form>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-primary-700">Danh sách lời chúc</h3>
            </div>
          <div className="mt-4 message-list max-h-[420px] overflow-y-auto pr-2">
              {loading && <div className="text-gray-600 text-sm">Đang tải...</div>}
              {!loading && list.length === 0 && <div className="text-gray-600 text-sm">Chưa có lời chúc nào</div>}
              {!loading && list.map((w, i) => {
                const dt = new Date(w.ts || Date.now())
                const time = dt.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
                return (
                  <div key={i} className="message-item">
                    <div className="message-row">
                      <span className="message-name">{w.name}</span>
                      <span className="message-time">{time}</span>
                    </div>
                    <div className="message-text">{w.message}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
