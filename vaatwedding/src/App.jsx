import React, { useEffect, useMemo, useState } from 'react'
import Hero from './sections/Hero'
import Countdown from './sections/Countdown'
import Events from './sections/Events'
import Timeline from './sections/Timeline'
import Maps from './sections/Maps'
import Gallery from './sections/Gallery'
import Music from './sections/Music'
import WishBook from './sections/WishBook'
import RSVP from './sections/RSVP'
import Footer from './sections/Footer'
import StickyBar from './sections/StickyBar'
import content from './data/content.json'

export default function App() {
  const [showInvite, setShowInvite] = useState(false)
  const hearts = useMemo(() => Array.from({ length: 12 }, () => ({ left: Math.random() * 100, size: 18 + Math.random() * 14, dur: 8 + Math.random() * 8, delay: Math.random() * 6 })), [])
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    nodes.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    let idleTimer
    let initialTimer
    let raf
    let running = false
    let last = 0
    let inviteTimer
    const velocity = 70
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      const tick = (ts) => {
        if (!running) return
        if (typeof window === 'undefined' || typeof document === 'undefined') { raf = requestAnimationFrame(tick); return }
        const dt = Math.max(0, (ts - last) / 1000)
        last = ts
        const maxH = Math.max(document.documentElement.scrollHeight || 0, document.body.scrollHeight || 0)
        const y = Math.min(maxH - window.innerHeight, window.scrollY + velocity * dt)
        if (window.scrollY + window.innerHeight >= maxH - 1) {
          window.scrollTo({ top: 0 })
        } else {
          window.scrollTo({ top: y })
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      try { cancelAnimationFrame(raf) } catch {}
    }
    const resetIdle = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => { start(); resetIdle() }, 30000)
    }
    const onStop = () => { stop(); resetIdle(); scheduleInvite() }
    const onReset = () => { resetIdle(); scheduleInvite() }
    const scheduleInvite = () => {
      clearTimeout(inviteTimer)
      inviteTimer = setTimeout(() => setShowInvite(true), 5000)
    }
    const stopEvents = ['mousedown','click','touchstart']
    const resetEvents = ['mousemove','wheel','touchmove','keydown','scroll']
    const inviteResetEvents = ['mousemove','wheel','touchmove','keydown','click','touchstart']
    stopEvents.forEach(ev => window.addEventListener(ev, onStop, { passive: true }))
    resetEvents.forEach(ev => window.addEventListener(ev, onReset, { passive: true }))
    inviteResetEvents.forEach(ev => window.addEventListener(ev, scheduleInvite, { passive: true }))
    initialTimer = setTimeout(() => { start(); resetIdle() }, 5000)
    resetIdle()
    scheduleInvite()
    return () => {
      stop()
      clearTimeout(idleTimer)
      clearTimeout(initialTimer)
      clearTimeout(inviteTimer)
      try {
        stopEvents.forEach(ev => window.removeEventListener(ev, onStop))
        resetEvents.forEach(ev => window.removeEventListener(ev, onReset))
        inviteResetEvents.forEach(ev => window.removeEventListener(ev, scheduleInvite))
      } catch {}
    }
  }, [])
  return (
    <div>
      {showInvite && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card p-6" style={{ maxWidth: 420, width: '90%' }}>
            <h3 className="font-heading text-primary-700 text-2xl">Bạn sẽ tham gia chứ?</h3>
            <p className="mt-2 text-gray-700">Vui lòng xác nhận tham dự để chúng mình chuẩn bị chu đáo.</p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-md bg-primary-600 text-white" onClick={() => { setShowInvite(false); const el = document.querySelector('#rsvp-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}>Xác nhận tham dự</button>
              <button className="px-4 py-2 rounded-md bg-primary-100 text-primary-700" onClick={() => setShowInvite(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
      <div className="hearts-overlay">
        {hearts.map((h, i) => (
          <div key={i} className="heart" style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}>❤️</div>
        ))}
      </div>
      <Hero couple={content.couple} />
      <Countdown dateStr={content.couple.weddingDate} />
      <Events events={content.events} />
      <Timeline events={content.events} />
      <Maps />
      <Gallery />
      <Music />
      <WishBook />
      <RSVP />
      <Footer />
      <StickyBar />
    </div>
  )
}
