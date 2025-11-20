import React from 'react'

export default function Hero({ couple }) {
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="section pt-10 sm:pt-14 md:pt-20 text-center reveal">
      <div className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm">
        {couple.tagline}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-primary-700">{couple.groom}</h1>
        <span className="text-3xl md:text-4xl text-primary-600">&</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-primary-700">{couple.bride}</h1>
      </div>
      <p className="mt-2 text-gray-600">{couple.weddingDate}</p>
      <div className="mt-6 mx-auto max-w-3xl card p-6">
        <p className="text-lg">Trân trọng kính mời Quý khách tới chung vui cùng gia đình.</p>
        <div className="mt-4 flex justify-center gap-3">
          <button className="px-4 py-2 rounded-md bg-primary-600 text-white" onClick={() => scrollTo('#rsvp-section')}>Xác nhận tham dự</button>
          <button className="px-4 py-2 rounded-md bg-primary-100 text-primary-700" onClick={() => scrollTo('#wishbook-section')}>Gửi lời chúc</button>
        </div>
      </div>
    </section>
  )
}
