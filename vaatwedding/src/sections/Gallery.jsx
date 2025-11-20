import React from 'react'

export default function Gallery() {
  const images = [
    '/assets/images/gallery-1.jpg',
    '/assets/images/gallery-2.jpg',
    '/assets/images/gallery-3.jpg',
    '/assets/images/gallery-4.jpg'
  ]
  return (
    <section className="section py-10 reveal">
      <h2 className="heading">Hình ảnh</h2>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Ảnh cưới ${i+1}`} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
        ))}
      </div>
    </section>
  )
}
