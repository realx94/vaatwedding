# Wedding Invitation Website - Development Setup Guide

## Prerequisites

Before starting development, ensure you have the following installed:

### Required Software
- **Node.js** (v16 or higher)
- **npm** or **pnpm** (package manager)
- **Git** (for version control)
- **VS Code** (recommended editor)

### Browser Requirements
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Setup

### Step 1: Initialize Project
```bash
# Create project directory
mkdir wedding-invitation
cd wedding-invitation

# Initialize npm project
npm init -y

# Or using pnpm
pnpm init
```

### Step 2: Install Dependencies
```bash
# Core dependencies
npm install -D vite
npm install -D postcss autoprefixer

# Animation libraries
npm install aos@next
npm install swiper
npm install particles.js

# UI libraries
npm install sweetalert2
npm install -D @fortawesome/fontawesome-free

# Development tools
npm install -D concurrently
npm install -D modernizr
```

### Step 3: Project Structure
```
wedding-invitation/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css
│   │   │   ├── components/
│   │   │   ├── utilities/
│   │   │   └── variables.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── components/
│   │   │   └── utils/
│   │   ├── images/
│   │   │   ├── gallery/
│   │   │   ├── backgrounds/
│   │   │   └── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── hero.html
│   │   ├── story.html
│   │   ├── countdown.html
│   │   ├── gallery.html
│   │   ├── rsvp.html
│   │   └── thank-you.html
│   └── index.html
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── dist/ (build output)
├── .gitignore
├── package.json
├── vite.config.js
├── postcss.config.js
└── README.md
```

### Step 4: Configuration Files

#### vite.config.js
```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    postcss: './postcss.config.js'
  }
})
```

#### postcss.config.js
```javascript
export default {
  plugins: {
    autoprefixer: {},
  },
}
```

#### package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite preview --port 3000"
  }
}
```

## Development Workflow

### Starting Development
```bash
# Start development server
npm run dev

# Or using pnpm
pnpm dev
```

### Building for Production
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

### Development Guidelines

#### HTML Structure
- Use semantic HTML5 elements
- Include proper ARIA labels
- Ensure mobile-first structure
- Validate HTML regularly

#### CSS Guidelines
- Use CSS custom properties for theming
- Follow BEM methodology for naming
- Mobile-first media queries
- Optimize for performance

#### JavaScript Guidelines
- Use ES6+ features
- Implement progressive enhancement
- Optimize for performance
- Ensure accessibility

## Content Management

### Image Optimization
- Use WebP format when possible
- Implement lazy loading
- Provide alt text for all images
- Optimize file sizes (< 100KB per image)

### Content Structure
```html
<!-- Example content structure -->
<section class="section" data-section="hero">
  <div class="container">
    <div class="section__content">
      <h1 class="hero__title">Tên Cô Dâu & Chú Rể</h1>
      <p class="hero__subtitle">Chúng tôi sắp kết hôn!</p>
      <div class="hero__date">Ngày 20 tháng 12 năm 2024</div>
    </div>
  </div>
</section>
```

## Testing Strategy

### Browser Testing
- Test on multiple devices
- Check responsive behavior
- Verify touch interactions
- Test performance

### Accessibility Testing
- Use screen readers
- Test keyboard navigation
- Check color contrast
- Validate ARIA implementation

### Performance Testing
- Use Lighthouse audits
- Check load times
- Optimize images
- Minimize JavaScript

## Deployment Options

### Option 1: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### Option 3: GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run build
gh-pages -d dist
```

## Customization Guide

### Changing Colors
Edit `src/assets/css/variables.css`:
```css
:root {
  --primary-500: #your-color;
  --accent-500: #your-accent;
}
```

### Updating Content
Edit the respective HTML files in `src/components/`:
- `hero.html` - Names and date
- `story.html` - Love story timeline
- `countdown.html` - Wedding date
- `gallery.html` - Photo gallery
- `rsvp.html` - RSVP form
- `thank-you.html` - Thank you message

### Adding New Features
1. Create component in `src/components/`
2. Add styles in `src/assets/css/components/`
3. Add JavaScript in `src/assets/js/components/`
4. Import and initialize in `main.js`

## Troubleshooting

### Common Issues
1. **Build errors**: Check import paths
2. **Style issues**: Verify CSS specificity
3. **JavaScript errors**: Check console for errors
4. **Performance issues**: Optimize images and code

### Performance Tips
- Use CSS animations over JavaScript
- Implement lazy loading
- Minimize HTTP requests
- Use CDN for libraries

## Support and Resources

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [AOS Documentation](https://michalsnik.github.io/aos/)
- [Swiper.js Documentation](https://swiperjs.com/)

### Community
- Stack Overflow
- GitHub Issues
- Wedding website communities

## Next Steps

1. Review the PRD document
2. Set up development environment
3. Create initial project structure
4. Implement hero section
5. Build remaining sections
6. Test and optimize
7. Deploy to production

For questions or support, refer to the documentation or community resources.