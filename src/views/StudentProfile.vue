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
          <a href="/#courses" class="nav-link">Kurslar</a>
          <router-link to="/portfolio" class="nav-link">Portfoliolar</router-link>
          <a href="https://www.ltclab.edu.az/about" class="nav-link">Haqqında</a>
          <a href="https://www.ltclab.edu.az/elaqe" class="nav-link">Əlaqə</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section with Profile Picture -->
    <section class="hero" v-if="student">
      <div class="container">
        <div class="hero-content">
          <div class="profile-section">
            <div class="profile-picture-container">
              <div v-if="shouldShowPlaceholder(student.photo)" class="profile-placeholder">
                <span class="initials">{{ getInitials(student.name, student.surname) }}</span>
              </div>
              <img 
                v-else
                :src="student.photo" 
                :alt="`${student.name} ${student.surname}`" 
                class="profile-picture"
                @error="handleImageError"
                loading="lazy"
              >
            </div>
            <div class="profile-info">
          <h1 class="hero-title">{{ student.name }} {{ student.surname }}</h1>
              <p class="student-details">{{ student.age }} yaş • {{ student.profession }}</p>
              <div class="student-badges">
                <span class="program-badge">{{ student.programName }}</span>
                <span class="group-badge">{{ student.groupName }}</span>
              </div>
        </div>
      </div>
          <div class="back-navigation">
            <button @click="goBack" class="back-btn">
              ← Portfoliolara qayıt
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Student Profile -->
    <section class="student-profile" v-if="student">
      <div class="container">

        <!-- Projects Section -->
        <div class="projects-section">
          <h2 class="section-title">Layihələr ({{ student.projects.length }})</h2>
          
          <div v-if="student.projects.length === 0" class="no-projects">
            <p>Hələ ki layihə əlavə edilməyib.</p>
          </div>
          
          <div v-else class="projects-grid">
            <ProjectCard
              v-for="project in student.projects"
              :key="project.id"
              :project="project"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <section v-else-if="loading" class="loading">
      <div class="container">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p>Tələbə məlumatları yüklənir...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else class="error">
      <div class="container">
        <div class="error-content">
          <h2>{{ error || 'Tələbə tapılmadı' }}</h2>
          <p>{{ error ? 'Zəhmət olmasa yenidən cəhd edin.' : 'Axtardığınız tələbə portfoliosu mövcud deyil.' }}</p>
          <div class="error-actions">
            <button v-if="error" @click="loadStudent" class="retry-btn">Yenidən cəhd et</button>
          <router-link to="/portfolio" class="back-link">Portfoliolara qayıt</router-link>
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
import PortfolioService from '../data/portfolioService.js'
import ProjectCard from '../components/portfolio/ProjectCard.vue'

export default {
  name: 'StudentProfile',
  components: {
    ProjectCard
  },
  data() {
    return {
      student: null,
      loading: true,
      error: null
    }
  },
  methods: {
    async loadStudent() {
      try {
        this.loading = true
        this.error = null
        
        const studentId = parseInt(this.$route.params.id)
        this.student = await PortfolioService.getStudentById(studentId)
      
      if (this.student) {
        // Set page title
        document.title = `${this.student.name} ${this.student.surname} - Portfolio | LTC Lab`
        } else {
          this.error = 'Tələbə tapılmadı'
        }
      } catch (error) {
        console.error('Error loading student:', error)
        this.error = 'Tələbə məlumatları yüklənərkən xəta baş verdi'
      } finally {
        this.loading = false
      }
    },
    

    
    goBack() {
      this.$router.push('/portfolio')
    },

    handleImageError(event) {
      event.target.src = '/images/default-avatar.jpg'
    },

    getInitials(name, surname) {
      const firstInitial = name ? name.charAt(0).toUpperCase() : ''
      const lastInitial = surname ? surname.charAt(0).toUpperCase() : ''
      return firstInitial + lastInitial || '??'
    },

    shouldShowPlaceholder(imageUrl) {
      return !imageUrl || imageUrl === '/images/default-avatar.jpg'
    }
  },
  async mounted() {
    await this.loadStudent()
  },
  watch: {
    '$route'() {
      this.loadStudent()
    }
  }
}
</script>

<style scoped>




/* Hero Section */
.hero {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  color: #1a202c;
  padding: 120px 0 80px;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, rgba(203, 35, 96, 0.1), rgba(203, 35, 96, 0.05));
  border-radius: 50%;
  transform: translate(100px, -100px);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 2rem;
  width: 100%;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.profile-picture-container {
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture, .profile-placeholder {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 5px solid #cb2360;
  box-shadow: 0 12px 40px rgba(203, 35, 96, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
}

.profile-picture {
  object-fit: cover;
  object-position: center;
}

.profile-placeholder {
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.profile-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
}

.initials {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
  position: relative;
}

.profile-picture:hover, .profile-placeholder:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 48px rgba(203, 35, 96, 0.35);
}

.profile-info {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  color: #1a202c;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.student-details {
  font-size: 1.2rem;
  color: #4a5568;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.student-details::before {
  content: '👨‍💻';
  font-size: 1.1rem;
}

.student-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.program-badge,
.group-badge {
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.program-badge::before,
.group-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  transition: opacity 0.3s ease;
  opacity: 0;
}

.program-badge:hover::before,
.group-badge:hover::before {
  opacity: 1;
}

.program-badge {
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  color: white;
  box-shadow: 0 4px 15px rgba(203, 35, 96, 0.3);
}

.group-badge {
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
}

.program-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(203, 35, 96, 0.4);
}

.group-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(66, 153, 225, 0.4);
}

.back-navigation {
  margin-bottom: 2rem;
}

.back-btn {
  background: rgba(255, 255, 255, 0.95);
  color: #4a5568;
  border: 2px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-btn:hover {
  background: white;
  color: #cb2360;
  border-color: #cb2360;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(203, 35, 96, 0.2);
}



/* Student Profile */
.student-profile {
  padding: 120px 0 60px;
  min-height: calc(100vh - 200px);
}

.back-navigation {
  margin-bottom: 0;
}

.back-btn {
  background: none;
  border: none;
  color: #cb2360;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.back-btn:hover {
  color: #a91c4d;
  background: rgba(203, 35, 96, 0.1);
}

.student-header {
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  text-align: center;
}

.student-info {
  width: 100%;
}

.student-name {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.student-details {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0 0 1rem 0;
}

.student-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.program-badge,
.group-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.program-badge {
  background: linear-gradient(135deg, #cb2360, #e91e63);
  color: white;
}

.group-badge {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

/* Projects Section */
.projects-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 2rem;
  text-align: center;
}

.no-projects {
  text-align: center;
  padding: 3rem 0;
  color: #64748b;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

/* Loading and Error States */
.loading,
.error {
  padding: 120px 0 60px;
  min-height: calc(100vh - 200px);
}

.loading-content,
.error-content {
  text-align: center;
  padding: 4rem 0;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #cb2360;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-content h2 {
  font-size: 1.8rem;
  color: #1a202c;
  margin-bottom: 1rem;
}

.error-content p {
  color: #64748b;
  margin-bottom: 2rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: #cb2360;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background: #a91c4d;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #4a5568;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.back-link:hover {
  background: #2d3748;
}

/* Footer */
.footer {
  background: #1a202c;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand .footer-text {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.link-group h4 {
  color: #cb2360;
  margin-bottom: 1rem;
  font-weight: 600;
}

.link-group a {
  display: block;
  color: #cbd5e0;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: #cb2360;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #2d3748;
  opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 80px 0 40px;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .profile-section {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2rem 1.5rem;
    margin: 0 1rem 3rem 1rem;
  }
  
  .profile-info {
    text-align: center;
    min-height: auto;
  }
  
  .profile-picture, .profile-placeholder {
    width: 140px;
    height: 140px;
    border-width: 4px;
  }
  
  .initials {
    font-size: 2.5rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .student-details {
    font-size: 1.1rem;
    justify-content: center;
  }
  
  .student-badges {
    justify-content: center;
  }
  
  .back-navigation {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .student-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .student-avatar img {
    width: 100px;
    height: 100px;
  }
  
  .student-name {
    font-size: 1.5rem;
  }
  
  .student-meta {
    justify-content: center;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
  

}

@media (max-width: 480px) {
  .hero {
    padding: 60px 0 30px;
  }
  
  .hero-content {
    padding: 0 0.5rem;
  }
  
  .profile-section {
    padding: 1.5rem 1rem;
    margin: 0 0.5rem 2rem 0.5rem;
    gap: 1.5rem;
  }
  
  .profile-picture, .profile-placeholder {
    width: 120px;
    height: 120px;
    border-width: 3px;
  }
  
  .initials {
    font-size: 2.2rem;
  }
  
  .hero-title {
    font-size: 1.9rem;
  }
  
  .student-details {
    font-size: 1rem;
  }
  
  .student-badges {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
  
  .program-badge,
  .group-badge {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
  
  .back-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .student-profile {
    padding: 80px 0 40px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style> 