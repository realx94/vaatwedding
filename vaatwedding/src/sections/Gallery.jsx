import { useEffect, useRef, useState } from 'react'

export default function Gallery() {
  const images = [
    '/assets/images/gallery-1.jpg',
    '/assets/images/gallery-2.jpg',
    '/assets/images/gallery-3.jpg',
    '/assets/images/gallery-4.jpg'
  ]
  const [imgs, setImgs] = useState(images)
  useEffect(() => {
    fetch('/data/galleries.json')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (Array.isArray(d) && d.length) setImgs(d) })
      .catch(() => {
        const cands = Array.from({ length: 12 }, (_, i) => `/assets/images/galleries/gallery-${i + 1}.jpg`)
        const found = []
        let done = 0
        cands.forEach(src => {
          const im = new Image()
          im.onload = () => { found.push(src); if (++done === cands.length && found.length) setImgs(found) }
          im.onerror = () => { if (++done === cands.length && found.length) setImgs(found) }
          im.src = src
        })
      })
  }, [])
  const [cur, setCur] = useState(0)
  const [overlay, setOverlay] = useState(null)
  const next = () => { if (cur >= imgs.length - 1 || overlay) return; setOverlay({ idx: cur + 1, dir: 'next' }) }
  const prev = () => { if (cur <= 0 || overlay) return; setOverlay({ idx: cur - 1, dir: 'prev' }) }
  const preloaded = useRef(new Set())
  const preload = (src) => {
    if (!src || preloaded.current.has(src)) return
    preloaded.current.add(src)
    const im = new Image()
    im.src = src
    try {
      const l = document.createElement('link')
      l.rel = 'preload'
      l.as = 'image'
      l.href = src
      document.head.appendChild(l)
    } catch {}
  }
  const preloadAll = (list) => {
    const work = () => { list.forEach(s => preload(s)) }
    try {
      if (typeof requestIdleCallback === 'function') { requestIdleCallback(work, { timeout: 2000 }) } else { setTimeout(work, 300) }
    } catch { setTimeout(work, 300) }
  }
  useEffect(() => {
    if (!Array.isArray(imgs) || !imgs.length) return
    preload(imgs[cur])
    if (imgs[cur + 1]) preload(imgs[cur + 1])
    if (imgs[cur - 1]) preload(imgs[cur - 1])
    preloadAll(imgs)
  }, [imgs, cur])
  const sx = useRef(null)
  const lx = useRef(0)
  const onTS = (e) => { if (overlay) return; sx.current = e.touches[0].clientX; lx.current = sx.current }
  const onTM = (e) => { if (sx.current == null || overlay) return; lx.current = e.touches[0].clientX }
  const onTE = () => {
    if (sx.current == null || overlay) return
    const dx = lx.current - sx.current
    sx.current = null
    lx.current = 0
    const T = 40
    if (dx > T) { prev() } else if (dx < -T) { next() }
  }
  const onMD = (e) => { if (overlay) return; if (e.button !== 0) return; sx.current = e.clientX; lx.current = sx.current }
  const onMM = (e) => { if (sx.current == null || overlay) return; lx.current = e.clientX }
  const onMU = () => { onTE() }
  const onML = () => { sx.current = null; lx.current = 0 }
  return (
    <section className="section reveal photo-book-section">
      <h2 className="heading text-center gallery-title title-grow">BỘ SƯU TẬP ẢNH CƯỚI</h2>
      <div className="photo-book">
        <div className="book-inner" onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE} onTouchCancel={onTE} onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onML}>
          <div className="page-base" style={{ backgroundImage: `url(${imgs[cur]})` }} />
          {overlay && (
            <div className={`page-overlay ${overlay.dir === 'next' ? 'flip-in-right' : 'flip-in-left'}`} style={{ backgroundImage: `url(${imgs[overlay.idx]})` }} onAnimationEnd={() => { setCur(overlay.idx); setOverlay(null) }} />
          )}
          <button className="book-control left" disabled={cur <= 0 || !!overlay} onClick={prev} aria-label="Trang trước">
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button className="book-control right" disabled={cur >= imgs.length - 1 || !!overlay} onClick={next} aria-label="Trang sau">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
