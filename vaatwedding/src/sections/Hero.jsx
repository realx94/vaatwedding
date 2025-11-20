import React, { useEffect, useRef, useState } from 'react'

export default function Hero({ couple }) {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    if (started) return
    const t = setTimeout(() => setStarted(true), 5000)
    const fire = () => setStarted(true)
    window.addEventListener('scroll', fire, { once: true, passive: true })
    window.addEventListener('wheel', fire, { once: true, passive: true })
    window.addEventListener('touchmove', fire, { once: true, passive: true })
    return () => {
      clearTimeout(t)
      try {
        window.removeEventListener('scroll', fire)
        window.removeEventListener('wheel', fire)
        window.removeEventListener('touchmove', fire)
      } catch {}
    }
  }, [started])
  return (
    <section ref={sectionRef} className="section pt-10 sm:pt-14 md:pt-20 text-center reveal hero-bg">
      <div className={`hero-content mt-auto mb-8 ${started ? 'animate-in' : 'pending'}`}>
        <div className="hero-title mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-xl">
          <h1 className="hero-groom text-4xl sm:text-5xl md:text-6xl font-display text-primary-700">{couple.groom}</h1>
          <span className="hero-and text-3xl md:text-4xl text-primary-600">&</span>
          <h1 className="hero-bride text-4xl sm:text-5xl md:text-6xl font-display text-primary-700">{couple.bride}</h1>
        </div>
        <p className="hero-date mt-3">{couple.weddingDate}</p>
        <div className="mt-6 mx-auto max-w-3xl card hero-card p-6">
          <p className="hero-invite text-lg">Trân trọng kính mời Quý khách tới chung vui cùng gia đình.</p>
          <div className="mt-4 flex justify-center gap-3">
            <button className="px-4 py-2 rounded-md btn-gradient" onClick={() => scrollTo('#rsvp-section')}>Xác nhận tham dự</button>
            <button className="px-4 py-2 rounded-md btn-gradient-light" onClick={() => scrollTo('#wishbook-section')}>Gửi lời chúc</button>
          </div>
        </div>
      </div>
    </section>
  )
}
