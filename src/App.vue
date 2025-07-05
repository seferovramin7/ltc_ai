<script setup>
// AI Courses main page
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <img src="/lts_logo.29f6d82c.svg" alt="LTC Lab Logo" class="logo">
        </div>
        <nav class="nav">
          <a href="#courses" class="nav-link">Kurslar</a>
          <a href="#about" class="nav-link">Haqqında</a>
          <a href="#contact" class="nav-link">Əlaqə</a>
          <button class="cta-button">Qeydiyyat</button>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Gələcəyin <span class="highlight">AI texnologiyaları</span> ilə tanış olun
          </h1>
          <div class="hero-tags">
            <span class="tag">🚀 Praktik təcrübə</span>
            <span class="tag">💡 İnnovasiya</span>
            <span class="tag">🎯 Karyera inkişafı</span>
            <span class="tag">🌟 Ekspert təlimçilər</span>
          </div>
          <button class="hero-cta" @click="scrollToCourses">Kursları Kəşf Et</button>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section id="courses" class="courses">
      <div class="container">
        <h2 class="section-title">AI Kurslarımız</h2>
        <div class="courses-grid">
          <!-- AI Programming Course -->
          <div class="course-card" data-aos="fade-up" data-aos-delay="100">
            <div class="course-icon">
              <span class="icon-java">☕</span>
            </div>
            <h3 class="course-title">Suni intellekt əsaslı proqramlaşdırma</h3>
            <p class="course-description">
              Java və Spring Framework əsasında müasir AI həlləri yaratmaq üçün backend development öyrənin. 
              Microservices, sistem dizaynı və data strukturları ilə güclü AI tətbiqləri hazırlayın.
            </p>
            <div class="course-features">
              <span class="feature">Java & Spring</span>
              <span class="feature">Microservices</span>
              <span class="feature">System Design</span>
              <span class="feature">Data Structures</span>
              <span class="feature">AI Integration</span>
            </div>
            <div class="course-duration">
              <span class="duration">6 ay</span>
              <span class="level">Orta-İrəli səviyyə</span>
            </div>
            <button class="course-button">Kursa Başla</button>
          </div>

          <!-- AI Engineering Course -->
          <div class="course-card" data-aos="fade-up" data-aos-delay="200">
            <div class="course-icon">
              <span class="icon-python">🐍</span>
            </div>
            <h3 class="course-title">Suni intellekt mühəndisliyi</h3>
            <p class="course-description">
              Python əsasında AI və Machine Learning həlləri yaradın. NumPy, Pandas, TensorFlow və MLOps 
              texnologiyalarını öyrənərək peşəkar AI mühəndisi olun.
            </p>
            <div class="course-features">
              <span class="feature">Python & ML</span>
              <span class="feature">TensorFlow</span>
              <span class="feature">Data Science</span>
              <span class="feature">NLP</span>
              <span class="feature">MLOps</span>
            </div>
            <div class="course-duration">
              <span class="duration">4 ay</span>
              <span class="level">Başlanğıc-Orta səviyyə</span>
            </div>
            <button class="course-button">Kursa Başla</button>
          </div>

          <!-- AI Creativity Course -->
          <div class="course-card coming-soon" data-aos="fade-up" data-aos-delay="300">
            <div class="course-icon">
              <span class="icon-creativity">🎨</span>
            </div>
            <h3 class="course-title">Suni intellekt yaradıcılıq</h3>
            <p class="course-description">
              Generative AI və yaradıcı texnologiyalar ilə incəsənət, dizayn və multimedia sahələrində 
              innovativ həllər yaradın. GPT, DALL-E və digər AI alətlərini öyrənin.
            </p>
            <div class="course-features">
              <span class="feature">Generative AI</span>
              <span class="feature">GPT Models</span>
              <span class="feature">AI Art</span>
              <span class="feature">Creative Tools</span>
              <span class="feature">Multimedia</span>
            </div>
            <div class="course-duration">
              <span class="duration">4 ay</span>
              <span class="level">Bütün səviyyələr</span>
            </div>
            <button class="course-button disabled">Tezliklə</button>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Message Section -->
    <section class="ai-message">
      <div class="container">
        <div class="message-content">
          <h2 class="message-title">Gələcəyin Texnologiyası İndi Əlinizdə</h2>
          <p class="message-text">
            Suni intellekt yalnız gələcəyin texnologiyası deyil, bugünün reallığıdır. 
            LTC Lab-da biz sizə bu güclü alətləri öyrətmək və karyeranızı növbəti səviyyəyə çatdırmaq üçün buradayıq.
          </p>
          <div class="message-features">
            <div class="feature-item">
              <span class="feature-icon">🎓</span>
              <div>
                <h4>Ekspert Təlimçilər</h4>
                <p>Sahə üzrə təcrübəli mütəxəssislərdən öyrənin</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💼</span>
              <div>
                <h4>Praktik Layihələr</h4>
                <p>Real dünya problemlərini həll edən layihələr hazırlayın</p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🌐</span>
              <div>
                <h4>Karyera Dəstəyi</h4>
                <p>İş tapmaq üçün lazım olan bütün köməkliyi alın</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="/lts_logo_light.svg" alt="LTC Lab Logo" class="footer-logo">
            <p class="footer-text">
              LTC Lab - Azərbaycanın aparıcı texnologiya təhsil mərkəzi. 
              Gələcəyin rəqəmsal dünyasına hazırlaşın.
            </p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Kurslar</h4>
              <a href="#ai-programming">AI Proqramlaşdırma</a>
              <a href="#ai-engineering">AI Mühəndisliyi</a>
              <a href="#ai-creativity">AI Yaradıcılıq</a>
            </div>
            <div class="link-group">
              <h4>Şirkət</h4>
              <a href="#about">Haqqımızda</a>
              <a href="#team">Komandamız</a>
              <a href="#careers">Karyera</a>
            </div>
            <div class="link-group">
              <h4>Əlaqə</h4>
              <a href="mailto:info@ltclab.edu.az">info@ltclab.edu.az</a>
              <a href="tel:+994123456789">+994 12 345 67 89</a>
              <a href="#location">Ünvan</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 LTC Lab. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
    }
  },
  methods: {
    scrollToCourses() {
      const coursesSection = document.getElementById('courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}
</script>

<style>
/* This style will be global, not scoped */
</style>
