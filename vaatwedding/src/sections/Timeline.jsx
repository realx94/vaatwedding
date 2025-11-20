import React from 'react'

export default function Timeline({ events }) {
  return (
    <section className="section py-10 reveal">
      <h2 className="heading">Lịch trình</h2>
      <ol className="mt-6 relative border-l border-primary-200 pl-6">
        {events.filter(e => e.time).map((e, i) => (
          <li key={i} className="mb-6">
            <div className="absolute -left-2 bg-primary-500 w-4 h-4 rounded-full border-2 border-white" />
            <p className="font-medium text-primary-700">{e.title}</p>
            <p className="text-gray-600">{e.time}</p>
            <p className="text-gray-500">{e.location} • {e.host}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
