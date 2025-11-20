import React from 'react'

function toGCalDate(dt) {
  try {
    const d = new Date(dt)
    const yyyy = d.getUTCFullYear().toString().padStart(4, '0')
    const mm = (d.getUTCMonth() + 1).toString().padStart(2, '0')
    const dd = d.getUTCDate().toString().padStart(2, '0')
    const hh = d.getUTCHours().toString().padStart(2, '0')
    const min = d.getUTCMinutes().toString().padStart(2, '0')
    const ss = d.getUTCSeconds().toString().padStart(2, '0')
    return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`
  } catch {
    return ''
  }
}

function addToCalendar(e) {
  if (!e.start) return alert('Sự kiện chưa có thời gian cụ thể')
  const start = toGCalDate(e.start)
  const end = toGCalDate(e.end || e.start)
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&details=${encodeURIComponent(e.host)}&location=${encodeURIComponent(e.location)}&dates=${start}/${end}`
  window.open(url, '_blank')
}

function openDirections(e) {
  const parts = [e.title, e.location, e.host].filter(Boolean)
  const q = encodeURIComponent(parts.join(', '))
  const url = `https://www.google.com/maps/search/?api=1&query=${q}`
  window.open(url, '_blank')
}

function rsvpForEvent(e) {
  try { sessionStorage.setItem('vaatwedding_selected_event', e.title) } catch {}
  const el = document.querySelector('#rsvp-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function donate() {
  alert('Tính năng Mừng cưới đang cập nhật')
}

function EventCard({ e }) {
  return (
    <div className="card p-5 h-full flex flex-col">
      <h3 className="font-display text-xl text-primary-700">{e.title}</h3>
      <p className="mt-3 text-gray-700"><span aria-hidden>📍</span> {e.location}</p>
      <p className="text-gray-700"><span aria-hidden>🏠</span> {e.host}</p>
      <p className="mt-1 text-gray-500"><span aria-hidden>🕒</span> {e.time}</p>
      <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
        <button className="px-3 py-2 rounded-md bg-primary-600 text-white" onClick={() => addToCalendar(e)}>Thêm vào lịch</button>
        <button className="px-3 py-2 rounded-md bg-primary-50 text-primary-700" onClick={() => openDirections(e)}>Xem chỉ đường</button>
      </div>
    </div>
  )
}

export default function Events({ events }) {
  return (
    <section className="section py-10 reveal">
      <h2 className="heading">Sự kiện</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {events.map((e, i) => (
          <EventCard key={i} e={e} />
        ))}
      </div>
    </section>
  )
}
