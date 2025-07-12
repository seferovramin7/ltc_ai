<template>
  <div>
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <img src="/lts_logo.29f6d82c.svg" alt="LTC Lab Logo" class="logo">
          </router-link>
        </div>
        <nav class="nav">
          <a href="#courses" class="nav-link">Kurslar</a>
          <router-link to="/portfolio" class="nav-link">Portfoliolar</router-link>
          <a href="https://www.ltclab.edu.az/about" class="nav-link">Haqqında</a>
          <a href="https://www.ltclab.edu.az/elaqe" class="nav-link">Əlaqə</a>
        </nav>
        <button class="mobile-nav-toggle" @click="toggleMobileNav">
          <div class="hamburger" :class="{ active: isMobileNavOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ active: isMobileNavOpen }">
      <button class="mobile-nav-close" @click="closeMobileNav">×</button>
      <a href="#courses" class="mobile-nav-link" @click="closeMobileNav">Kurslar</a>
      <router-link to="/portfolio" class="mobile-nav-link" @click="closeMobileNav">Portfoliolar</router-link>
      <a href="https://www.ltclab.edu.az/about" class="mobile-nav-link" @click="closeMobileNav">Haqqında</a>
      <a href="https://www.ltclab.edu.az/elaqe" class="mobile-nav-link" @click="closeMobileNav">Əlaqə</a>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title"> Gələcəyin
            <span class="highlight">Suni intellekt texnologiyaları</span> ilə tanış olun
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
    <section id="courses" class="courses" itemscope itemtype="https://schema.org/EducationalOrganization">
      <div class="container">
        <h2 class="section-title">Suni intellekt kurslarımız</h2>
        <div class="courses-grid" itemscope itemtype="https://schema.org/Course">
          <!-- AI Programming Course -->
          <div class="course-card" data-aos="fade-up" data-aos-delay="100" itemscope itemtype="https://schema.org/Course">
            <div class="course-icon">
              <span class="icon-java" role="img" aria-label="Java Programming">☕</span>
            </div>
            <h3 class="course-title" itemprop="name">Suni intellekt Əsaslı Proqramlaşdırma</h3>
            <p class="course-description" itemprop="description">
              Core Java Proqramlaşdırma, Məlumat Strukturları və Alqoritmlər, Sistem Dizaynı öyrənin. Spring Boot, Mikroservislər, 
              AI Agent İnkişafı və müəssisə səviyyəli backend tətbiqləri hazırlayın.
            </p>
            <div class="course-features">
              <span class="feature">Java & Spring</span>
              <span class="feature">Microservices</span>
              <span class="feature">System Design</span>
              <span class="feature">Data Structures</span>
              <span class="feature">AI Integration</span>
            </div>
                         <div class="course-duration">
               <span class="duration">7 ay</span>
               <span class="level">Başlanğıc-İrəli səviyyə</span>
             </div>
            <router-link to="/ai-programming" class="course-button-link">
              <button class="course-button">Ətraflı Məlumat</button>
            </router-link>
          </div>

          <!-- AI Engineering Course -->
          <div class="course-card" data-aos="fade-up" data-aos-delay="200" itemscope itemtype="https://schema.org/Course">
            <div class="course-icon">
              <span class="icon-python" role="img" aria-label="Python Programming">🐍</span>
            </div>
            <h3 class="course-title" itemprop="name">Suni intellekt Mühəndisliyi - Python Maşın Öyrənməsi və Dərin Öyrənmə</h3>
            <p class="course-description" itemprop="description">
              Python Proqramlaşdırma, NumPy, Pandas, Maşın Öyrənməsi, Dərin Öyrənmə, NLP, Kompüter Görmə öyrənin. 
              TensorFlow, Keras, LLM-lər və MLOps texnologiyalarını master edin.
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
            <router-link to="/ai-engineering" class="course-button-link">
              <button class="course-button">Ətraflı Məlumat</button>
            </router-link>
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
            <strong>Suni intellekt</strong> yalnız gələcəyin texnologiyası deyil, bugünün reallığıdır. 
            LTC Lab-da biz sizə <strong>suni intellekt kursları</strong> ilə bu güclü alətləri öyrətmək və karyeranızı növbəti səviyyəyə çatdırmaq üçün buradayıq.
            Azərbaycanda ən yaxşı <strong>AI kursları</strong> və <strong>maşın öyrənməsi</strong> təhsili alın.
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
            <p class="footer-text">
              LTC Lab - Azərbaycanın aparıcı <strong>suni intellekt</strong> və texnologiya təhsil mərkəzi. 
              <strong>Suni intellekt kursları</strong> ilə gələcəyin rəqəmsal dünyasına hazırlaşın.
            </p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Kurslar</h4>
              <router-link to="/ai-programming">AI Proqramlaşdırma</router-link>
              <router-link to="/ai-engineering">AI Mühəndisliyi</router-link>
              <router-link to="/portfolio">Tələbə Portfolioları</router-link>
              <a href="#ai-creativity">AI Yaradıcılıq</a>
            </div>
            <div class="link-group">
              <h4>Şirkət</h4>
              <a href="https://www.ltclab.edu.az/about">Haqqımızda</a>
              <a href="#team">Komandamız</a>
              <a href="#careers">Karyera</a>
            </div>
            <div class="link-group">
              <h4>Əlaqə</h4>
              <a href="mailto:gel@ltclab.edu.az">gel@ltclab.edu.az</a>
              <a href="tel:+994512150666">+994 51 215 06 66</a>
              <a href="https://www.ltclab.edu.az/elaqe">AGA Business Center</a>
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
  name: 'Home',
  data() {
    return {
      isMobileNavOpen: false
    }
  },
  mounted() {
    // Set page title and meta tags
    document.title = 'Suni intellekt kursları LTC Lab - AI Proqramlaşdırma və Maşın Öyrənməsi | Bakı';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Suni intellekt kursları LTC Lab-da! AI proqramlaşdırma, maşın öyrənməsi, dərin öyrənmə, Python AI, Java AI öyrənin. Azərbaycanda ən yaxşı suni intellekt təhsili. Bakıda professional AI kursları.');
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'AI Based Software Engineering, Core Java Programming, Data Structures Algorithms, System Design, Machine Learning, Deep Learning, Python AI, Java Spring Boot, Microservices, AI Engineering, LTC Lab Azerbaijan, Software Engineering Courses, AI Programming, Backend Development, Full Stack Development');
    }
    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
    }

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileNavOpen) {
        this.closeMobileNav();
      }
    });
  },
  beforeUnmount() {
    // Clean up body overflow style
    document.body.style.overflow = '';
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
    },
    toggleMobileNav() {
      this.isMobileNavOpen = !this.isMobileNavOpen;
      if (this.isMobileNavOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMobileNav() {
      this.isMobileNavOpen = false;
      document.body.style.overflow = '';
    }
  }
}
</script> 