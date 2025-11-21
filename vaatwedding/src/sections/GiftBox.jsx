import React from 'react'
import content from '../data/content.json'

export default function GiftBox() {
  const openQR = () => { try { window.dispatchEvent(new Event('vaat_open_qr')) } catch {} }
  return (
    <section className="gift-bg reveal" id="gift-section">
      <div className="text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-display text-white">Hộp mừng cưới</h2>
        <p className="mt-2 text-white/80">Cảm ơn tất cả các tình cảm mà mọi người đã dành cho {content.couple.groom} & {content.couple.bride}</p>
        <div className="mt-6 flex justify-center">
          <button className="gift-icon-card" aria-label="Mở QR mừng cưới" title="Mở QR mừng cưới" onClick={openQR}>
            <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden>
              <path d="M20 7h-3.17a3 3 0 10-5.66 0H8a3 3 0 10-5.66 0H4v3h16V7zm-16 5v8h7v-8H4zm9 0v8h7v-8h-7z" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}