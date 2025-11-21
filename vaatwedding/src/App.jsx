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
import GiftBox from './sections/GiftBox'
import content from './data/content.json'
import Admin from './admin/Admin'

export default function App() {
  const isAdmin = typeof window !== 'undefined' && window.location && window.location.pathname === '/admin'
  if (isAdmin) {
    return <Admin />
  }
  const [showInvite, setShowInvite] = useState(false)
  const hearts = useMemo(() => Array.from({ length: 12 }, () => ({ left: Math.random() * 100, size: 18 + Math.random() * 14, dur: 8 + Math.random() * 8, delay: Math.random() * 6 })), [])
  useEffect(() => {
    const addPreload = (href, as, type) => {
      try {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = as
        link.href = href
        if (type) link.type = type
        document.head.appendChild(link)
      } catch {}
    }
    const audioSrc = '/assets/audio/song.mp3'
    addPreload(audioSrc, 'audio')
    try {
      const a = document.createElement('audio')
      a.src = audioSrc
      a.preload = 'auto'
      a.load()
    } catch {}
    const baseImages = [
      '/assets/images/home-section1.jpg',
      '/assets/images/gift_background.jpg',
      '/assets/images/map-bride.jpg',
      '/assets/images/map-groom.jpg',
      '/assets/images/event-photobooth.jpg',
      '/assets/images/event-restaurant.webp',
      '/assets/images/gallery-1.jpg',
      '/assets/images/gallery-2.jpg',
      '/assets/images/gallery-3.jpg',
      '/assets/images/gallery-4.jpg'
    ]
    const preloadImage = (src) => {
      try { addPreload(src, 'image') } catch {}
      const im = new Image()
      im.decoding = 'async'
      im.src = src
    }
    baseImages.forEach(preloadImage)
    fetch('/data/galleries.json').then(r => r.json()).then(arr => {
      try { (arr||[]).forEach(preloadImage) } catch {}
    }).catch(()=>{})
  }, [])
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); try { io.unobserve(e.target) } catch {} } })
    }, { threshold: 0.1 })
    nodes.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])
  useEffect(() => {}, [])

  useEffect(() => {
    try {
      const KEY = 'vaatwedding_invite_shown'
      const shown = sessionStorage.getItem(KEY)
      if (shown) return
      const timer = setTimeout(() => {
        try { sessionStorage.setItem(KEY, '1') } catch {}
        setShowInvite(true)
      }, 30000)
      return () => clearTimeout(timer)
    } catch {
      const timer = setTimeout(() => setShowInvite(true), 30000)
      return () => clearTimeout(timer)
    }
  }, [])
  return (
    <div>
      {showInvite && (
        <div className="invite-overlay">
          <div className="card invite-modal p-6" style={{ maxWidth: 420, width: '90%' }}>
            <h3 className="invite-title font-heading text-2xl">Bạn sẽ tham gia chứ?</h3>
            <p className="invite-message mt-2">Vui lòng xác nhận tham dự để chúng mình chuẩn bị chu đáo.</p>
            <div className="invite-actions">
              <button className="btn-cta" onClick={() => { setShowInvite(false); const el = document.querySelector('#rsvp-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}>Xác nhận tham dự</button>
              <button className="px-4 py-2 rounded-md btn-ghost" onClick={() => setShowInvite(false)}>Đóng</button>
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
      <Gallery />
      <Events events={content.events} />
      <Timeline events={content.events} />
      <Maps />
      <WishBook />
      <RSVP />
      <GiftBox />
      <StickyBar />
      <Music />
    </div>
  )
}
