import React from 'react'
import content from '../data/content.json'

function MapCard({ title, image, link }) {
  return (
    <div className="card overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-display text-lg text-primary-700">{title}</h3>
        <a className="mt-2 inline-block text-primary-600 hover:text-primary-700" href={link} target="_blank" rel="noreferrer">
          Mở chỉ đường
        </a>
      </div>
    </div>
  )
}

export default function Maps() {
  const maps = [
    { title: 'Nhà Gái - Bắc Giang', image: '/assets/images/map-bride.jpg', link: content.contacts.mapBride },
    { title: 'Nhà Trai - Nghệ An', image: '/assets/images/map-groom.jpg', link: content.contacts.mapGroom }
  ]
  return (
    <section className="section py-10 reveal">
      <h2 className="heading">Vị trí</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {maps.map((m, i) => <MapCard key={i} {...m} />)}
      </div>
    </section>
  )
}
