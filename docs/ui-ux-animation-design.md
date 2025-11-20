# Wedding Invitation Website - UI/UX Design & Animation Documentation

## Design Principles

### 1. Visual Hierarchy
The wedding website follows a clear visual hierarchy to guide users through the love story:

```css
/* Primary hierarchy - Names and key information */
.hero__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--primary-600);
  text-align: center;
  line-height: 1.2;
}

/* Secondary hierarchy - Supporting information */
.hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--neutral-600);
  font-weight: 400;
}

/* Tertiary hierarchy - Details */
.hero__date {
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: var(--accent-500);
  font-family: var(--font-primary);
}
```

### 2. Color Psychology
Pastel green theme creates emotional connections:

```css
/* Emotional color mapping */
:root {
  /* Love and harmony - Primary green */
  --primary-400: #4ade80; /* Fresh beginnings */
  --primary-500: #22c55e; /* Growth and harmony */
  --primary-600: #16a34a; /* Stability and commitment */
  
  /* Joy and celebration - Accent yellow */
  --accent-300: #fde047; /* Happiness and optimism */
  --accent-400: #facc15; /* Warmth and friendship */
  
  /* Elegance and sophistication - Neutrals */
  --neutral-100: #f5f5f5; /* Purity and innocence */
  --neutral-700: #404040; /* Sophistication */
}
```

### 3. Typography Emotions
Font combinations evoke romantic feelings:

```css
/* Primary font - Elegant and romantic */
--font-primary: 'Playfair Display', serif;
/* Usage: Couple names, section titles, quotes */

/* Secondary font - Clean and modern */
--font-secondary: 'Inter', sans-serif;
/* Usage: Body text, form labels, descriptions */
```

## Animation Philosophy

### 1. Purpose-Driven Animations
Each animation serves a specific emotional purpose:

#### Love Story Timeline Animation
```css
.timeline__item {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline__item.aos-animate {
  opacity: 1;
  transform: translateX(0);
}

/* Alternating sides for visual interest */
.timeline__item:nth-child(even) {
  transform: translateX(50px);
}
```

#### Countdown Timer Animation
```javascript
// Flip animation for countdown numbers
function animateCountdown(element, newValue) {
  const currentValue = element.textContent;
  if (currentValue !== newValue) {
    element.style.transform = 'rotateX(90deg)';
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.textContent = newValue;
      element.style.transform = 'rotateX(0)';
      element.style.opacity = '1';
    }, 300);
  }
}
```

### 2. Natural Movement Patterns
Animations mimic natural physics:

```css
/* Floating particles - Gentle and romantic */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.particle {
  animation: float 6s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.2s);
}

/* Heart beat animation - Subtle and emotional */
@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.heart-icon {
  animation: heartbeat 2s ease-in-out infinite;
}
```

### 3. Scroll-Triggered Storytelling
Progressive reveal creates narrative flow:

```javascript
// AOS (Animate On Scroll) configuration
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100,
  delay: 100,
  
  // Custom animations for different elements
  useClassNames: true,
  initClassName: false,
  animatedClassName: 'aos-animate',
  
  // Disable on mobile for performance
  disable: function() {
    return window.innerWidth < 768;
  }
});
```

## Micro-interactions

### 1. Button Interactions
Romantic and responsive feedback:

```css
.btn--primary {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn--primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn--primary:hover::before {
  left: 100%;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}
```

### 2. Form Field Interactions
Gentle and encouraging feedback:

```css
.form__input {
  border: 2px solid var(--neutral-200);
  transition: all 0.3s ease;
  position: relative;
}

.form__input:focus {
  border-color: var(--primary-400);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  transform: translateY(-1px);
}

.form__input:valid {
  border-color: var(--success);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5rem;
}
```

### 3. Gallery Interactions
Romantic photo viewing experience:

```css
.gallery__item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery__image {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.gallery__image img {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(0.9);
}

.gallery__item:hover .gallery__image img {
  transform: scale(1.05);
  filter: brightness(1);
}

.gallery__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(34, 197, 94, 0.8), rgba(250, 204, 21, 0.8));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery__item:hover .gallery__overlay {
  opacity: 1;
}
```

## Responsive Design Animations

### 1. Mobile-First Approach
Optimized animations for different screen sizes:

```css
/* Base mobile animations */
@media (max-width: 768px) {
  .hero__title {
    animation: fadeInUp 1s ease-out;
  }
  
  .timeline__item {
    /* Simplified animations on mobile */
    animation: fadeIn 0.8s ease-out;
  }
  
  /* Reduce particle count on mobile */
  .particle {
    display: none;
  }
  
  .particle:nth-child(3n) {
    display: block;
  }
}

/* Enhanced desktop animations */
@media (min-width: 769px) {
  .hero__title {
    animation: fadeInUp 1.2s ease-out, float 4s ease-in-out infinite 1.2s;
  }
  
  .timeline__item {
    animation: slideInFromLeft 1s ease-out;
  }
  
  .timeline__item:nth-child(even) {
    animation: slideInFromRight 1s ease-out;
  }
}
```

### 2. Touch-Friendly Interactions
Optimized for mobile touch:

```css
/* Touch feedback */
@media (hover: none) and (pointer: coarse) {
  .btn--primary:active {
    transform: scale(0.95);
    background-color: var(--primary-600);
  }
  
  .gallery__item:active {
    transform: scale(0.98);
  }
  
  /* Swipe indicators */
  .gallery__swiper::after {
    content: '← Swipe →';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.875rem;
    color: var(--neutral-500);
    animation: swipeHint 2s ease-in-out infinite;
  }
}
```

## Performance Optimization

### 1. Animation Performance
Using hardware acceleration:

```css
/* Hardware-accelerated animations */
.animated-element {
  transform: translateZ(0); /* Force hardware acceleration */
  will-change: transform; /* Hint browser for optimization */
  backface-visibility: hidden; /* Prevent flickering */
}

/* Reduce animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .particle {
    display: none;
  }
}
```

### 2. Lazy Loading Animations
Progressive enhancement approach:

```javascript
// Intersection Observer for scroll animations
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      animationObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.querySelectorAll('.timeline__item').forEach(item => {
  animationObserver.observe(item);
});
```

## Emotional Design Patterns

### 1. Romantic Transitions
Smooth and elegant transitions:

```css
/* Page transitions */
.page-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--primary-500), var(--accent-400));
  z-index: 9999;
  transform: translateY(100%);
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}

.page-transition.active {
  transform: translateY(0);
}

/* Heart trail effect */
.heart-trail {
  position: absolute;
  pointer-events: none;
  animation: heartTrail 1s ease-out forwards;
}

@keyframes heartTrail {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1.5) rotate(360deg);
    opacity: 0;
  }
}
```

### 2. Celebration Animations
Joyful moments and celebrations:

```css
/* Confetti animation */
.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--accent-400);
  animation: confettiFall 3s linear infinite;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

/* Success celebration */
.success-celebration {
  animation: celebrationPulse 0.6s ease-out;
}

@keyframes celebrationPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
```

## Accessibility in Animations

### 1. Inclusive Design
Respecting user preferences:

```javascript
// Respect user motion preferences
function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable complex animations
    document.documentElement.classList.add('reduced-motion');
    return;
  }
  
  // Initialize animations
  initParticleEffects();
  initScrollAnimations();
  initCountdownTimer();
}

// Provide alternative feedback
.form__input:focus {
  /* Visual feedback */
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  
  /* Alternative to animation */
  background-color: var(--primary-50);
}
```

### 2. Screen Reader Considerations
Announcing important changes:

```html
<!-- Announce countdown changes -->
<div class="countdown__timer" role="timer" aria-live="polite" aria-atomic="true">
  <span class="sr-only">Time until wedding:</span>
  <div class="timer__item">
    <span class="timer__number" id="days" aria-label="120 days">120</span>
    <span class="timer__label">Days</span>
  </div>
</div>

<!-- Announce form submission -->
<div class="sr-only" role="status" aria-live="polite" id="form-status">
  <!-- Dynamic content will be inserted here -->
</div>
```

## Testing Animations

### 1. Performance Testing
Ensure smooth 60fps animations:

```javascript
// Monitor animation performance
function measureAnimationPerformance() {
  let frameCount = 0;
  let lastTime = performance.now();
  
  function countFrames() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      console.log(`Animation FPS: ${fps}`);
      
      if (fps < 30) {
        console.warn('Low animation performance detected');
        optimizeAnimations();
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(countFrames);
  }
  
  requestAnimationFrame(countFrames);
}
```

### 2. Cross-Browser Testing
Ensure consistent experience:

```css
/* Fallback for browsers without CSS custom properties */
.no-css-vars .hero__title {
  color: #22c55e; /* Fallback color */
}

/* Fallback for browsers without CSS Grid */
.no-css-grid .gallery__grid {
  display: flex;
  flex-wrap: wrap;
}

/* Test different easing functions */
.easing-test {
  transition: transform 0.3s;
}

.easing-test.linear {
  transition-timing-function: linear;
}

.easing-test.ease {
  transition-timing-function: ease;
}

.easing-test.cubic {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## Implementation Checklist

### Pre-Development
- [ ] Define animation purpose for each element
- [ ] Create animation storyboard
- [ ] Set performance budgets
- [ ] Plan fallbacks for older browsers

### During Development
- [ ] Implement progressive enhancement
- [ ] Test on various devices and browsers
- [ ] Optimize for performance
- [ ] Ensure accessibility compliance

### Post-Development
- [ ] Conduct user testing
- [ ] Gather feedback on animations
- [ ] Optimize based on real usage data
- [ ] Document animation system

This comprehensive approach ensures your wedding website creates an emotionally engaging, performant, and accessible experience for all guests.