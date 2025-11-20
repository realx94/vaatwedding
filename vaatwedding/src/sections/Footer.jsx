import React from 'react'
import content from '../data/content.json'

export default function Footer() {
  return (
    <footer className="section py-10 reveal">
      <div className="card p-6 text-center">
        <p className="text-gray-700">Xin cảm ơn Quý khách!</p>
        <div className="mt-3 flex justify-center gap-3">
          <a className="px-4 py-2 rounded-md bg-primary-600 text-white" href="tel:+84123456789">Gọi điện</a>
          <a className="px-4 py-2 rounded-md bg-primary-100 text-primary-700" href={content.contacts.mapBride} target="_blank" rel="noreferrer">Chỉ đường</a>
        </div>
      </div>
    </footer>
  )
}
