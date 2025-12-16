import React, { useEffect, useState } from 'react'

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
]

export default function WishNotifications() {
  const [wishes, setWishes] = useState([])
  const [displayedWishes, setDisplayedWishes] = useState([])
  const [queueIndex, setQueueIndex] = useState(0)

  // Fetch wishes from Netlify function
  useEffect(() => {
    const fetchWishes = () => {
      fetch('/.netlify/functions/get-wishes')
        .then(r => r.ok ? r.json() : [])
        .then(d => {
          if (Array.isArray(d)) {
            // Sort by timestamp descending (newest first)
            const sorted = [...d].sort((a, b) => (b.ts || 0) - (a.ts || 0))
            setWishes(sorted)
          }
        })
        .catch(() => {})
    }

    fetchWishes()
    // Poll for new wishes every 30 seconds
    const interval = setInterval(fetchWishes, 30000)
    return () => clearInterval(interval)
  }, [])

  // Manage notification display queue
  useEffect(() => {
    if (wishes.length === 0) return

    // Function to add a new notification
    const addNotification = () => {
      if (queueIndex >= wishes.length) return

      const newWish = {
        ...wishes[queueIndex],
        id: `${wishes[queueIndex].ts}-${queueIndex}`,
        timestamp: Date.now(),
        gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
      }

      setDisplayedWishes(prev => {
        // If we already have 5, don't add yet
        if (prev.length >= 5) {
          return prev
        }
        return [...prev, newWish]
      })

      setQueueIndex(prev => prev + 1)
    }

    // Auto-remove notifications after 20 seconds
    const autoRemovalInterval = setInterval(() => {
      const now = Date.now()
      setDisplayedWishes(prev => 
        prev.filter(wish => now - wish.timestamp < 20000)
      )
    }, 1000)

    // Add first notification immediately
    if (queueIndex === 0 && displayedWishes.length === 0) {
      addNotification()
    }

    // Add new notifications every 2 seconds
    const addInterval = setInterval(() => {
      if (displayedWishes.length < 5) {
        addNotification()
      }
    }, 2000)

    return () => {
      clearInterval(autoRemovalInterval)
      clearInterval(addInterval)
    }
  }, [wishes, queueIndex, displayedWishes.length])

  // Reset queue when wishes update
  useEffect(() => {
    setQueueIndex(0)
    setDisplayedWishes([])
  }, [wishes.length])

  if (displayedWishes.length === 0) return null

  const handleRemove = (wishId) => {
    setDisplayedWishes(prev => prev.filter(w => w.id !== wishId))
  }

  return (
    <div className="fixed top-6 right-6 z-[9998] space-y-3 pointer-events-none max-w-[90vw] md:max-w-[400px]">
      {displayedWishes.map((wish, index) => {
        return (
          <div
            key={wish.id}
            className="wish-notification wish-notification-entering"
            style={{
              background: wish.gradient,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => handleRemove(wish.id)}
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 text-2xl">💌</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white truncate drop-shadow-sm">
                  {wish.name}
                </div>
                <div className="text-xs text-white/90 line-clamp-2 drop-shadow-sm">
                  {wish.message}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
