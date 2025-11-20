# Wedding Invitation Website - Product Requirements Document

## Tổng quan dự án

### Mục tiêu
Tạo website thiệp cưới online đẹp, hiện đại, responsive với thiết kế mobile-first, sử dụng màu chủ đạo pastel xanh lá.

### Đối tượng người dùng
- Khách mời dự tiệc cưới
- Người thân, bạn bè của cô dâu chú rể
- Khách sử dụng thiết bị di động (ưu tiên)

## Công nghệ và Thư viện

### Công nghệ cơ bản
- **HTML5**: Cấu trúc nội dung chuẩn SEO
- **CSS3**: Styling với CSS Grid, Flexbox, Custom Properties
- **Vanilla JavaScript**: Interactive features, không dùng framework nặng

### Thư viện hỗ trợ
- **AOS (Animate On Scroll)**: Hiệu ứng khi cuộn trang
- **Swiper.js**: Slider cho gallery ảnh
- **Particles.js**: Hiệu ứng hạt tuyết/hoa tạo không khí lãng mạn
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Playfair Display, Inter)
- **SweetAlert2**: Modal thông báo xác nhận tham dự

### Công cụ phát triển
- **Vite**: Build tool và development server
- **PostCSS**: Xử lý CSS với autoprefixer
- **Modernizr**: Feature detection

## Design Tokens - Màu sắc và Typography

### Color Palette (Pastel Green Theme)
```css
:root {
  /* Primary Colors */
  --primary-50: #f0fdf4;
  --primary-100: #dcfce7;
  --primary-200: #bbf7d0;
  --primary-300: #86efac;
  --primary-400: #4ade80;
  --primary-500: #22c55e;
  --primary-600: #16a34a;
  
  /* Accent Colors */
  --accent-50: #fefce8;
  --accent-100: #fef9c3;
  --accent-200: #fef08a;
  --accent-300: #fde047;
  --accent-400: #facc15;
  
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
}
```

### Typography
```css
:root {
  /* Font Families */
  --font-primary: 'Playfair Display', serif;
  --font-secondary: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Spacing System
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

## Cấu trúc Website - Sections

### 1. Hero Section
- **Vị trí**: Đầu trang
- **Nội dung**: 
  - Background với hiệu ứng hoa tuyết/hoa rơi
  - Tên cô dâu chú rể nổi bật
  - Ngày cưới đẹp mắt
  - Nút scroll xuống (animated arrow)
- **Hiệu ứng**: Fade in, parallax

### 2. Love Story Section
- **Vị trí**: Section thứ 2
- **Nội dung**:
  - Timeline chuyện tình yêu
  - Ảnh cặp đôi từng giai đoạn
  - Mô tả ngắn cho mỗi milestone
- **Hiệu ứng**: Slide từng mốc thời gian

### 3. Save The Date Section
- **Vị trí**: Section thứ 3
- **Nội dung**:
  - Đếm ngược ngày cưới (countdown timer)
  - Thông tin chi tiết đám cưới
  - Địa điểm tổ chức
  - Thời gian cụ thể
- **Hiệu ứng**: Countdown animation, flip cards

### 4. Gallery Section
- **Vị trí**: Section thứ 4
- **Nội dung**:
  - Swiper slider với ảnh cưới
  - Lightbox khi click ảnh
  - Categorize theo pre-wedding, engagement, etc.
- **Hiệu ứng**: Swipe gestures, zoom on hover

### 5. RSVP Section
- **Vị trí**: Section thứ 5
- **Nội dung**:
  - Form xác nhận tham dự
  - Số lượng khách
  - Lựa chọn món ăn (nếu có)
  - Ghi chú đặc biệt
- **Hiệu ứng**: Form validation, success animation

### 6. Thank You Section
- **Vị trí**: Cuối trang
- **Nội dung**:
  - Lời cảm ơn chân thành
  - Quote ý nghĩa
  - Thông tin liên hệ
  - Social links (nếu có)
- **Hiệu ứng**: Fade in with heart animation

## Tính năng (Features)

### Core Features
1. **Responsive Design**: Mobile-first approach
2. **Smooth Scrolling**: Cuộn mượt mà giữa các section
3. **Progressive Loading**: Lazy load images
4. **Offline Support**: Service worker cho offline mode
5. **SEO Optimized**: Meta tags, structured data
6. **Analytics**: Google Analytics integration

### Interactive Features
1. **Countdown Timer**: Đếm ngược đến ngày cưới
2. **RSVP Form**: Form xác nhận với validation
3. **Image Gallery**: Swipeable photo gallery
4. **Background Animation**: Particle effects
5. **Scroll Animations**: AOS cho từng section
6. **Music Player**: Background music toggle

### Accessibility Features
1. **Keyboard Navigation**: Full keyboard support
2. **Screen Reader**: ARIA labels và semantic HTML
3. **High Contrast**: Mode cho người khiếm thị
4. **Font Size**: Adjustable text size
5. **Language Toggle**: Vietnamese/English

## UX/UI Requirements

### User Experience
- **Loading Speed**: < 3 giây trên 3G
- **Touch Friendly**: Tap targets > 48px
- **Gesture Support**: Swipe cho gallery
- **Feedback**: Visual feedback cho mọi action
- **Error Handling**: User-friendly error messages

### Visual Design
- **Consistency**: Uniform spacing và typography
- **Hierarchy**: Clear visual hierarchy
- **White Space**: Generous white space
- **Micro-interactions**: Subtle hover effects
- **Brand Consistency**: Pastel green theme throughout

## Yêu cầu sản phẩm (PRD)

### Functional Requirements
1. **Single Page Application**: Tất cả trong một trang
2. **Mobile Optimized**: Performance tốt trên mobile
3. **Cross-browser**: Support Chrome, Safari, Firefox, Edge
4. **Performance**: Lighthouse score > 90
5. **Security**: HTTPS, no mixed content

### Non-functional Requirements
1. **Scalability**: Handle 1000+ concurrent users
2. **Maintainability**: Clean, documented code
3. **Extensibility**: Dễ dàng customize content
4. **Reliability**: 99.9% uptime
5. **Backup**: Regular content backup

### Content Requirements
1. **Images**: Optimized WebP format
2. **Text**: Unicode UTF-8 encoding
3. **Fonts**: Self-hosted hoặc Google Fonts
4. **Icons**: SVG format for scalability
5. **Colors**: WCAG 2.1 AA compliance

## Technical Specifications

### Performance Targets
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.8s

### SEO Requirements
- **Meta Tags**: Complete Open Graph tags
- **Structured Data**: WeddingEvent schema
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Proper crawling instructions
- **Canonical URLs**: Prevent duplicate content

### Security Requirements
- **HTTPS**: SSL certificate required
- **Content Security Policy**: Prevent XSS
- **X-Frame-Options**: Clickjacking protection
- **Secure Headers**: Security headers checklist
- **Input Validation**: Sanitize all user inputs

## Kế hoạch phát triển

### Phase 1: Foundation (2 ngày)
- Setup project structure
- Implement base HTML/CSS
- Setup build tools
- Create design system

### Phase 2: Core Features (3 ngày)
- Hero section với animations
- Navigation và smooth scroll
- Responsive layout
- Basic interactivity

### Phase 3: Advanced Features (2 ngày)
- Gallery implementation
- RSVP form với validation
- Countdown timer
- Background animations

### Phase 4: Polish & Optimization (2 ngày)
- Performance optimization
- Accessibility improvements
- Cross-browser testing
- SEO optimization

### Phase 5: Deployment (1 ngày)
- Production build
- Domain setup
- SSL configuration
- Performance monitoring

## Risk Assessment

### Technical Risks
- **Browser Compatibility**: Test kỹ trên nhiều devices
- **Performance**: Optimize images và animations
- **Scalability**: CDN cho static assets
- **Security**: Implement proper validation

### Content Risks
- **Image Copyright**: Chỉ dùng ảnh có quyền
- **Personal Data**: GDPR compliance cho form data
- **Content Accuracy**: Double-check all information
- **Backup Strategy**: Regular content backup

## Success Metrics

### Quantitative
- **Page Load Speed**: < 3 seconds
- **Mobile Score**: > 90/100 Lighthouse
- **Bounce Rate**: < 30%
- **RSVP Conversion**: > 60%

### Qualitative
- **User Feedback**: Positive reviews
- **Visual Appeal**: Professional design
- **Ease of Use**: Intuitive navigation
- **Emotional Impact**: Memorable experience

## Maintenance Plan

### Regular Updates
- **Content Updates**: Weekly content review
- **Performance Monitoring**: Daily checks
- **Security Updates**: Monthly security audit
- **Backup Schedule**: Daily automated backup

### Support Strategy
- **Documentation**: Complete technical docs
- **Training**: Handover session
- **Emergency Contact**: 24/7 support line
- **Update Process**: Documented procedures