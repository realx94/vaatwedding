import React, { useEffect, useState } from 'react'

export default function WishBook() {
  const key = 'vaatwedding_wishes'
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || '[]')
      if (Array.isArray(stored) && stored.length) { setList(stored); return }
    } catch {}
    setLoading(true)
    fetch('/data/wishes.json')
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setList(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const add = () => {
    if (!name || !message) return
    const item = { name, message, ts: Date.now() }
    const next = [item, ...list]
    setList(next)
    localStorage.setItem(key, JSON.stringify(next))
    setName('')
    setMessage('')
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
      <h2 className="heading">Sổ lời chúc</h2>
      <div className="mt-6 book-bg">
        <div className="book-seam" />
        <div className="book-inner grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="card p-6">
            <div className="space-y-3">
              <input className="border rounded-md p-2 w-full" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
              <textarea className="border rounded-md p-2 w-full" rows={3} placeholder="Lời chúc" value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            <button className="mt-4 px-4 py-2 rounded-md btn-gradient" onClick={add}>Gửi lời chúc</button>
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
