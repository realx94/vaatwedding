import React, { useEffect, useState } from 'react'
import content from '../data/content.json'

export default function StickyBar() {
  const [open, setOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [tipVisible, setTipVisible] = useState(false)
  const copyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text: 'Anh Tuấn & Vân Anh wedding', url: window.location.href })
        return
      }
      await navigator.clipboard.writeText(window.location.href)
      alert('Đã sao chép liên kết')
    } catch {}
  }
  const scrollToRSVP = () => {
    const el = document.querySelector('#rsvp-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const openMapBride = () => window.open(content.contacts.mapBride, '_blank')
  const callPhone = () => window.location.href = `tel:${content.contacts.phone}`
  const openWish = () => {
    const el = document.querySelector('#wishbook-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const toggleMusic = () => {
    const a = document.getElementById('wedding-audio')
    if (!a) return
    if (!a.paused) { a.pause(); try { localStorage.setItem('wedding_audio_userPaused', '1') } catch {} }
    else { a.play().catch(()=>{}); try { localStorage.setItem('wedding_audio_userPaused', '0') } catch {} }
    setTipVisible(false)
  }
  useEffect(() => {
    const a = document.getElementById('wedding-audio')
    if (!a) return
    const sync = () => setMusicPlaying(!a.paused)
    sync()
    a.addEventListener('play', sync)
    a.addEventListener('pause', sync)
    const KEY = 'wedding_audio_userPaused'
    const userPaused = () => { try { return localStorage.getItem(KEY) === '1' } catch { return false } }
    const maybeShowTip = () => {
      if (userPaused()) return
      const need = a.paused || a.muted
      if (need) {
        setTipVisible(true)
        setTimeout(() => setTipVisible(false), 5000)
      }
    }
    const hideTip = () => setTipVisible(false)
    a.addEventListener('playing', hideTip)
    a.addEventListener('volumechange', hideTip)
    maybeShowTip()
    return () => {
      a.removeEventListener('play', sync)
      a.removeEventListener('pause', sync)
      a.removeEventListener('playing', hideTip)
      a.removeEventListener('volumechange', hideTip)
    }
  }, [])
  return (
    <>
      <div className={`floating-actions ${open ? 'open' : ''}`}>
        <div className="items">
          <button className="fab fab-item fab-phone" aria-label="Gọi điện" title="Gọi điện" onClick={callPhone}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <defs>
                <linearGradient id="g-phone" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34D399"/>
                  <stop offset="100%" stopColor="#059669"/>
                </linearGradient>
              </defs>
              <path d="M2 4a2 2 0 012-2h2a2 2 0 012 2v2c0 .55-.22 1.05-.59 1.41L7.5 8.33a16 16 0 008.17 8.17l.92-1.33c.36-.37.86-.59 1.41-.59h2a2 2 0 012 2v2a2 2 0 01-2 2h-2C9.16 21 3 14.84 3 6V4a2 2 0 01-1-0z" fill="url(#g-phone)"/>
            </svg>
          </button>
          <button className="fab fab-item fab-map" aria-label="Chỉ đường" title="Chỉ đường" onClick={openMapBride}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <defs>
                <linearGradient id="g-map" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60A5FA"/>
                  <stop offset="100%" stopColor="#2563EB"/>
                </linearGradient>
              </defs>
              <path d="M12 2c3.31 0 6 2.69 6 6 0 4.5-6 12-6 12s-6-7.5-6-12c0-3.31 2.69-6 6-6zm0 8a2 2 0 100-4 2 2 0 000 4z" fill="url(#g-map)"/>
            </svg>
          </button>
          <button className="fab fab-item fab-rsvp" aria-label="Xác nhận tham dự" title="Xác nhận tham dự" onClick={scrollToRSVP}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <defs>
                <linearGradient id="g-rsvp" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F59E0B"/>
                  <stop offset="100%" stopColor="#D97706"/>
                </linearGradient>
              </defs>
              <path d="M9 12l2 2 4-4 2 2-6 6-4-4 2-2z" fill="url(#g-rsvp)"/>
            </svg>
          </button>
          <button className="fab fab-item fab-gift" aria-label="Mừng cưới" title="Mừng cưới" onClick={() => { try { window.dispatchEvent(new Event('vaat_open_qr')) } catch {} }}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <defs>
                <linearGradient id="g-gift" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EC4899"/>
                  <stop offset="100%" stopColor="#DB2777"/>
                </linearGradient>
              </defs>
              <path d="M20 7h-3.17a3 3 0 10-5.66 0H8a3 3 0 10-5.66 0H4v3h16V7zm-16 5v8h7v-8H4zm9 0v8h7v-8h-7z" fill="url(#g-gift)"/>
            </svg>
          </button>
          <button className="fab fab-item fab-share" aria-label="Chia sẻ" title="Chia sẻ" onClick={copyLink}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <defs>
                <linearGradient id="g-share" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10B981"/>
                  <stop offset="100%" stopColor="#059669"/>
                </linearGradient>
              </defs>
              <path d="M18 16a3 3 0 10-2.82-2H9.82a3 3 0 100 2h5.36A3 3 0 0018 16zm-6-9a3 3 0 11-3 3 3 3 0 013-3z" fill="url(#g-share)"/>
            </svg>
          </button>
        </div>
        <button className="fab fab-main" aria-label="Mở nhanh" title="Mở nhanh" onClick={() => setOpen(!open)}>
          {open ? (
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <path d="M6 6l12 12M6 18L18 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
              <circle cx="8" cy="8" r="2" fill="#ffffff"/>
              <circle cx="16" cy="8" r="2" fill="#ffffff"/>
              <circle cx="8" cy="16" r="2" fill="#ffffff"/>
              <circle cx="16" cy="16" r="2" fill="#ffffff"/>
            </svg>
          )}
        </button>
      </div>
      <div className="floating-left">
        {tipVisible && (
          <div className="tooltip">👉 Click vào đây để phát nhạc</div>
        )}
        <button className={`fab ${musicPlaying ? 'playing' : ''}`} aria-label={musicPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'} title={musicPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'} onClick={toggleMusic}>
          <img
            src={musicPlaying ? '/assets/icons/play-music.png' : '/assets/icons/pause-music.png'}
            alt={musicPlaying ? 'Đang phát' : 'Tạm dừng'}
            className={`w-full h-full rounded-full ${musicPlaying ? 'spin' : ''}`}
            onError={(e) => { e.currentTarget.src = '/assets/icons/website-ic.png' }}
          />
        </button>
      </div>
    </>
  )
}
