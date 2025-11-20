import React, { useEffect, useState } from 'react'

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

  return (
    <section className="section py-6 reveal">
      <div className="card p-6 text-center">
        <p className="text-gray-700">Đếm ngược tới Sự Kiện Cưới</p>
        <div className="mt-3 flex justify-center gap-6">
          <div>
            <div className="text-3xl font-display text-primary-700">{left.d}</div>
            <div className="text-xs text-gray-600">Ngày</div>
          </div>
          <div>
            <div className="text-3xl font-display text-primary-700">{left.h}</div>
            <div className="text-xs text-gray-600">Giờ</div>
          </div>
          <div>
            <div className="text-3xl font-display text-primary-700">{left.m}</div>
            <div className="text-xs text-gray-600">Phút</div>
          </div>
          <div>
            <div className="text-3xl font-display text-primary-700">{left.s}</div>
            <div className="text-xs text-gray-600">Giây</div>
          </div>
        </div>
      </div>
    </section>
  )
}
