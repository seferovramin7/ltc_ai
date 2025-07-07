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

    <!-- Hero Section -->
    <section class="hero" v-if="student">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ student.name }} {{ student.surname }}</h1>
        </div>
      </div>
    </section>

    <!-- Student Info Section -->
    <section class="student-info-section" v-if="student">
      <div class="container">
        <div class="student-info-content">
          <div class="back-navigation">
            <button @click="goBack" class="back-btn">
              ← Portfoliolara qayıt
            </button>
          </div>
          <div class="student-details-card">
            <p class="student-details">{{ student.age }} yaş • {{ student.profession }}</p>
            <div class="student-badges">
              <span class="program-badge">{{ student.programName }}</span>
              <span class="group-badge">{{ student.groupName }}</span>
            </div>
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
          <p>Yüklənir...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else class="error">
      <div class="container">
        <div class="error-content">
          <h2>Tələbə tapılmadı</h2>
          <p>Axtardığınız tələbə portfoliosu mövcud deyil.</p>
          <router-link to="/portfolio" class="back-link">Portfoliolara qayıt</router-link>
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
import { getStudentById } from '../data/portfolios.js'
import ProjectCard from '../components/portfolio/ProjectCard.vue'

export default {
  name: 'StudentProfile',
  components: {
    ProjectCard
  },
  data() {
    return {
      student: null,
      loading: true
    }
  },
  methods: {
    loadStudent() {
      const studentId = this.$route.params.id
      this.student = getStudentById(studentId)
      this.loading = false
      
      if (this.student) {
        // Set page title
        document.title = `${this.student.name} ${this.student.surname} - Portfolio | LTC Lab`
      }
    },
    

    
    goBack() {
      this.$router.push('/portfolio')
    }
  },
  mounted() {
    this.loadStudent()
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
  background: white;
  color: #1a202c;
  padding: 80px 0 40px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #1a202c;
}

/* Student Info Section */
.student-info-section {
  padding: 60px 0;
  background: #f8fafc;
}

.student-info-content {
  text-align: center;
}

.student-details-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  max-width: 600px;
  margin: 2rem auto 0;
}

.student-details {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.student-badges {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.student-badges .program-badge, .student-badges .group-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.student-badges .program-badge {
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  color: white;
}

.student-badges .group-badge {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
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

.error-content h2 {
  font-size: 1.8rem;
  color: #1a202c;
  margin-bottom: 1rem;
}

.error-content p {
  color: #64748b;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #cb2360;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.back-link:hover {
  background: #a91c4d;
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
    padding: 60px 0 30px;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .student-info-section {
    padding: 40px 0;
  }
  
  .student-details-card {
    padding: 1.5rem;
    margin: 1.5rem auto 0;
  }
  
  .student-badges {
    flex-direction: column;
    align-items: center;
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
    padding: 50px 0 25px;
  }
  
  .hero-title {
    font-size: 1.3rem;
  }
  
  .student-info-section {
    padding: 30px 0;
  }
  
  .student-details-card {
    padding: 1rem;
    margin: 1rem auto 0;
  }
  
  .student-profile {
    padding: 100px 0 40px;
  }
  
  .student-name {
    font-size: 1.3rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style> 