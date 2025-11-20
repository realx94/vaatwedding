import React, { useRef, useState } from 'react'

export default function Music() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) } else { a.play(); setPlaying(true) }
  }

  return (
    <section className="section py-6 reveal">
      <div className="card p-6 flex items-center justify-between">
        <p className="text-gray-700">Nhạc nền</p>
        <button className="px-4 py-2 rounded-md bg-primary-600 text-white" onClick={toggle}>{playing ? 'Tạm dừng' : 'Phát nhạc'}</button>
      </div>
      <audio ref={audioRef} src="/assets/audio/song.mp3" preload="none" />
    </section>
  )
}
