# Wedding Invitation Website - Content Templates

## Hero Section Template

### Vietnamese Version
```html
<section class="hero" id="hero">
  <div class="hero__particles" id="particles-js"></div>
  <div class="container">
    <div class="hero__content" data-aos="fade-up">
      <div class="hero__subtitle">Chúng tôi sắp kết hôn!</div>
      <h1 class="hero__title">
        <span class="hero__bride">Nguyễn Thị Hương</span>
        <span class="hero__and">&</span>
        <span class="hero__groom">Trần Văn Nam</span>
      </h1>
      <div class="hero__date" data-aos="fade-up" data-aos-delay="200">
        <span class="date__day">20</span>
        <span class="date__month">Tháng 12</span>
        <span class="date__year">2024</span>
      </div>
      <div class="hero__location" data-aos="fade-up" data-aos-delay="300">
        <i class="fas fa-map-marker-alt"></i>
        Khách sạn Grand Plaza, Hà Nội
      </div>
      <div class="hero__scroll" data-aos="fade-up" data-aos-delay="400">
        <a href="#story" class="scroll__link">
          <span class="scroll__text">Cuộn xuống</span>
          <i class="fas fa-chevron-down scroll__icon"></i>
        </a>
      </div>
    </div>
  </div>
</section>
```

### English Version
```html
<section class="hero" id="hero">
  <div class="hero__particles" id="particles-js"></div>
  <div class="container">
    <div class="hero__content" data-aos="fade-up">
      <div class="hero__subtitle">We're getting married!</div>
      <h1 class="hero__title">
        <span class="hero__bride">Huong Nguyen</span>
        <span class="hero__and">&</span>
        <span class="hero__groom">Nam Tran</span>
      </h1>
      <div class="hero__date" data-aos="fade-up" data-aos-delay="200">
        <span class="date__day">20</span>
        <span class="date__month">December</span>
        <span class="date__year">2024</span>
      </div>
      <div class="hero__location" data-aos="fade-up" data-aos-delay="300">
        <i class="fas fa-map-marker-alt"></i>
        Grand Plaza Hotel, Hanoi
      </div>
      <div class="hero__scroll" data-aos="fade-up" data-aos-delay="400">
        <a href="#story" class="scroll__link">
          <span class="scroll__text">Scroll down</span>
          <i class="fas fa-chevron-down scroll__icon"></i>
        </a>
      </div>
    </div>
  </div>
</section>
```

## Love Story Section Template

### Vietnamese Version
```html
<section class="story" id="story">
  <div class="container">
    <div class="section__header" data-aos="fade-up">
      <h2 class="section__title">Chuyện tình chúng tôi</h2>
      <p class="section__subtitle">Một tình yêu đẹp như mơ</p>
    </div>
    
    <div class="story__timeline">
      <div class="timeline__item" data-aos="fade-right">
        <div class="timeline__date">2019</div>
        <div class="timeline__content">
          <h3>Lần đầu gặp gỡ</h3>
          <p>Chúng tôi gặp nhau lần đầu tiên tại một quán cà phê nhỏ ở phố cổ. Cái nhìn đầu tiên đã để lại ấn tượng khó quên.</p>
          <div class="timeline__image">
            <img src="assets/images/story/first-meet.jpg" alt="Lần đầu gặp gỡ" loading="lazy">
          </div>
        </div>
      </div>
      
      <div class="timeline__item" data-aos="fade-left">
        <div class="timeline__date">2021</div>
        <div class="timeline__content">
          <h3>Bắt đầu hẹn hò</h3>
          <p>Sau hai năm làm bạn, chúng tôi chính thức hẹn hò. Những buổi đi dạo, xem phim cùng nhau thật tuyệt vời.</p>
          <div class="timeline__image">
            <img src="assets/images/story/dating.jpg" alt="Bắt đầu hẹn hò" loading="lazy">
          </div>
        </div>
      </div>
      
      <div class="timeline__item" data-aos="fade-right">
        <div class="timeline__date">2023</div>
        <div class="timeline__content">
          <h3>Lời cầu hôn</h3>
          <p>Nam đã cầu hôn tôi tại bãi biển vào hoàng hôn. Khoảnh khắc ấy thật lãng mạn và đáng nhớ.</p>
          <div class="timeline__image">
            <img src="assets/images/story/proposal.jpg" alt="Lời cầu hôn" loading="lazy">
          </div>
        </div>
      </div>
      
      <div class="timeline__item" data-aos="fade-left">
        <div class="timeline__date">2024</div>
        <div class="timeline__content">
          <h3>Đám cưới của chúng tôi</h3>
          <p>Và giờ đây, chúng tôi sắp chính thức trở thành vợ chồng. Hãy cùng chia sẻ niềm vui này với chúng tôi!</p>
          <div class="timeline__image">
            <img src="assets/images/story/wedding.jpg" alt="Đám cưới" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Save The Date Section Template

```html
<section class="save-the-date" id="save-the-date">
  <div class="container">
    <div class="section__header" data-aos="fade-up">
      <h2 class="section__title">Save The Date</h2>
      <p class="section__subtitle">Đánh dấu ngày quan trọng này</p>
    </div>
    
    <div class="countdown" data-aos="fade-up" data-aos-delay="200">
      <div class="countdown__timer" id="countdown-timer">
        <div class="timer__item">
          <span class="timer__number" id="days">00</span>
          <span class="timer__label">Ngày</span>
        </div>
        <div class="timer__item">
          <span class="timer__number" id="hours">00</span>
          <span class="timer__label">Giờ</span>
        </div>
        <div class="timer__item">
          <span class="timer__number" id="minutes">00</span>
          <span class="timer__label">Phút</span>
        </div>
        <div class="timer__item">
          <span class="timer__number" id="seconds">00</span>
          <span class="timer__label">Giây</span>
        </div>
      </div>
    </div>
    
    <div class="wedding-info" data-aos="fade-up" data-aos-delay="400">
      <div class="info__item">
        <div class="info__icon">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="info__content">
          <h3>Thời gian</h3>
          <p>Thứ Bảy, 20 tháng 12 năm 2024</p>
          <p>Lễ cưới: 10:00 - 11:00</p>
          <p>Tiệc cưới: 11:30 - 14:00</p>
        </div>
      </div>
      
      <div class="info__item">
        <div class="info__icon">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="info__content">
          <h3>Địa điểm</h3>
          <p>Khách sạn Grand Plaza</p>
          <p>117 Trần Duy Hưng, Cầu Giấy</p>
          <p>Hà Nội, Việt Nam</p>
        </div>
      </div>
      
      <div class="info__item">
        <div class="info__icon">
          <i class="fas fa-dress"></i>
        </div>
        <div class="info__content">
          <h3>Dress code</h3>
          <p>Trang trọng, lịch sự</p>
          <p>Tông màu: Pastel</p>
          <p>Tránh màu trắng</p>
        </div>
      </div>
    </div>
    
    <div class="location-map" data-aos="fade-up" data-aos-delay="600">
      <div class="map__container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2935862838295!2d105.80432831533153!3d20.98480739436136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acddc6b6c15f%3A0x32343359b0d0c9b1!2sGrand%20Plaza%20Hanoi!5e0!3m2!1sen!2s!4v1234567890"
          width="100%" 
          height="400" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>
      <div class="map__directions">
        <a href="https://goo.gl/maps/xxxxx" target="_blank" class="btn btn--primary">
          <i class="fas fa-directions"></i>
          Chỉ đường
        </a>
      </div>
    </div>
  </div>
</section>
```

## Gallery Section Template

```html
<section class="gallery" id="gallery">
  <div class="container">
    <div class="section__header" data-aos="fade-up">
      <h2 class="section__title">Khoảnh khắc của chúng tôi</h2>
      <p class="section__subtitle">Những kỷ niệm đẹp nhất</p>
    </div>
    
    <div class="gallery__filter" data-aos="fade-up" data-aos-delay="200">
      <button class="filter__btn active" data-filter="all">Tất cả</button>
      <button class="filter__btn" data-filter="pre-wedding">Pre-wedding</button>
      <button class="filter__btn" data-filter="engagement">Đính hôn</button>
      <button class="filter__btn" data-filter="casual">Thường ngày</button>
    </div>
    
    <div class="gallery__grid" data-aos="fade-up" data-aos-delay="400">
      <div class="gallery__item" data-category="pre-wedding">
        <div class="gallery__image">
          <img src="assets/images/gallery/prewedding-1.jpg" alt="Pre-wedding photo 1" loading="lazy">
          <div class="gallery__overlay">
            <button class="gallery__zoom" data-image="assets/images/gallery/prewedding-1-full.jpg">
              <i class="fas fa-search-plus"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="gallery__item" data-category="engagement">
        <div class="gallery__image">
          <img src="assets/images/gallery/engagement-1.jpg" alt="Engagement photo 1" loading="lazy">
          <div class="gallery__overlay">
            <button class="gallery__zoom" data-image="assets/images/gallery/engagement-1-full.jpg">
              <i class="fas fa-search-plus"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="gallery__item" data-category="casual">
        <div class="gallery__image">
          <img src="assets/images/gallery/casual-1.jpg" alt="Casual photo 1" loading="lazy">
          <div class="gallery__overlay">
            <button class="gallery__zoom" data-image="assets/images/gallery/casual-1-full.jpg">
              <i class="fas fa-search-plus"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Add more gallery items as needed -->
    </div>
    
    <div class="gallery__swiper" data-aos="fade-up" data-aos-delay="600">
      <div class="swiper gallerySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="assets/images/gallery/slider-1.jpg" alt="Gallery slide 1">
          </div>
          <div class="swiper-slide">
            <img src="assets/images/gallery/slider-2.jpg" alt="Gallery slide 2">
          </div>
          <div class="swiper-slide">
            <img src="assets/images/gallery/slider-3.jpg" alt="Gallery slide 3">
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </div>
</section>
```

## RSVP Section Template

```html
<section class="rsvp" id="rsvp">
  <div class="container">
    <div class="section__header" data-aos="fade-up">
      <h2 class="section__title">Xác nhận tham dự</h2>
      <p class="section__subtitle">Hãy cho chúng tôi biết bạn có thể tham dự không</p>
    </div>
    
    <div class="rsvp__form-container" data-aos="fade-up" data-aos-delay="200">
      <form class="rsvp__form" id="rsvp-form">
        <div class="form__group">
          <label for="guest-name" class="form__label">Họ và tên *</label>
          <input type="text" id="guest-name" name="guestName" class="form__input" required>
        </div>
        
        <div class="form__group">
          <label for="guest-email" class="form__label">Email *</label>
          <input type="email" id="guest-email" name="guestEmail" class="form__input" required>
        </div>
        
        <div class="form__group">
          <label for="guest-phone" class="form__label">Số điện thoại</label>
          <input type="tel" id="guest-phone" name="guestPhone" class="form__input">
        </div>
        
        <div class="form__group">
          <label class="form__label">Bạn có thể tham dự không? *</label>
          <div class="form__radio-group">
            <label class="form__radio">
              <input type="radio" name="attendance" value="yes" required>
              <span class="radio__custom"></span>
              Có, tôi sẽ tham dự
            </label>
            <label class="form__radio">
              <input type="radio" name="attendance" value="no" required>
              <span class="radio__custom"></span>
              Không, tôi không thể tham dự
            </label>
          </div>
        </div>
        
        <div class="form__group" id="guest-count-group" style="display: none;">
          <label for="guest-count" class="form__label">Số lượng khách (bao gồm bạn) *</label>
          <select id="guest-count" name="guestCount" class="form__select">
            <option value="">Chọn số lượng</option>
            <option value="1">1 người</option>
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
            <option value="5+">5+ người</option>
          </select>
        </div>
        
        <div class="form__group" id="meal-preference-group" style="display: none;">
          <label class="form__label">Lựa chọn món ăn</label>
          <div class="form__checkbox-group">
            <label class="form__checkbox">
              <input type="checkbox" name="mealPreference" value="chicken">
              <span class="checkbox__custom"></span>
              Gà
            </label>
            <label class="form__checkbox">
              <input type="checkbox" name="mealPreference" value="beef">
              <span class="checkbox__custom"></span>
              Bò
            </label>
            <label class="form__checkbox">
              <input type="checkbox" name="mealPreference" value="fish">
              <span class="checkbox__custom"></span>
              Cá
            </label>
            <label class="form__checkbox">
              <input type="checkbox" name="mealPreference" value="vegetarian">
              <span class="checkbox__custom"></span>
              Chay
            </label>
          </div>
        </div>
        
        <div class="form__group">
          <label for="special-requests" class="form__label">Ghi chú đặc biệt</label>
          <textarea id="special-requests" name="specialRequests" class="form__textarea" 
                    placeholder="Yêu cầu đặc biệt về món ăn, chỗ ngồi, v.v."></textarea>
        </div>
        
        <div class="form__group">
          <button type="submit" class="btn btn--primary btn--large">
            <span class="btn__text">Gửi xác nhận</span>
            <i class="fas fa-paper-plane btn__icon"></i>
          </button>
        </div>
      </form>
      
      <div class="rsvp__success" id="rsvp-success" style="display: none;">
        <div class="success__icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="success__title">Cảm ơn bạn!</h3>
        <p class="success__message">Xác nhận của bạn đã được gửi thành công. Chúng tôi rất mong được gặp bạn!</p>
      </div>
    </div>
  </div>
</section>
```

## Thank You Section Template

```html
<section class="thank-you" id="thank-you">
  <div class="container">
    <div class="thank-you__content" data-aos="fade-up">
      <div class="thank-you__header">
        <h2 class="thank-you__title">Cảm ơn</h2>
        <div class="thank-you__hearts">
          <i class="fas fa-heart heart--1"></i>
          <i class="fas fa-heart heart--2"></i>
          <i class="fas fa-heart heart--3"></i>
        </div>
      </div>
      
      <div class="thank-you__message">
        <p class="thank-you__text">
          "Tình yêu không làm cho thế giới quay tròn. 
          Tình yêu là những gì làm cho chuyến đi đáng giá."
        </p>
        <p class="thank-you__author">- Elizabeth Browning</p>
      </div>
      
      <div class="thank-you__personal">
        <p class="thank-you__note">
          Chúng tôi xin chân thành cảm ơn sự hiện diện và những lời chúc tốt đẹp của quý khách. 
          Sự chia sẻ và yêu thương của mọi người là món quà quý giá nhất đối với chúng tôi trong ngày trọng đại này.
        </p>
      </div>
      
      <div class="thank-you__signature">
        <div class="signature__names">
          <span class="signature__bride">Nguyễn Thị Hương</span>
          <span class="signature__and">&</span>
          <span class="signature__groom">Trần Văn Nam</span>
        </div>
        <div class="signature__date">20.12.2024</div>
      </div>
      
      <div class="thank-you__contact">
        <h3 class="contact__title">Liên hệ</h3>
        <div class="contact__info">
          <div class="contact__item">
            <i class="fas fa-phone"></i>
            <span>Cô dâu: 0987 654 321</span>
          </div>
          <div class="contact__item">
            <i class="fas fa-phone"></i>
            <span>Chú rể: 0987 123 456</span>
          </div>
          <div class="contact__item">
            <i class="fas fa-envelope"></i>
            <span>huongnam.wedding@email.com</span>
          </div>
        </div>
      </div>
      
      <div class="thank-you__social">
        <h3 class="social__title">Theo dõi chúng tôi</h3>
        <div class="social__links">
          <a href="#" class="social__link" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="social__link" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="social__link" aria-label="YouTube">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Footer Template

```html
<footer class="footer">
  <div class="container">
    <div class="footer__content">
      <div class="footer__message">
        <p>Made with <i class="fas fa-heart"></i> by the happy couple</p>
      </div>
      <div class="footer__copyright">
        <p>&copy; 2024 Huong & Nam. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
```

## Sample Content Customization Guide

### Names and Dates
Replace these placeholders with your actual information:
- `Nguyễn Thị Hương` → Cô dâu's name
- `Trần Văn Nam` → Chú rể's name
- `20 tháng 12 năm 2024` → Your wedding date
- `Grand Plaza Hotel` → Your venue name
- `117 Trần Duy Hưng, Cầu Giấy, Hà Nội` → Your venue address

### Images
Replace image paths with your actual photos:
- `assets/images/story/first-meet.jpg` → Your story photos
- `assets/images/gallery/prewedding-1.jpg` → Your gallery photos
- Use descriptive alt text for accessibility

### Contact Information
Update contact details:
- Phone numbers
- Email address
- Social media links
- Map location

### Colors and Styling
Customize the pastel green theme in CSS:
```css
:root {
  --primary-500: #22c55e; /* Your main green color */
  --accent-400: #facc15; /* Your accent color */
}
```

### Language Options
Switch between Vietnamese and English versions:
- Update text content
- Adjust date formats
- Modify cultural references

## Content Tips

### For Hero Section
- Keep names prominent and readable
- Use high-quality background images
- Ensure date is clearly visible
- Add meaningful location information

### For Love Story
- Use 3-5 key moments
- Keep descriptions concise but emotional
- Use consistent photo sizes
- Add dates to each milestone

### For Gallery
- Organize photos by categories
- Use consistent aspect ratios
- Optimize for fast loading
- Add lightbox functionality

### For RSVP Form
- Keep form fields minimal but essential
- Add clear validation messages
- Include success confirmation
- Make it mobile-friendly

### For Thank You
- Use meaningful quotes
- Express genuine gratitude
- Include contact information
- Add social media links

Remember to:
- Proofread all content
- Test on multiple devices
- Get feedback from friends/family
- Keep content updated and relevant