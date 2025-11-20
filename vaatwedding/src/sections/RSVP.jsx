import React, { useEffect, useState } from 'react'
import content from '../data/content.json'

export default function RSVP() {
  const [name, setName] = useState('')
  const [count, setCount] = useState(1)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [status, setStatus] = useState('yes')
  const [guestOf, setGuestOf] = useState('both')
  const [selectedEvents, setSelectedEvents] = useState([])

  useEffect(() => {
    try {
      const pre = sessionStorage.getItem('vaatwedding_selected_event')
      if (pre) setSelectedEvents([pre])
    } catch {}
  }, [])

  const toggleEvent = (title) => {
    setSelectedEvents(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title])
  }

  const saveLocal = () => {
    const data = { name, count, note, status, guestOf, events: selectedEvents, ts: Date.now() }
    const key = 'vaatwedding_rsvp'
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    list.push(data)
    localStorage.setItem(key, JSON.stringify(list))
    setSaved(true)
  }

  return (
    <section className="section py-10 reveal" id="rsvp-section">
      <h2 className="heading">RSVP</h2>
      <div className="mt-6 card p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="border rounded-md p-2" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
          <input className="border rounded-md p-2" type="number" min={1} placeholder="Số lượng" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Trạng thái tham dự</p>
            <div className="mt-2 flex items-center gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="status" checked={status==='yes'} onChange={()=>setStatus('yes')} /> Có, tôi sẽ tham dự</label>
              <label className="flex items-center gap-2"><input type="radio" name="status" checked={status==='no'} onChange={()=>setStatus('no')} /> Xin lỗi, tôi bận</label>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Khách của</p>
            <select className="mt-2 border rounded-md p-2 w-full" value={guestOf} onChange={e=>setGuestOf(e.target.value)}>
              <option value="groom">Chú Rể</option>
              <option value="bride">Cô Dâu</option>
              <option value="both">Chú Rể & Cô Dâu</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Bạn sẽ tham gia sự kiện nào?</p>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {content.events.filter(e=>e.title && e.time).map((e) => (
              <label key={e.title} className="flex items-center gap-2 border rounded-md p-2">
                <input type="checkbox" checked={selectedEvents.includes(e.title)} onChange={()=>toggleEvent(e.title)} />
                <span className="text-sm text-gray-700">{e.title}</span>
              </label>
            ))}
          </div>
        </div>
        <textarea className="border rounded-md p-2 w-full mt-4" rows={3} placeholder="Lời nhắn" value={note} onChange={e => setNote(e.target.value)} />
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded-md btn-gradient" onClick={saveLocal}>Lưu RSVP</button>
          <a className="px-4 py-2 rounded-md btn-gradient-light" href={`mailto:example@wedding.local?subject=RSVP&body=Ho%20ten:%20${encodeURIComponent(name)}%0ASo%20luong:%20${count}%0ATrang%20thai:%20${status}%0AKhach%20cua:%20${guestOf}%0ASu%20kien:%20${encodeURIComponent(selectedEvents.join(', '))}%0ALoi%20nhan:%20${encodeURIComponent(note)}`}>Gửi email</a>
        </div>
        {saved && <p className="mt-3 text-green-700">Đã lưu RSVP trên thiết bị của bạn.</p>}
      </div>
    </section>
  )
}
