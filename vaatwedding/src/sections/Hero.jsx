import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Hero({ couple }) {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [showQR, setShowQR] = useState(false)
  useEffect(() => {
    const openQR = () => setShowQR(true)
    const closeQR = () => setShowQR(false)
    window.addEventListener('vaat_open_qr', openQR)
    window.addEventListener('vaat_close_qr', closeQR)
    return () => {
      try {
        window.removeEventListener('vaat_open_qr', openQR)
        window.removeEventListener('vaat_close_qr', closeQR)
      } catch {}
    }
  }, [])
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
    <section ref={sectionRef} className="section pt-10 sm:pt-14 md:pt-20 text-center hero-bg">
      <div className={`hero-content mt-auto mb-8 ${started ? 'animate-in' : 'pending'}`}>
        {showQR && (typeof document !== 'undefined') && createPortal(
          <div className="invite-overlay">
            <div className="card invite-modal qr-modal p-6" style={{ maxWidth: 520, width: '92%' }}>
              <button className="modal-close" aria-label="Đóng" onClick={() => setShowQR(false)}>
                <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <h3 className="invite-title font-heading text-2xl">Mừng cưới</h3>
              <p className="invite-message mt-2">Quét mã QR để chuyển khoản mừng cưới.</p>
              <div className="mt-4">
                <img src="/assets/images/galleries/000.jpg" alt="QR mừng cưới" className="w-full rounded-md" />
              </div>
            </div>
          </div>,
          document.body
        )}
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
            <button className="px-4 py-2 rounded-md btn-gradient" onClick={() => setShowQR(true)}>Mừng cưới</button>
          </div>
        </div>
      </div>
    </section>
  )
}
