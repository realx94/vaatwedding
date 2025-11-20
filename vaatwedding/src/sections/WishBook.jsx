import React, { useEffect, useState } from 'react'

export default function WishBook() {
  const key = 'vaatwedding_wishes'
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem(key) || '[]')) } catch {}
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

  return (
    <section className="section py-10 reveal" id="wishbook-section">
      <h2 className="heading">Sổ lời chúc</h2>
      <div className="mt-6 card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="border rounded-md p-2" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
          <textarea className="border rounded-md p-2" rows={1} placeholder="Lời chúc" value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <button className="mt-4 px-4 py-2 rounded-md bg-primary-600 text-white" onClick={add}>Gửi lời chúc</button>
        <div className="mt-6 space-y-3">
          {list.map((w, i) => (
            <div key={i} className="border rounded-md p-3">
              <p className="font-medium text-primary-700">{w.name}</p>
              <p className="text-gray-700">{w.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
