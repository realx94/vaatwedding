# Wedding Invitation Website - Technical Implementation Guide

## Project Structure Implementation

### Directory Structure
```
wedding-invitation/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css
│   │   │   ├── variables.css
│   │   │   ├── base.css
│   │   │   ├── components/
│   │   │   │   ├── hero.css
│   │   │   │   ├── story.css
│   │   │   │   ├── countdown.css
│   │   │   │   ├── gallery.css
│   │   │   │   ├── rsvp.css
│   │   │   │   └── thank-you.css
│   │   │   ├── utilities/
│   │   │   │   ├── animations.css
│   │   │   │   ├── spacing.css
│   │   │   │   └── typography.css
│   │   │   └── responsive.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── components/
│   │   │   │   ├── hero.js
│   │   │   │   ├── story.js
│   │   │   │   ├── countdown.js
│   │   │   │   ├── gallery.js
│   │   │   │   ├── rsvp.js
│   │   │   │   └── thank-you.js
│   │   │   ├── utils/
│   │   │   │   ├── animations.js
│   │   │   │   ├── validation.js
│   │   │   │   ├── storage.js
│   │   │   │   └── performance.js
│   │   │   └── vendors/
│   │   │       ├── aos-init.js
│   │   │       ├── swiper-init.js
│   │   │       └── particles-init.js
│   │   ├── images/
│   │   │   ├── gallery/
│   │   │   ├── story/
│   │   │   ├── backgrounds/
│   │   │   └── placeholders/
│   │   └── fonts/
│   ├── components/
│   │   ├── hero.html
│   │   ├── story.html
│   │   ├── countdown.html
│   │   ├── gallery.html
│   │   ├── rsvp.html
│   │   └── thank-you.html
│   ├── partials/
│   │   ├── header.html
│   │   ├── navigation.html
│   │   └── footer.html
│   └── index.html
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── dist/
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── postcss.config.js
└── README.md
```

## Core CSS Implementation

### 1. CSS Variables System
```css
/* src/assets/css/variables.css */
:root {
  /* Color System - Pastel Green Theme */
  --primary-50: #f0fdf4;
  --primary-100: #dcfce7;
  --primary-200: #bbf7d0;
  --primary-300: #86efac;
  --primary-400: #4ade80;
  --primary-500: #22c55e;
  --primary-600: #16a34a;
  --primary-700: #15803d;
  --primary-800: #166534;
  --primary-900: #14532d;
  
  /* Accent Colors */
  --accent-50: #fefce8;
  --accent-100: #fef9c3;
  --accent-200: #fef08a;
  --accent-300: #fde047;
  --accent-400: #facc15;
  --accent-500: #eab308;
  --accent-600: #ca8a04;
  
  /* Neutral Colors */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  
  /* Semantic Colors */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
  
  /* Typography */
  --font-primary: 'Playfair Display', serif;
  --font-secondary: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Font Sizes - Fluid Typography */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
  --text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
  --text-6xl: clamp(3.75rem, 3rem + 3.75vw, 5rem);
  
  /* Spacing - Fluid Spacing */
  --space-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
  --space-3: clamp(0.75rem, 0.6rem + 0.75vw, 1.5rem);
  --space-4: clamp(1rem, 0.8rem + 1vw, 2rem);
  --space-5: clamp(1.25rem, 1rem + 1.25vw, 2.5rem);
  --space-6: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);
  --space-8: clamp(2rem, 1.6rem + 2vw, 4rem);
  --space-10: clamp(2.5rem, 2rem + 2.5vw, 5rem);
  --space-12: clamp(3rem, 2.4rem + 3vw, 6rem);
  --space-16: clamp(4rem, 3.2rem + 4vw, 8rem);
  --space-20: clamp(5rem, 4rem + 5vw, 10rem);
  --space-24: clamp(6rem, 4.8rem + 6vw, 12rem);
  
  /* Layout */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-base: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --neutral-50: #171717;
    --neutral-100: #262626;
    --neutral-200: #404040;
    --neutral-300: #525252;
    --neutral-400: #737373;
    --neutral-500: #a3a3a3;
    --neutral-600: #d4d4d4;
    --neutral-700: #e5e5e5;
    --neutral-800: #f5f5f5;
    --neutral-900: #fafafa;
  }
}
```

### 2. Base CSS Reset
```css
/* src/assets/css/base.css */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-secondary);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--neutral-700);
  background-color: var(--neutral-50);
  overflow-x: hidden;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Selection styles */
::selection {
  background-color: var(--primary-200);
  color: var(--primary-800);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--neutral-100);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-400);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-500);
}
```

### 3. Component-Based CSS Architecture
```css
/* src/assets/css/components/hero.css */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--accent-50) 100%);
  overflow: hidden;
}

.hero__particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: var(--space-6);
  max-width: 800px;
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: var(--primary-600);
  margin-bottom: var(--space-4);
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.2s forwards;
}

.hero__title {
  font-family: var(--font-primary);
  font-size: var(--text-6xl);
  font-weight: 700;
  color: var(--primary-800);
  margin-bottom: var(--space-6);
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.4s forwards;
}

.hero__bride,
.hero__groom {
  display: inline-block;
  position: relative;
}

.hero__and {
  display: inline-block;
  margin: 0 var(--space-4);
  color: var(--accent-500);
  font-size: var(--text-4xl);
  animation: pulse 2s ease-in-out infinite 1s;
}

.hero__date {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  color: var(--primary-600);
  margin-bottom: var(--space-4);
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.6s forwards;
}

.hero__location {
  font-size: var(--text-lg);
  color: var(--neutral-600);
  margin-bottom: var(--space-8);
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.8s forwards;
}

.hero__location i {
  color: var(--accent-500);
  margin-right: var(--space-2);
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeInUp 1s ease-out 1s forwards, bounce 2s ease-in-out infinite 2s;
}

.scroll__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--primary-600);
  transition: var(--transition-base);
}

.scroll__link:hover {
  color: var(--primary-800);
  transform: translateY(2px);
}

.scroll__text {
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.scroll__icon {
  font-size: var(--text-xl);
  animation: bounce 2s ease-in-out infinite;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero__title {
    font-size: var(--text-4xl);
  }
  
  .hero__and {
    font-size: var(--text-2xl);
    margin: 0 var(--space-2);
  }
  
  .hero__date {
    font-size: var(--text-2xl);
  }
  
  .hero__content {
    padding: var(--space-4);
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: var(--text-3xl);
  }
  
  .hero__subtitle {
    font-size: var(--text-base);
  }
  
  .hero__date {
    font-size: var(--text-xl);
  }
}
```

## JavaScript Architecture

### 1. Main Application Module
```javascript
// src/assets/js/main.js
import '../css/main.css';
import { initAnimations } from './utils/animations.js';
import { initPerformance } from './utils/performance.js';
import { initHero } from './components/hero.js';
import { initStory } from './components/story.js';
import { initCountdown } from './components/countdown.js';
import { initGallery } from './components/gallery.js';
import { initRSVP } from './components/rsvp.js';
import { initThankYou } from './components/thank-you.js';

class WeddingApp {
  constructor() {
    this.config = {
      weddingDate: new Date('2024-12-20T10:00:00'),
      animationDisabled: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      touchDevice: 'ontouchstart' in window,
      debug: process.env.NODE_ENV === 'development'
    };
    
    this.init();
  }
  
  async init() {
    try {
      // Initialize performance monitoring
      initPerformance();
      
      // Initialize animations
      if (!this.config.animationDisabled) {
        initAnimations();
      }
      
      // Initialize components
      await this.initializeComponents();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Mark as loaded
      document.body.classList.add('loaded');
      
      console.log('Wedding app initialized successfully');
    } catch (error) {
      console.error('Failed to initialize wedding app:', error);
    }
  }
  
  async initializeComponents() {
    const components = [
      { name: 'hero', init: initHero },
      { name: 'story', init: initStory },
      { name: 'countdown', init: initCountdown },
      { name: 'gallery', init: initGallery },
      { name: 'rsvp', init: initRSVP },
      { name: 'thank-you', init: initThankYou }
    ];
    
    for (const component of components) {
      try {
        const element = document.querySelector(`[data-component="${component.name}"]`);
        if (element) {
          await component.init(element, this.config);
        }
      } catch (error) {
        console.error(`Failed to initialize ${component.name} component:`, error);
      }
    }
  }
  
  setupEventListeners() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', this.handleSmoothScroll.bind(this));
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });
    
    // Handle offline/online
    window.addEventListener('online', () => {
      console.log('Connection restored');
    });
    
    window.addEventListener('offline', () => {
      console.log('Connection lost');
    });
  }
  
  handleSmoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      history.pushState(null, null, `#${targetId}`);
    }
  }
  
  handleResize() {
    // Recalculate component dimensions
    window.dispatchEvent(new CustomEvent('wedding:resize'));
  }
  
  handlePageHidden() {
    // Pause animations and timers
    document.body.classList.add('page-hidden');
  }
  
  handlePageVisible() {
    // Resume animations and timers
    document.body.classList.remove('page-hidden');
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WeddingApp();
});
```

### 2. Component Implementation Example
```javascript
// src/assets/js/components/countdown.js
import { formatTimeUnit } from '../utils/helpers.js';

export function initCountdown(element, config) {
  const countdown = new CountdownTimer(element, config.weddingDate);
  countdown.start();
  
  return countdown;
}

class CountdownTimer {
  constructor(element, targetDate) {
    this.element = element;
    this.targetDate = targetDate;
    this.timer = null;
    this.isRunning = false;
    
    this.elements = {
      days: this.element.querySelector('#days'),
      hours: this.element.querySelector('#hours'),
      minutes: this.element.querySelector('#minutes'),
      seconds: this.element.querySelector('#seconds')
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateDisplay();
  }
  
  setupEventListeners() {
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
    
    // Listen for custom events
    document.addEventListener('wedding:resize', () => {
      this.handleResize();
    });
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.updateDisplay();
    
    this.timer = setInterval(() => {
      this.updateDisplay();
    }, 1000);
  }
  
  pause() {
    if (!this.isRunning) return;
    
    clearInterval(this.timer);
    this.isRunning = false;
  }
  
  resume() {
    if (this.isRunning) return;
    
    this.start();
  }
  
  stop() {
    clearInterval(this.timer);
    this.isRunning = false;
  }
  
  updateDisplay() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;
    
    if (distance < 0) {
      this.stop();
      this.showWeddingDay();
      return;
    }
    
    const time = this.calculateTime(distance);
    this.render(time);
  }
  
  calculateTime(distance) {
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }
  
  render(time) {
    Object.keys(this.elements).forEach(unit => {
      const value = time[unit];
      const element = this.elements[unit];
      
      if (element && element.textContent !== value.toString()) {
        this.animateNumberChange(element, value);
      }
    });
  }
  
  animateNumberChange(element, newValue) {
    // Add animation class
    element.classList.add('changing');
    
    // Update number after brief delay
    setTimeout(() => {
      element.textContent = formatTimeUnit(newValue);
      element.classList.remove('changing');
    }, 150);
  }
  
  showWeddingDay() {
    this.element.innerHTML = `
      <div class="countdown__wedding-day">
        <h3 class="wedding-day__title">Today is the Day!</h3>
        <p class="wedding-day__message">We're getting married!</p>
      </div>
    `;
    
    this.element.classList.add('wedding-day');
  }
  
  handleResize() {
    // Recalculate any responsive elements
    this.updateDisplay();
  }
  
  destroy() {
    this.stop();
    // Clean up event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.removeEventListener('wedding:resize', this.handleResize);
  }
}
```

### 3. Utility Functions
```javascript
// src/assets/js/utils/animations.js
import AOS from 'aos';

export function initAnimations() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100,
    disable: function() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  });
  
  // Custom animations
  setupCustomAnimations();
  setupIntersectionObservers();
}

function setupCustomAnimations() {
  // Stagger animation for timeline items
  const timelineItems = document.querySelectorAll('.timeline__item');
  timelineItems.forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 200}ms`);
  });
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }
}

function setupIntersectionObservers() {
  // Intersection Observer for progressive enhancement
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, observerOptions);
  
  // Observe lazy-loaded images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
```

## Performance Optimization

### 1. Image Optimization System
```javascript
// src/assets/js/utils/performance.js
export function initPerformance() {
  // Monitor Core Web Vitals
  observeCWV();
  
  // Optimize images
  optimizeImages();
  
  // Setup resource hints
  setupResourceHints();
  
  // Monitor performance
  monitorPerformance();
}

function observeCWV() {
  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.startTime < 4000) {
        console.log(`LCP: ${entry.startTime}ms`);
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const delay = entry.processingStart - entry.startTime;
      console.log(`FID: ${delay}ms`);
    }
  }).observe({ entryTypes: ['first-input'] });
  
  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log(`CLS: ${clsValue}`);
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });
}

function optimizeImages() {
  // Convert images to WebP format
  document.querySelectorAll('img').forEach(img => {
    if (img.src.includes('.jpg') || img.src.includes('.png')) {
      const webpSrc = img.src.replace(/\.(jpg|png)$/, '.webp');
      img.srcset = `${webpSrc} 1x, ${img.src} 1x`;
      img.type = 'image/webp';
    }
  });
  
  // Lazy load images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

function setupResourceHints() {
  // Preload critical resources
  const criticalResources = [
    { href: '/fonts/playfair-display.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    Object.assign(link, resource);
    link.rel = 'preload';
    document.head.appendChild(link);
  });
  
  // Prefetch non-critical resources
  const nonCriticalResources = [
    '/assets/js/vendors/aos.js',
    '/assets/js/vendors/swiper.js'
  ];
  
  nonCriticalResources.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
}

function monitorPerformance() {
  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration}ms`);
        }
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
  }
  
  // Monitor memory usage
  if ('memory' in performance) {
    setInterval(() => {
      const memory = performance.memory;
      if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
        console.warn('High memory usage detected');
      }
    }, 30000);
  }
}
```

### 2. Service Worker Implementation
```javascript
// src/service-worker.js
const CACHE_NAME = 'wedding-v1';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/images/hero-bg.webp',
  '/assets/fonts/playfair-display.woff2',
  '/assets/fonts/inter.woff2'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

## Build Configuration

### 1. Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { minify } from 'html-minifier-terser';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        manualChunks: {
          vendor: ['aos', 'swiper', 'particles.js'],
          utils: ['./src/assets/js/utils/animations.js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    target: 'es2015',
    cssTarget: 'chrome61',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true
  },
  plugins: [
    {
      name: 'html-minify',
      apply: 'build',
      transformIndexHtml(html) {
        return minify(html, {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true
        });
      }
    }
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});
```

### 2. PostCSS Configuration
```javascript
// postcss.config.js
export default {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead'
      ]
    },
    'cssnano': {
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: false
      }]
    }
  }
};
```

## Testing Implementation

### 1. Unit Testing Setup
```javascript
// tests/unit/countdown.test.js
import { CountdownTimer } from '../../src/assets/js/components/countdown.js';

describe('CountdownTimer', () => {
  let container;
  let countdown;
  
  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <div class="countdown" data-component="countdown">
        <div class="timer__item">
          <span id="days">00</span>
          <span class="timer__label">Days</span>
        </div>
        <div class="timer__item">
          <span id="hours">00</span>
          <span class="timer__label">Hours</span>
        </div>
        <div class="timer__item">
          <span id="minutes">00</span>
          <span class="timer__label">Minutes</span>
        </div>
        <div class="timer__item">
          <span id="seconds">00</span>
          <span class="timer__label">Seconds</span>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    if (countdown) {
      countdown.destroy();
    }
    document.body.removeChild(container);
  });
  
  test('should initialize with correct date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    
    countdown = new CountdownTimer(container.querySelector('.countdown'), futureDate);
    
    expect(countdown.targetDate).toBe(futureDate);
  });
  
  test('should update display correctly', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setHours(futureDate.getHours() + 2);
    futureDate.setMinutes(futureDate.getMinutes() + 30);
    futureDate.setSeconds(futureDate.getSeconds() + 45);
    
    countdown = new CountdownTimer(container.querySelector('.countdown'), futureDate);
    countdown.updateDisplay();
    
    expect(container.querySelector('#days').textContent).toBe('01');
    expect(container.querySelector('#hours').textContent).toBe('02');
    expect(container.querySelector('#minutes').textContent).toBe('30');
    expect(container.querySelector('#seconds').textContent).toBe('45');
  });
  
  test('should stop when target date is reached', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    
    countdown = new CountdownTimer(container.querySelector('.countdown'), pastDate);
    countdown.updateDisplay();
    
    expect(countdown.isRunning).toBe(false);
    expect(container.querySelector('.countdown')).toHaveClass('wedding-day');
  });
});
```

### 2. E2E Testing Setup
```javascript
// tests/e2e/wedding.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Wedding Invitation Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });
  
  test('should load hero section', async ({ page }) => {
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.hero__title')).toContainText('Huong & Nam');
    await expect(page.locator('.hero__date')).toContainText('December 20, 2024');
  });
  
  test('should navigate to sections', async ({ page }) => {
    // Click on story link
    await page.click('a[href="#story"]');
    await expect(page.locator('#story')).toBeInViewport();
    
    // Click on gallery link
    await page.click('a[href="#gallery"]');
    await expect(page.locator('#gallery')).toBeInViewport();
  });
  
  test('should submit RSVP form', async ({ page }) => {
    await page.click('a[href="#rsvp"]');
    
    // Fill form
    await page.fill('#guest-name', 'Test Guest');
    await page.fill('#guest-email', 'test@example.com');
    await page.check('input[value="yes"]');
    await page.selectOption('#guest-count', '2');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check success message
    await expect(page.locator('.rsvp__success')).toBeVisible();
  });
  
  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.hero__title')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.hero__title')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('.hero__title')).toBeVisible();
  });
});
```

## Deployment Configuration

### 1. Environment Variables
```bash
# .env.example
VITE_WEDDING_DATE=2024-12-20T10:00:00
VITE_COUPLE_NAMES=Huong&Nam
VITE_VENUE_NAME=Grand Plaza Hotel
VITE_VENUE_ADDRESS=117 Tran Duy Hung, Cau Giay, Hanoi
VITE_CONTACT_EMAIL=huongnam.wedding@example.com
VITE_CONTACT_PHONE=+84987123456
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 2. Deployment Scripts
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:unit": "vitest run",
    "lint": "eslint src --ext .js,.ts",
    "lint:fix": "eslint src --ext .js,.ts --fix",
    "deploy:netlify": "npm run build && netlify deploy --prod --dir=dist",
    "deploy:vercel": "npm run build && vercel --prod",
    "deploy:gh-pages": "npm run build && gh-pages -d dist"
  }
}
```

This technical implementation guide provides a solid foundation for building your wedding invitation website with modern web technologies, performance optimization, and best practices.