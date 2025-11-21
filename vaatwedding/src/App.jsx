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
  useEffect(() => {
    let autoScrollInterval = null
    let autoScrollTimeout = null
    let resetTimeout = null
    let isUserInteracting = false
    let autoScrollStarted = false
    let scrollPosition = 0

    const stopAutoScroll = () => {
      console.log('[AutoScroll] Stopping auto-scroll due to user interaction')
      isUserInteracting = true
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval)
        autoScrollInterval = null
      }
      
      // Set up auto-resume after 30s
      clearTimeout(resetTimeout)
      resetTimeout = setTimeout(() => {
        console.log('[AutoScroll] No interaction for 30s, resuming auto-scroll')
        isUserInteracting = false
        startAutoScroll()
      }, 30000)
    }

    const startAutoScroll = () => {
      if (autoScrollStarted) {
        console.log('[AutoScroll] Auto-scroll already started')
        return
      }
      
      autoScrollStarted = true
      console.log('[AutoScroll] Starting auto-scroll')
      autoScrollInterval = setInterval(() => {
        if (!isUserInteracting) {
          scrollPosition += 1
          const scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
          )
          const maxScroll = scrollHeight - window.innerHeight
          
          // Dừng auto-scroll khi scroll tới cuối
          if (scrollPosition >= maxScroll) {
            console.log('[AutoScroll] Reached bottom of page, stopping auto-scroll')
            isUserInteracting = true
            if (autoScrollInterval) {
              clearInterval(autoScrollInterval)
              autoScrollInterval = null
            }
            autoScrollStarted = false
            return
          }
          
          // Direct assign scrollTop
          document.documentElement.scrollTop = scrollPosition
          document.body.scrollTop = scrollPosition
        }
      }, 16)
    }

    // Start auto-scroll after 5 seconds (5000ms)
    console.log('[AutoScroll] Waiting 5 seconds before starting auto-scroll')
    autoScrollTimeout = setTimeout(() => {
      console.log('[AutoScroll] 5 seconds passed, initializing auto-scroll')
      startAutoScroll()
    }, 5000)

    // Event listeners for user interaction
    const handleWheel = (e) => {
      if (!autoScrollStarted) {
        console.log('[AutoScroll] User interaction detected during initial delay: wheel')
        clearTimeout(autoScrollTimeout)
        autoScrollTimeout = null
      } else if (!isUserInteracting) {
        console.log('[AutoScroll] User interaction detected: wheel')
        stopAutoScroll()
      }
    }

    const handleTouchStart = (e) => {
      if (!autoScrollStarted) {
        console.log('[AutoScroll] User interaction detected during initial delay: touchstart')
        clearTimeout(autoScrollTimeout)
        autoScrollTimeout = null
      } else if (!isUserInteracting) {
        console.log('[AutoScroll] User interaction detected: touchstart')
        stopAutoScroll()
      }
    }

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        if (!autoScrollStarted) {
          console.log('[AutoScroll] User interaction detected during initial delay: mousedown')
          clearTimeout(autoScrollTimeout)
          autoScrollTimeout = null
        } else if (!isUserInteracting) {
          console.log('[AutoScroll] User interaction detected: mousedown')
          stopAutoScroll()
        }
      }
    }

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) {
        if (!autoScrollStarted) {
          console.log('[AutoScroll] User interaction detected during initial delay: keydown -', e.key)
          clearTimeout(autoScrollTimeout)
          autoScrollTimeout = null
        } else if (!isUserInteracting) {
          console.log('[AutoScroll] User interaction detected: keydown -', e.key)
          stopAutoScroll()
        }
      }
    }

    const handleAnyInteraction = () => {
      // Reset timer cho 30s chờ tiếp
      if (isUserInteracting) {
        clearTimeout(resetTimeout)
        resetTimeout = setTimeout(() => {
          console.log('[AutoScroll] No interaction for 30s, resuming auto-scroll')
          isUserInteracting = false
          startAutoScroll()
        }, 30000)
      }
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('wheel', handleAnyInteraction)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchstart', handleAnyInteraction)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleAnyInteraction)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousedown', handleAnyInteraction)

    return () => {
      console.log('[AutoScroll] Cleaning up auto-scroll effect')
      if (autoScrollInterval) clearInterval(autoScrollInterval)
      if (autoScrollTimeout) clearTimeout(autoScrollTimeout)
      if (resetTimeout) clearTimeout(resetTimeout)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('wheel', handleAnyInteraction)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchstart', handleAnyInteraction)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleAnyInteraction)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousedown', handleAnyInteraction)
    }
  }, [])

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
