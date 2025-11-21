import React, { useEffect, useRef, useState } from 'react'

function diff(target) {
  const t = target.getTime() - Date.now()
  const d = Math.max(0, Math.floor(t / (1000 * 60 * 60 * 24)))
  const h = Math.max(0, Math.floor((t / (1000 * 60 * 60)) % 24))
  const m = Math.max(0, Math.floor((t / (1000 * 60)) % 60))
  const s = Math.max(0, Math.floor((t / 1000) % 60))
  return { d, h, m, s }
}

function parseDdMmYyyy(s) {
  const m = (s || '').trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return null
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), 0, 0, 0)
}

export default function Countdown({ dateStr }) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const first = (dateStr || '').split(' - ')[0] || ''
    const target = parseDdMmYyyy(first) || new Date('2026-01-17T00:00:00+07:00')
    setLeft(diff(target))
    const id = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(id)
  }, [dateStr])

  function FlipNumber({ value }) {
    const [display, setDisplay] = useState(String(value).padStart(2, '0'))
    const [anim, setAnim] = useState(false)
    const prev = useRef(undefined)
    const skipOnce = useRef(true)
    useEffect(() => {
      const next = String(value).padStart(2, '0')
      if (prev.current === undefined) {
        prev.current = next
        setDisplay(next)
        return
      }
      if (next !== prev.current) {
        prev.current = next
        setDisplay(next)
        if (skipOnce.current) { skipOnce.current = false; return }
        setAnim(true)
        const t = setTimeout(() => setAnim(false), 650)
        return () => clearTimeout(t)
      }
    }, [value])
    return <div className={`countdown-number ${anim ? 'flip-up' : ''}`}>{display}</div>
  }

  function Tile({ value, label }) {
    return (
      <div className="countdown-tile">
        <FlipNumber value={value} />
        <div className="countdown-label">{label}</div>
      </div>
    )
  }

  return (
    <section className="section py-6 reveal">
      <div className="text-center">
        <p className="countdown-title title-grow">Đếm ngược tới Sự Kiện Cưới</p>
        <div className="countdown-grid">
          <Tile value={left.d} label="NGÀY" />
          <Tile value={left.h} label="GIỜ" />
          <Tile value={left.m} label="PHÚT" />
          <Tile value={left.s} label="GIÂY" />
        </div>
      </div>
    </section>
  )
}
