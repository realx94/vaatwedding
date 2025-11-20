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
          <button className="fab fab-item" aria-label="Gọi điện" onClick={callPhone}>
            <img src="/assets/icons/phone.svg" alt="Gọi" className="w-6 h-6" />
          </button>
          <button className="fab fab-item" aria-label="Chỉ đường" onClick={openMapBride}>
            <img src="/assets/icons/map.svg" alt="Bản đồ" className="w-6 h-6" />
          </button>
          <button className="fab fab-item" aria-label="RSVP" onClick={scrollToRSVP}>
            <img src="/assets/icons/rsvp.svg" alt="RSVP" className="w-6 h-6" />
          </button>
          <button className="fab fab-item" aria-label="Chia sẻ" onClick={copyLink}>
            <img src="/assets/icons/share.svg" alt="Chia sẻ" className="w-6 h-6" />
          </button>
        </div>
        <button className="fab fab-main" aria-label="Mở nhanh" onClick={() => setOpen(!open)}>
          {open ? '×' : '+'}
        </button>
      </div>
      <div className="floating-left">
        {tipVisible && (
          <div className="tooltip">👉 Click vào đây để phát nhạc</div>
        )}
        <button className={`fab ${musicPlaying ? 'playing' : ''}`} aria-label={musicPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'} onClick={toggleMusic}>
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
