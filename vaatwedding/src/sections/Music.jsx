import React, { useEffect, useRef, useState } from 'react'

export default function Music() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (!a.paused) { a.pause() } else { a.play().catch(()=>{}) }
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const sync = () => setPlaying(!a.paused)
    a.addEventListener('play', sync)
    a.addEventListener('pause', sync)
    const KEY = 'wedding_audio_userPaused'
    const userPaused = () => { try { return localStorage.getItem(KEY) === '1' } catch { return false } }
    const tryUnmute = () => {
      if (userPaused()) return
      if (!a.paused && a.muted) { a.muted = false; a.volume = 1 }
    }
    const attempt = () => {
      if (userPaused()) return
      const start = () => { a.muted = true; a.play().catch(()=>{}) }
      if (a.readyState >= 2) { start() } else { a.addEventListener('canplay', start, { once: true }) }
    }
    sync()
    const once = () => { a.muted = false; a.volume = 1; try { localStorage.setItem(KEY, '0') } catch {}; attempt(); window.removeEventListener('click', once); window.removeEventListener('touchstart', once) }
    window.addEventListener('click', once, { passive: true })
    window.addEventListener('touchstart', once, { passive: true })
    const onVisible = () => { if (document.visibilityState === 'visible') attempt() }
    const onFocus = () => { attempt() }
    const onPageShow = () => { attempt() }
    const onPlaying = () => { setTimeout(tryUnmute, 300) }
    a.addEventListener('playing', onPlaying)
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onFocus)
    window.addEventListener('pageshow', onPageShow)
    attempt()
    return () => {
      a.removeEventListener('play', sync)
      a.removeEventListener('pause', sync)
      a.removeEventListener('playing', onPlaying)
      window.removeEventListener('click', once)
      window.removeEventListener('touchstart', once)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return (
    <section className="section reveal">
      <audio id="wedding-audio" ref={audioRef} src="/assets/audio/song.mp3" preload="auto" autoPlay loop playsInline muted />
    </section>
  )
}
