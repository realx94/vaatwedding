import React from 'react'

function getDateParts(e) {
  try {
    const d = new Date(e.start || e.end || Date.now())
    const day = d.getDate().toString().padStart(2, '0')
    const mon = d.toLocaleString('vi-VN', { month: 'short' })
    const year = d.getFullYear().toString()
    return { day, mon, year }
  } catch {
    return { day: '--', mon: '', year: '' }
  }
}

export default function Timeline({ events }) {
  const times = (events||[]).map(e => {
    try { return new Date(e.start || e.end || Date.now()).getTime() } catch { return Date.now() }
  })
  const min = Math.min.apply(null, times.length ? times : [Date.now()])
  const max = Math.max.apply(null, times.length ? times : [Date.now()])
  const span = Math.max(1, max - min)
  const grad = (r) => {
    if (r <= 0.25) return { s: 'rgba(227,244,231,0.55)', e: 'rgba(200,233,207,0.45)', dot: '#6BC584' }
    if (r <= 0.5) return { s: 'rgba(200,233,207,0.55)', e: 'rgba(168,221,181,0.45)', dot: '#4CAF68' }
    if (r <= 0.75) return { s: 'rgba(168,221,181,0.55)', e: 'rgba(107,197,132,0.45)', dot: '#3C9F58' }
    return { s: 'rgba(168,221,181,0.55)', e: 'rgba(76,175,104,0.55)', dot: '#2E7944' }
  }
  return (
    <section className="section py-10 reveal">
      <h2 className="heading">Lịch trình</h2>
      <ol className="timeline mt-6 space-y-6">
        {events.filter(e => e.time).map((e, i) => {
          const d = getDateParts(e)
          let r = 0
          try { r = Math.max(0, Math.min(1, ((new Date(e.start || e.end || Date.now()).getTime() - min) / span))) } catch {}
          if (!isFinite(r)) r = times.length > 1 ? i / (times.length - 1) : 1
          const g = grad(r)
          return (
            <li key={i} className="relative grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-4 items-start">
              <div className="card timeline-date px-3 py-2 text-center" style={{ background: `linear-gradient(180deg, ${g.s} 0%, ${g.e} 100%)` }}>
                <div className="text-lg md:text-xl font-display text-primary-700">{d.day}</div>
                <div className="text-xs text-gray-600">{d.mon}</div>
                <div className="text-xs text-gray-500">{d.year}</div>
              </div>
              <div className="timeline-dot border-2 border-white" style={{ backgroundColor: g.dot }} />
              <div className="relative pl-6">
                <div className="card timeline-card p-5">
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: `linear-gradient(135deg, ${g.s} 0%, ${g.e} 100%)`, pointerEvents: 'none', opacity: 0.45 }} />
                  <div className="flex flex-wrap gap-2">
                    {e.host && <span className="inline-block px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs">{e.host}</span>}
                    {e.location && <span className="inline-block px-2 py-1 rounded-full bg-primary-50 text-primary-700 text-xs">{e.location}</span>}
                  </div>
                  <h3 className="mt-2 font-display text-xl text-primary-700">{e.title}</h3>
                  <div className="mt-2 space-y-1">
                    {e.time && <p className="text-gray-700"><span aria-hidden>🕒</span> {e.time}</p>}
                    {e.location && <p className="text-gray-700"><span aria-hidden>📍</span> {e.location}</p>}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
