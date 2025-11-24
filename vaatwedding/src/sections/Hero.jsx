import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Hero({ couple, onOverlayClosed }) {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
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
    <section ref={sectionRef} className="section pt-10 sm:pt-14 md:pt-20 text-center hero-bg relative">
      {overlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'transparent' }}>
          <style>{`
            @keyframes slideOutLeft {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            @keyframes slideOutRight {
              from { transform: translateX(0); }
              to { transform: translateX(100%); }
            }
            @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
            }
            @keyframes slideCardRight {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(150%); opacity: 0; }
            }
            @keyframes pulseGlow {
              0%, 100% { box-shadow: 0 0 40px rgba(107, 197, 132, 0.6), 0 0 80px rgba(76, 175, 104, 0.4), 0 0 120px rgba(168, 221, 181, 0.3); }
              50% { box-shadow: 0 0 50px rgba(107, 197, 132, 0.8), 0 0 100px rgba(76, 175, 104, 0.6), 0 0 140px rgba(168, 221, 181, 0.4); }
            }
            .wedding-card-overlay {
              position: relative;
              z-index: 20;
              max-width: 90vw;
              width: 500px;
              aspect-ratio: 3/4;
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(227, 244, 231, 0.92) 50%, rgba(200, 233, 207, 0.90) 100%);
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border-radius: 24px;
              border: 2px solid rgba(255, 255, 255, 0.8);
              box-shadow: 0 0 40px rgba(107, 197, 132, 0.6), 
                          0 0 80px rgba(76, 175, 104, 0.4), 
                          0 0 120px rgba(168, 221, 181, 0.3),
                          0 30px 60px rgba(0, 0, 0, 0.2);
              animation: pulseGlow 3s ease-in-out infinite;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px 30px;
              overflow: hidden;
            }
            .wedding-card-overlay.animate {
              animation: slideCardRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .wedding-card-overlay::before {
              content: "";
              position: absolute;
              inset: 12px;
              border-radius: 18px;
              border: 1px solid rgba(107, 197, 132, 0.3);
              pointer-events: none;
            }
            .wedding-card-overlay::after {
              content: "";
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
              animation: shimmer 4s linear infinite;
              pointer-events: none;
            }
            @keyframes shimmer {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .card-content {
              position: relative;
              z-index: 21;
              text-align: center;
            }
            .card-title {
              font-family: 'Dancing Script', 'Playfair Display', Georgia, serif;
              font-size: clamp(2rem, 5vw, 3rem);
              font-weight: 700;
              background: linear-gradient(135deg, #3C9F58 0%, #6BC584 50%, #4CAF68 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 16px;
              text-shadow: 0 2px 20px rgba(107, 197, 132, 0.3);
            }
            .card-couple {
              font-family: 'Dancing Script', 'Playfair Display', Georgia, serif;
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              color: #2E7944;
              margin-bottom: 8px;
              text-shadow: 0 2px 10px rgba(46, 121, 68, 0.2);
            }
            .card-date {
              font-size: 1.1rem;
              color: #4CAF68;
              margin-bottom: 24px;
              font-weight: 600;
            }
            .card-ornament {
              width: 60px;
              height: 60px;
              margin: 20px auto;
              opacity: 0.7;
            }
            .overlay-left {
              position: absolute;
              top: 0;
              left: 0;
              width: 50%;
              height: 100%;
              background: linear-gradient(135deg, #E3F4E7 0%, #C8E9CF 30%, #A8DDB5 60%, #6BC584 100%);
              box-shadow: inset -20px 0 60px rgba(107, 197, 132, 0.4),
                          0 0 80px rgba(76, 175, 104, 0.3),
                          0 0 120px rgba(168, 221, 181, 0.2);
              z-index: 10;
              pointer-events: none;
            }
            .overlay-left.animate {
              animation: slideOutLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .overlay-right {
              position: absolute;
              top: 0;
              right: 0;
              width: 50%;
              height: 100%;
              background: linear-gradient(225deg, #E3F4E7 0%, #C8E9CF 30%, #A8DDB5 60%, #6BC584 100%);
              box-shadow: inset 20px 0 60px rgba(107, 197, 132, 0.4),
                          0 0 80px rgba(76, 175, 104, 0.3),
                          0 0 120px rgba(168, 221, 181, 0.2);
              z-index: 10;
              pointer-events: none;
            }
            .overlay-right.animate {
              animation: slideOutRight 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            .open-button {
              position: relative;
              z-index: 22;
              padding: 14px 40px;
              font-size: 1.1rem;
              font-weight: 700;
              color: white;
              background: linear-gradient(135deg, #6BC584 0%, #4CAF68 100%);
              border: 2px solid rgba(255, 255, 255, 0.8);
              border-radius: 50px;
              box-shadow: 0 8px 24px rgba(76, 175, 104, 0.4),
                          0 0 30px rgba(107, 197, 132, 0.3),
                          inset 0 1px 0 rgba(255, 255, 255, 0.5);
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .open-button:hover:not(:disabled) {
              transform: translateY(-2px);
              box-shadow: 0 12px 32px rgba(76, 175, 104, 0.5),
                          0 0 40px rgba(107, 197, 132, 0.4),
                          inset 0 1px 0 rgba(255, 255, 255, 0.5);
            }
            .open-button.animate {
              animation: fadeOut 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
          `}</style>
          <div className={`wedding-card-overlay ${isAnimating ? 'animate' : ''}`}>
            <div className="card-content">
              <div className="card-ornament">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 85C50 85 20 65 20 40C20 25 30 20 40 25C45 27.5 50 35 50 35C50 35 55 27.5 60 25C70 20 80 25 80 40C80 65 50 85 50 85Z" fill="url(#heart-gradient)" stroke="#4CAF68" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="heart-gradient" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6BC584"/>
                      <stop offset="50%" stopColor="#4CAF68"/>
                      <stop offset="100%" stopColor="#3C9F58"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="card-title">Thiệp mời cưới</h1>
              <p className="card-couple">{couple.groom} & {couple.bride}</p>
              <p className="card-date">{couple.weddingDate}</p>
              <button
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setOverlayOpen(false)
                    if (onOverlayClosed) onOverlayClosed()
                  }, 1000)
                }}
                className={`open-button ${isAnimating ? 'animate' : ''}`}
                disabled={isAnimating}
              >
                Mở thiệp
              </button>
            </div>
          </div>
          <div className={`overlay-left ${isAnimating ? 'animate' : ''}`} />
          <div className={`overlay-right ${isAnimating ? 'animate' : ''}`} />
        </div>
      )}
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
