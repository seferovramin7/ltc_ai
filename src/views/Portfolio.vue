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
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Tələbə Portfolioları</h1>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-content">
          <h2 class="section-title">Portfolioları Filtrləyin</h2>
          <div class="filters-grid">
            <div class="filter-group">
              <label for="program-filter">Proqram:</label>
              <select id="program-filter" v-model="selectedProgram" @change="onProgramChange">
                <option value="">Bütün Proqramlar</option>
                <option 
                  v-for="(program, programId) in portfolioData.programs" 
                  :key="programId" 
                  :value="programId"
                >
                  {{ program.name }}
                </option>
              </select>
            </div>
            
            <div class="filter-group" v-if="availableGroups.length > 0">
              <label for="group-filter">Qrup:</label>
              <select id="group-filter" v-model="selectedGroup">
                <option value="">Bütün Qruplar</option>
                <option 
                  v-for="group in availableGroups" 
                  :key="group.id" 
                  :value="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
            </div>
            

          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Content -->
    <section class="portfolio-content">
      <div class="container">
        <div v-if="!selectedProgram || !selectedGroup" class="selection-required">
          <div class="selection-message">
            <h3>Portfolioları görmək üçün proqram və qrup seçin</h3>
            <p>Yuxarıdakı filterlərdən proqram və qrup seçdikdən sonra tələbə portfolioları görünəcək.</p>
          </div>
        </div>
        
        <div v-else-if="filteredStudents.length === 0" class="no-results">
          <h3>Heç bir nəticə tapılmadı</h3>
          <p>Seçilmiş proqram və qrupda hələ portfolio əlavə edilməyib.</p>
        </div>
        
        <div v-else>
          <div v-for="(programData, programId) in groupedStudents" :key="programId" class="program-section">
            <div v-for="(groupData, groupId) in programData.groups" :key="groupId" class="group-section">
              <h3 class="group-title">{{ groupData.name }} - {{ programData.name }}</h3>
              <div class="students-grid">
                <div 
                  v-for="student in groupData.students"
                  :key="student.id"
                  class="student-preview-card"
                  @click="goToStudentProfile(student.id)"
                >
                  <div class="student-info">
                    <h4 class="student-name">{{ student.name }} {{ student.surname }}</h4>
                    <p class="student-details">{{ student.age }} yaş • {{ student.profession }}</p>
                    <p class="project-count">{{ student.projects.length }} layihə</p>
                    <div class="view-portfolio-btn">
                      <span>Portfolioya bax →</span>
                    </div>
                  </div>
                </div>
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
import { portfolioData, getAllStudents, getAllProjects } from '../data/portfolios.js'
import StudentCard from '../components/portfolio/StudentCard.vue'

export default {
  name: 'Portfolio',
  components: {
    StudentCard
  },
  data() {
    return {
      portfolioData,
      selectedProgram: '',
      selectedGroup: '',
      allStudents: [],
      allProjects: []
    }
  },
  computed: {
    availableGroups() {
      if (!this.selectedProgram) return []
      
      const program = this.portfolioData.programs[this.selectedProgram]
      if (!program || !program.groups) return []
      
      return Object.keys(program.groups).map(groupId => ({
        id: groupId,
        name: program.groups[groupId].name
      }))
    },
    

    
    filteredStudents() {
      // Don't show any students unless both program and group are selected
      if (!this.selectedProgram || !this.selectedGroup) {
        return []
      }
      
      return this.allStudents.filter(student => {
        // Program filter (required)
        if (student.programId !== this.selectedProgram) {
          return false
        }
        
        // Group filter (required)
        if (student.groupId !== this.selectedGroup) {
          return false
        }
        
        return true
      })
    },
    
    groupedStudents() {
      const grouped = {}
      
      this.filteredStudents.forEach(student => {
        const programId = student.programId
        const groupId = student.groupId
        
        if (!grouped[programId]) {
          grouped[programId] = {
            name: this.portfolioData.programs[programId].name,
            description: this.portfolioData.programs[programId].description,
            groups: {}
          }
        }
        
        if (!grouped[programId].groups[groupId]) {
          grouped[programId].groups[groupId] = {
            name: this.portfolioData.programs[programId].groups[groupId].name,
            students: []
          }
        }
        
        grouped[programId].groups[groupId].students.push(student)
      })
      
      return grouped
    }
  },
  methods: {
    onProgramChange() {
      this.selectedGroup = ''
    },
    
    loadData() {
      this.allStudents = getAllStudents()
      this.allProjects = getAllProjects()
    },
    

    
    goToStudentProfile(studentId) {
      this.$router.push(`/portfolio/${studentId}`)
    }
  },
  mounted() {
    this.loadData()
    
    // Set page title and meta tags
    document.title = 'Tələbə Portfolioları - LTC Lab AI Kursları | Bakı'
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'LTC Lab tələbələrinin real AI layihələri və portfolioları. Suni intellekt kurslarımızda hazırlanan layihələri kəşf edin. AI proqramlaşdırma və maşın öyrənməsi nümunələri.')
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'tələbə portfolioları, AI layihələri, suni intellekt layihələri, student projects, machine learning projects, Java projects, Python AI projects, LTC Lab students, AI programming portfolio')
    }
  }
}
</script>

<style scoped>
/* Portfolio specific styles */



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
  margin: 0;
  color: #1a202c;
}

/* Filters Section */
.filters-section {
  padding: 60px 0;
  background: #f8fafc;
}

.filters-content {
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 3rem;
  text-align: center;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #2d3748;
  text-align: left;
}

.filter-group select {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #cb2360;
}

/* Portfolio Content */
.portfolio-content {
  padding: 60px 0;
  min-height: 400px;
}

.selection-required {
  text-align: center;
  padding: 4rem 0;
}

.selection-message h3 {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.selection-message p {
  color: #4a5568;
  font-size: 1rem;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: #718096;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.program-section {
  margin-bottom: 4rem;
}

.program-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
  text-align: center;
}

.program-description {
  font-size: 1.1rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.group-section {
  margin-bottom: 3rem;
}

.group-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  color: white;
  border-radius: 8px;
}

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.student-preview-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  min-height: 150px;
  display: flex;
  align-items: center;
}

.student-preview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #cb2360;
}

.student-preview-card .student-info {
  padding: 2rem;
  text-align: center;
  width: 100%;
}

.student-preview-card .student-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.student-preview-card .student-details {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
}

.student-preview-card .project-count {
  font-size: 0.9rem;
  color: #cb2360;
  font-weight: 500;
  margin: 0 0 1rem 0;
}

.view-portfolio-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.student-preview-card:hover .view-portfolio-btn {
  background: linear-gradient(135deg, #9f1c54, #7a1640);
  transform: translateY(-1px);
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
    padding: 80px 0 30px;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
  }
  
  .student-preview-card {
    min-height: 120px;
  }
  
  .student-preview-card .student-info {
    padding: 1.5rem;
  }
  
  .student-preview-card .student-name {
    font-size: 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
  
  .nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 70px 0 25px;
  }
  
  .hero-title {
    font-size: 1.3rem;
  }
  
  .filters-section {
    padding: 30px 0;
  }
  
  .portfolio-content {
    padding: 40px 0;
  }
  
  .students-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .student-preview-card .student-info {
    padding: 0.75rem 1rem;
  }
  
  .student-preview-card .student-name {
    font-size: 0.95rem;
  }
  
  .student-preview-card .student-details {
    font-size: 0.8rem;
  }
}

/* Text Selection Fix */
::selection {
  background: rgba(203, 35, 96, 0.3);
  color: #1a202c !important;
}

::-moz-selection {
  background: rgba(203, 35, 96, 0.3);
  color: #1a202c !important;
}

/* Ensure text is selectable */
* {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

/* Prevent selection on buttons and interactive elements */
button, .nav-link, .course-button, .tag {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style> 