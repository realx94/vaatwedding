import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function FancySelect({ value, onChange, placeholder, options, invalid, disabled }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const ref = useRef(null)
  useEffect(() => {
    const onDoc = (e) => { if (!ref.current) return; if (!ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])
  const selected = options.find(o => o.value === value)
  const onKeyDown = (e) => {
    if (disabled) return
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) { setOpen(true); const idx = options.findIndex(o => o.value === value); setActive(idx >= 0 ? idx : 0); return }
    if (e.key === 'ArrowDown') setActive(i => (i + 1) % options.length)
    else if (e.key === 'ArrowUp') setActive(i => (i - 1 + options.length) % options.length)
    else if (e.key === 'Enter') { if (active >= 0) { onChange(options[active].value); setOpen(false) } }
    else if (e.key === 'Escape') setOpen(false)
  }
  return (
    <div className={`select-wrap ${invalid ? 'invalid' : ''}`} ref={ref}>
      <button type="button" className={`form-select fancy-select w-full ${invalid ? 'invalid' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`} onClick={() => { if (!disabled) setOpen(!open) }} onKeyDown={onKeyDown} aria-haspopup="listbox" aria-expanded={open} disabled={disabled} aria-disabled={disabled}>
        <span className="select-label">{selected ? selected.label : placeholder}</span>
        <span className={`select-caret ${open ? 'open' : ''}`} aria-hidden>▾</span>
      </button>
      {open && (
        <div className="select-menu" role="listbox">
          {options.map((o, i) => (
            <div key={o.value} role="option" aria-selected={value === o.value} className={`select-option ${i === active ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => { onChange(o.value); setOpen(false) }}>
              <span>{o.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function RSVP() {
  const [name, setName] = useState('')
  const [count, setCount] = useState('')
  const [status, setStatus] = useState('')
  const [guestOf, setGuestOf] = useState('')
  const [bus, setBus] = useState(false)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState({ name: false, count: false, status: false })

  useEffect(() => {
    try {
      const pre = sessionStorage.getItem('vaatwedding_selected_event')
      if (pre && !note) setNote(`Sự kiện: ${pre}`)
    } catch {}
  }, [note])

  useEffect(() => {
    try {
      const locked = localStorage.getItem('vaatwedding_rsvp_locked')
      if (locked === 'true') setSaved(true)
    } catch {}
  }, [])

  const confirm = () => {
    if (saved) return
    const nextErrors = {
      name: !name.trim(),
      count: !count,
      status: !status,
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.count || nextErrors.status) return
    
    const data = { 
      name: name.trim(), 
      count: Number(count), 
      status, 
      guestOf: guestOf || 'both', 
      bus: bus ? 'yes' : 'no', 
      note, 
      timestamp: new Date().toISOString()
    }
    
    // Submit to Netlify Forms
    const formData = new FormData()
    formData.append('form-name', 'rsvp')
    Object.keys(data).forEach(key => {
      formData.append(key, String(data[key]))
    })
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(r => { 
        if (!r.ok) throw new Error('fail')
        setSaved(true)
        setShowSuccess(true)
        try { localStorage.setItem('vaatwedding_rsvp_locked', 'true') } catch {}
        try { sessionStorage.setItem('vaatwedding_invite_shown', '1') } catch {}
      })
      .catch(() => {
        // Fallback to localStorage
        const key = 'vaatwedding_rsvp'
        const list = JSON.parse(localStorage.getItem(key) || '[]')
        const next = [data, ...list]
        localStorage.setItem(key, JSON.stringify(next))
        setSaved(true)
        setShowSuccess(true)
        try { localStorage.setItem('vaatwedding_rsvp_locked', 'true') } catch {}
        try { sessionStorage.setItem('vaatwedding_invite_shown', '1') } catch {}
      })
  }

  const valid = name.trim() && count && status

  return (
    <section className="section reveal" id="rsvp-section">
      {/* Hidden form for Netlify Forms detection */}
      <form name="rsvp" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="text" name="count" />
        <input type="text" name="status" />
        <input type="text" name="guestOf" />
        <input type="text" name="bus" />
        <textarea name="note"></textarea>
        <input type="text" name="timestamp" />
      </form>
      
      <div className="rsvp-bg">
        <h2 className="heading text-center">Xác nhận tham dự</h2>
        <div className="mt-6 card p-6 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-field sm:col-span-1">
              <label className="form-label">Tên<span className="required-star">*</span></label>
              <input className={`form-input w-full ${errors.name ? 'invalid' : ''}`} placeholder="Nhập tên" value={name} onChange={e => setName(e.target.value)} aria-invalid={errors.name} disabled={saved} />
              {errors.name && <p className="form-error">Vui lòng nhập tên</p>}
            </div>
          <div className="form-field sm:col-span-1">
            <label className="form-label">Số lượng<span className="required-star">*</span></label>
            <FancySelect value={count} onChange={setCount} placeholder="Chọn số lượng" options={[1,2,3,4,5].map(n => ({ value: String(n), label: String(n) }))} invalid={errors.count} disabled={saved} />
            {errors.count && <p className="form-error">Vui lòng chọn số lượng</p>}
          </div>
          <div className="form-field sm:col-span-1">
            <label className="form-label">Trạng thái tham dự<span className="required-star">*</span></label>
            <FancySelect value={status} onChange={setStatus} placeholder="Chọn trạng thái" options={[{ value: 'yes', label: 'Có, tôi sẽ tham dự' }, { value: 'no', label: 'Xin lỗi, tôi bận' }]} invalid={errors.status} disabled={saved} />
            {errors.status && <p className="form-error">Vui lòng chọn trạng thái</p>}
          </div>
          <div className="form-field sm:col-span-1">
            <label className="form-label">Khách của</label>
            <FancySelect value={guestOf} onChange={setGuestOf} placeholder="Khách của" options={[{ value: 'groom', label: 'Chú Rể' }, { value: 'bride', label: 'Cô Dâu' }, { value: 'both', label: 'Chú Rể và Cô Dâu' }]} disabled={saved} />
          </div>
          <label className="bus-highlight flex items-center gap-3 p-3 rounded-md form-checkbox-row sm:col-span-2">
            <input type="checkbox" checked={bus} onChange={e => setBus(e.target.checked)} disabled={saved} />
            <span>Đi theo xe ô tô (Dành cho khách Đà Nẵng)</span>
          </label>
          <div className="form-field sm:col-span-2">
            <label className="form-label">Lời nhắn</label>
            <textarea className="form-input w-full" rows={3} placeholder="Lời nhắn (không bắt buộc)" value={note} onChange={e => setNote(e.target.value)} disabled={saved} />
          </div>
        </div>
        <button className={`mt-4 rounded-md btn-cta no-pulse w-full ${(saved || !valid) ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={saved || !valid} onClick={confirm}>{saved ? 'Đã xác nhận' : 'Xác nhận tham dự'}</button>
        <div className="mt-2 text-right">
          <a href="#" onClick={(e) => { e.preventDefault(); try { window.dispatchEvent(new Event('vaat_open_qr')) } catch {} }} className="text-sm underline hover:opacity-80">Mừng cưới</a>
        </div>
        {showSuccess && createPortal(
          <div className="invite-overlay">
            <div className="card invite-modal p-6" style={{ maxWidth: 420, width: '90%' }}>
              <h3 className="invite-title font-heading text-2xl">Xác nhận thành công</h3>
              <p className="invite-message mt-2">Cảm ơn bạn đã xác nhận tham dự.</p>
              <div className="invite-actions">
                <button className="btn-cta no-pulse" onClick={() => setShowSuccess(false)}>Đóng</button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
      </div>
    </section>
  )
}
