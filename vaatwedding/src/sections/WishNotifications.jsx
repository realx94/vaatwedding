import React, { useEffect, useState } from 'react'

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
        timestamp: Date.now()
      }

      setDisplayedWishes(prev => {
        // If we already have 5, wait for the oldest one to disappear
        if (prev.length >= 5) {
          return prev
        }
        return [...prev, newWish]
      })

      setQueueIndex(prev => prev + 1)
    }

    // Function to remove old notifications (after 3 seconds)
    const cleanupInterval = setInterval(() => {
      const now = Date.now()
      setDisplayedWishes(prev => 
        prev.filter(wish => now - wish.timestamp < 3000)
      )
    }, 100)

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
      clearInterval(cleanupInterval)
      clearInterval(addInterval)
    }
  }, [wishes, queueIndex, displayedWishes.length])

  // Reset queue when wishes update
  useEffect(() => {
    setQueueIndex(0)
    setDisplayedWishes([])
  }, [wishes.length])

  if (displayedWishes.length === 0) return null

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 pointer-events-none">
      {displayedWishes.map((wish, index) => {
        const age = Date.now() - wish.timestamp
        const isLeaving = age > 2700 // Start fade out at 2.7s
        
        return (
          <div
            key={wish.id}
            className={`wish-notification ${isLeaving ? 'wish-notification-leaving' : 'wish-notification-entering'}`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 text-2xl">💌</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-pink-600 truncate">
                  {wish.name}
                </div>
                <div className="text-xs text-gray-700 line-clamp-2">
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
