import React, { useState } from 'react'
import content from '../data/content.json'

export default function StickyBar() {
  const [open, setOpen] = useState(false)
  const copyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, text: 'Thiệp cưới Bustle VIP', url: window.location.href })
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
        <button className="fab" aria-label="Gửi lời chúc" onClick={openWish}>💌</button>
      </div>
    </>
  )
}
