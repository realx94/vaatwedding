import React from 'react'
import content from '../data/content.json'

function MapCard({ title, embedSrc, link }) {
  return (
    <div className="card overflow-hidden relative" style={{ minHeight: 240 }}>
      <div className="absolute inset-0">
        <iframe
          title={title}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div className="relative p-4">
        <h3 className="font-display text-lg text-white map-card-title"><span className="map-badge">{title}</span></h3>
        <a className="mt-2 inline-block text-white/90 hover:text-white map-card-link" href={link} target="_blank" rel="noreferrer">
          <span className="map-link-badge">Mở chỉ đường</span>
        </a>
      </div>
    </div>
  )
}

export default function Maps() {
  const maps = [
    {
      title: 'Nhà Trai',
      embedSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d803.7608771108444!2d107.5491556835903!3d16.609063079059514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141093816ab9681%3A0x14340d86902be0bb!2zQsawdSDEkGnhu4duIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1763691283447!5m2!1svi!2s',
      link: content.contacts.mapGroom
    },
    {
      title: 'Nhà Gái',
      embedSrc:
        'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d402.20589912207515!2d107.56127506556356!3d16.45279038574254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1763691457898!5m2!1svi!2s',
      link: content.contacts.mapBride
    }
  ]
  return (
    <section className="section py-10 reveal">
      <h2 className="heading">Vị trí</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {maps.map((m, i) => (
          <MapCard key={i} {...m} />
        ))}
      </div>
    </section>
  )
}
