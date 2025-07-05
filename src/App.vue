<script setup>
// AI Courses main page
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <img src="/lts_logo.29f6d82c.svg" alt="LTC Lab" class="logo" />
        </div>
        <nav class="nav">
          <a href="#haqqimizda" class="nav-link">Haqqımızda</a>
          <a href="#telimlerimiz" class="nav-link">Təlimlərimiz</a>
          <a href="#bloqlar" class="nav-link">Bloqlar</a>
          <a href="#ltc-lab" class="nav-link">LTC Lab-də Həyat</a>
          <button class="cta-button">Bizimlə Əlaqə</button>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Möhtəşəm <span class="highlight">AI karyera arzuların</span> var?
            <br>Biz bütün imkanları yaratmışıq!
          </h1>
          <div class="hero-tags">
            <span class="tag">Suni İntellekt Əsaslı Proqramlaşdırma</span>
            <span class="tag">Suni İntellekt Mühəndisliyi</span>
            <span class="tag">Suni İntellekt Yaradıcılıq</span>
          </div>
          <button class="hero-cta">Ödənişsiz konsultasiya al!</button>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section class="courses">
      <div class="container">
        <h2 class="section-title">LTC Lab özəl intensiv AI təlim proqramları</h2>
        <div class="courses-grid">
          <!-- AI Powered Programming Course -->
          <div class="course-card">
            <div class="course-icon">
              <div class="icon-java">☕</div>
            </div>
            <h3 class="course-title">Suni İntellekt Əsaslı Proqramlaşdırma</h3>
            <p class="course-description">
              Java Backend, Spring Framework, Microservices, System Design və AI-powered development
            </p>
            <div class="course-features">
              <span class="feature">Java & Spring Ecosystem</span>
              <span class="feature">Microservices Architecture</span>
              <span class="feature">System Design</span>
              <span class="feature">AI Integration</span>
            </div>
            <div class="course-duration">
              <span class="duration">6 Ay</span>
              <span class="level">Başlanğıc səviyyə</span>
            </div>
            <button class="course-button">İndi əlaqə saxlayın</button>
          </div>

          <!-- AI Engineering Course -->
          <div class="course-card">
            <div class="course-icon">
              <div class="icon-python">🐍</div>
            </div>
            <h3 class="course-title">Suni İntellekt Mühəndisliyi</h3>
            <p class="course-description">
              Python, Machine Learning, Deep Learning, NLP, Computer Vision və MLOps
            </p>
            <div class="course-features">
              <span class="feature">Python & Data Science</span>
              <span class="feature">ML/DL with TensorFlow</span>
              <span class="feature">NLP & LLMs</span>
              <span class="feature">MLOps & Deployment</span>
            </div>
            <div class="course-duration">
              <span class="duration">8 Ay</span>
              <span class="level">Başlanğıc səviyyə</span>
            </div>
            <button class="course-button">İndi əlaqə saxlayın</button>
          </div>

          <!-- AI Creativity Course -->
          <div class="course-card coming-soon">
            <div class="course-icon">
              <div class="icon-creativity">🎨</div>
            </div>
            <h3 class="course-title">Suni İntellekt Yaradıcılıq</h3>
            <p class="course-description">
              Generative AI, Creative Tools, Digital Art və AI-powered Content Creation
            </p>
            <div class="course-features">
              <span class="feature">Generative AI</span>
              <span class="feature">Creative Tools</span>
              <span class="feature">Digital Art</span>
              <span class="feature">Content Creation</span>
            </div>
            <div class="course-duration">
              <span class="duration">Tezliklə</span>
              <span class="level">Başlanğıc səviyyə</span>
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
          <h2 class="message-title">Hər şey daha asan olacaq</h2>
          <p class="message-text">
            Suni intellekti öz xeyrinizə istifadə edə bilsəniz, hər şey daha asan olacaq!
            Bizim kurslarımızla AI-nın gücündən istifadə edərək karyeranızı növbəti səviyyəyə çatdırın.
          </p>
          <div class="message-features">
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <span>AI-powered Development</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>Sürətli Öyrənmə</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎯</span>
              <span>Praktik Layihələr</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💼</span>
              <span>Karyera Dəstəyi</span>
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
            <img src="/lts_logo_light.svg" alt="LTC Lab" class="footer-logo" />
            <p class="footer-text">
              Sizə hər zaman sad xəbərimiz var!
            </p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Təlimlərimiz</h4>
              <a href="#">Suni İntellekt Əsaslı Proqramlaşdırma</a>
              <a href="#">Suni İntellekt Mühəndisliyi</a>
              <a href="#">Suni İntellekt Yaradıcılıq</a>
            </div>
            <div class="link-group">
              <h4>Əlaqə</h4>
              <a href="#">Bizimlə Əlaqə</a>
              <a href="#">Konsultasiya</a>
              <a href="#">FAQ</a>
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

<style>
/* This style will be global, not scoped */
</style>
