<template>
  <div class="course-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <img src="/lts_logo.29f6d82c.svg" alt="LTC Lab Logo" class="logo">
          </router-link>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">Ana Səhifə</router-link>
          <a href="https://www.ltclab.edu.az/about" class="nav-link">Haqqında</a>
          <a href="https://www.ltclab.edu.az/elaqe" class="nav-link">Əlaqə</a>
        </nav>
      </div>
    </header>

    <!-- Course Hero -->
    <section class="course-hero">
      <div class="container">
        <div class="course-hero-content">
          <div class="course-icon-large">
            <span class="icon-java">☕</span>
          </div>
          <h1 class="course-hero-title">Suni intellekt əsaslı proqramlaşdırma</h1>
          <p class="course-hero-description">
            Java və Spring Framework əsasında müasir AI həlləri yaratmaq üçün backend development öyrənin. 
            Microservices, sistem dizaynı və data strukturları ilə güclü AI tətbiqləri hazırlayın.
          </p>
          <div class="course-meta">
            <div class="meta-item">
              <span class="meta-label">Müddət:</span>
              <span class="meta-value">6 ay</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Səviyyə:</span>
              <span class="meta-value">Orta-İrəli</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Format:</span>
              <span class="meta-value">Hibrid</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Navigation -->
    <nav class="course-nav">
      <div class="container">
        <div class="nav-tabs">
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'syllabus' }"
            @click="activeTab = 'syllabus'"
          >
            Kurikulum
          </button>
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'projects' }"
            @click="activeTab = 'projects'"
          >
            Layihələr
          </button>
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'final' }"
            @click="activeTab = 'final'"
          >
            Final Layihələri
          </button>
        </div>
      </div>
    </nav>

    <!-- Course Content -->
    <section class="course-content">
      <div class="container">
        
        <!-- Syllabus Tab -->
        <div v-if="activeTab === 'syllabus'" class="tab-content">
          <div class="syllabus-grid">
            <div 
              v-for="month in syllabus" 
              :key="month.id"
              class="syllabus-card"
            >
              <div class="syllabus-header">
                <h3>{{ month.title }}</h3>
                <span class="month-badge">{{ month.month }}. ay</span>
              </div>
              <div class="syllabus-content">
                <ul class="topic-list">
                  <li v-for="topic in month.topics" :key="topic">{{ topic }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Tab -->
        <div v-if="activeTab === 'projects'" class="tab-content">
          <div class="projects-filter">
            <h3>Aylıq Layihələr</h3>
            <div class="filter-buttons">
              <button 
                class="filter-btn"
                :class="{ active: selectedMonth === 'all' }"
                @click="selectedMonth = 'all'"
              >
                Hamısı
              </button>
              <button 
                v-for="month in 6" 
                :key="month"
                class="filter-btn"
                :class="{ active: selectedMonth === month }"
                @click="selectedMonth = month"
              >
                {{ month }}. ay
              </button>
            </div>
          </div>
          
          <div class="projects-grid">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="project-card"
            >
              <div class="project-header">
                <h4>{{ project.title }}</h4>
                <span class="project-month">{{ project.month }}. ay</span>
              </div>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-difficulty">
                <span class="difficulty-label">Çətinlik:</span>
                <div class="difficulty-stars">
                  <span 
                    v-for="star in 5" 
                    :key="star"
                    class="star"
                    :class="{ filled: star <= project.difficulty }"
                  >
                    ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Final Projects Tab -->
        <div v-if="activeTab === 'final'" class="tab-content">
          <div class="final-projects">
            <h3>Final Layihələri</h3>
            <p class="final-description">
              Kursun sonunda tələbələr aşağıdakı layihələrdən birini seçərək tam funksional AI tətbiqi hazırlayırlar.
            </p>
            
            <div class="final-projects-grid">
              <div 
                v-for="project in finalProjects" 
                :key="project.id"
                class="final-project-card"
              >
                <div class="final-project-header">
                  <h4>{{ project.title }}</h4>
                  <span class="project-type">{{ project.type }}</span>
                </div>
                <p class="final-project-description">{{ project.description }}</p>
                <div class="final-project-features">
                  <h5>Əsas Xüsusiyyətlər:</h5>
                  <ul>
                    <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
                  </ul>
                </div>
                <div class="final-project-tech">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="project-duration">
                  <span class="duration-label">Müddət:</span>
                  <span class="duration-value">{{ project.duration }}</span>
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
              LTC Lab - Azərbaycanın aparıcı texnologiya təhsil mərkəzi. 
              Gələcəyin rəqəmsal dünyasına hazırlaşın.
            </p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Kurslar</h4>
              <router-link to="/ai-programming">AI Proqramlaşdırma</router-link>
              <router-link to="/ai-engineering">AI Mühəndisliyi</router-link>
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
  name: 'AIProgramming',
  data() {
    return {
      activeTab: 'syllabus',
      selectedMonth: 'all',
      syllabus: [
        {
          id: 1,
          month: 1,
          title: 'Java Fundamentals & OOP',
          topics: [
            'Java syntax və əsas konseptlər',
            'Object-Oriented Programming',
            'Collections Framework',
            'Exception Handling',
            'Lambda Expressions',
            'Stream API'
          ]
        },
        {
          id: 2,
          month: 2,
          title: 'Spring Framework Basics',
          topics: [
            'Spring Core və Dependency Injection',
            'Spring Boot əsasları',
            'RESTful Web Services',
            'Data Access (JPA/Hibernate)',
            'Spring Security əsasları',
            'Testing with Spring'
          ]
        },
        {
          id: 3,
          month: 3,
          title: 'Database & Data Structures',
          topics: [
            'SQL və NoSQL verilənlər bazaları',
            'Database Design Patterns',
            'Data Structures & Algorithms',
            'Big O Notation',
            'Searching & Sorting Algorithms',
            'Tree və Graph Algorithms'
          ]
        },
        {
          id: 4,
          month: 4,
          title: 'Microservices Architecture',
          topics: [
            'Microservices Design Patterns',
            'Service Discovery',
            'API Gateway',
            'Circuit Breaker Pattern',
            'Event-Driven Architecture',
            'Message Queues (RabbitMQ/Kafka)'
          ]
        },
        {
          id: 5,
          month: 5,
          title: 'System Design & AI Integration',
          topics: [
            'System Design Principles',
            'Scalability Patterns',
            'AI/ML API Integration',
            'Machine Learning Pipelines',
            'Real-time Data Processing',
            'Performance Optimization'
          ]
        },
        {
          id: 6,
          month: 6,
          title: 'Advanced Topics & Final Project',
          topics: [
            'Cloud Deployment (AWS/Azure)',
            'Docker & Kubernetes',
            'CI/CD Pipelines',
            'Monitoring & Logging',
            'Final Project Development',
            'Code Review & Best Practices'
          ]
        }
      ],
      monthlyProjects: [
        {
          id: 1,
          month: 1,
          title: 'Personal Finance Tracker',
          description: 'Java ilə şəxsi maliyyə idarəetmə sistemi. OOP prinsipləri və Collections Framework istifadə edilir.',
          technologies: ['Java', 'Collections', 'File I/O'],
          difficulty: 2
        },
        {
          id: 2,
          month: 1,
          title: 'Library Management System',
          description: 'Kitabxana idarəetmə sistemi. Inheritance, Polymorphism və Exception Handling.',
          technologies: ['Java', 'OOP', 'Exception Handling'],
          difficulty: 3
        },
        {
          id: 3,
          month: 2,
          title: 'RESTful Blog API',
          description: 'Spring Boot ilə blog API. CRUD əməliyyatları və JWT authentication.',
          technologies: ['Spring Boot', 'REST API', 'JWT'],
          difficulty: 3
        },
        {
          id: 4,
          month: 2,
          title: 'Task Management API',
          description: 'Tapşırıq idarəetmə sistemi. Spring Security və role-based access control.',
          technologies: ['Spring Boot', 'Spring Security', 'JPA'],
          difficulty: 4
        },
        {
          id: 5,
          month: 3,
          title: 'E-commerce Database Design',
          description: 'E-ticarət platforması üçün verilənlər bazası dizaynı və optimizasiya.',
          technologies: ['PostgreSQL', 'JPA', 'Database Design'],
          difficulty: 3
        },
        {
          id: 6,
          month: 3,
          title: 'Search Algorithm Implementation',
          description: 'Müxtəlif axtarış və sıralama alqoritmlərinin implementasiyası.',
          technologies: ['Java', 'Algorithms', 'Data Structures'],
          difficulty: 4
        },
        {
          id: 7,
          month: 4,
          title: 'Microservices E-commerce',
          description: 'Microservices arxitekturası ilə e-ticarət platforması.',
          technologies: ['Spring Boot', 'Microservices', 'API Gateway'],
          difficulty: 5
        },
        {
          id: 8,
          month: 4,
          title: 'Event-Driven Chat System',
          description: 'Event-driven arxitektura ilə real-time chat sistemi.',
          technologies: ['Spring Boot', 'WebSocket', 'RabbitMQ'],
          difficulty: 4
        },
        {
          id: 9,
          month: 5,
          title: 'AI-Powered Recommendation Engine',
          description: 'Machine Learning API-ləri ilə tövsiyə sistemi.',
          technologies: ['Spring Boot', 'ML APIs', 'Redis'],
          difficulty: 5
        },
        {
          id: 10,
          month: 5,
          title: 'Real-time Analytics Dashboard',
          description: 'Real-time data processing və analytics dashboard.',
          technologies: ['Spring Boot', 'Kafka', 'WebSocket'],
          difficulty: 4
        },
        {
          id: 11,
          month: 6,
          title: 'Scalable Social Media API',
          description: 'Yüksək yükə davamlı sosial media platforması API-si.',
          technologies: ['Spring Boot', 'Redis', 'PostgreSQL'],
          difficulty: 5
        },
        {
          id: 12,
          month: 6,
          title: 'AI Content Moderation System',
          description: 'AI ilə avtomatik məzmun moderasiya sistemi.',
          technologies: ['Spring Boot', 'AI APIs', 'Microservices'],
          difficulty: 5
        }
      ],
      finalProjects: [
        {
          id: 1,
          title: 'AI-Powered E-commerce Platform',
          type: 'Full-Stack Application',
          description: 'Süni intellekt texnologiyaları ilə təchiz edilmiş tam funksional e-ticarət platforması.',
          features: [
            'Personalized məhsul tövsiyələri',
            'Real-time inventar idarəetməsi',
            'Fraud detection sistemi',
            'Chatbot müştəri dəstəyi',
            'Predictive analytics dashboard'
          ],
          technologies: ['Spring Boot', 'Microservices', 'AI/ML APIs', 'PostgreSQL', 'Redis', 'Docker'],
          duration: '4 həftə'
        },
        {
          id: 2,
          title: 'Smart Healthcare Management System',
          type: 'Enterprise Application',
          description: 'Tibb müəssisələri üçün AI əsaslı idarəetmə sistemi.',
          features: [
            'Xəstə məlumatlarının AI analizi',
            'Appointment scheduling optimization',
            'Medical image processing',
            'Drug interaction checker',
            'Epidemic prediction models'
          ],
          technologies: ['Spring Boot', 'Spring Security', 'AI APIs', 'MongoDB', 'Kafka', 'Kubernetes'],
          duration: '4 həftə'
        },
        {
          id: 3,
          title: 'Intelligent Financial Trading Platform',
          type: 'Real-time System',
          description: 'AI alqoritmləri ilə avtomatik ticarət platforması.',
          features: [
            'Real-time market data processing',
            'AI-based trading algorithms',
            'Risk management system',
            'Portfolio optimization',
            'Fraud detection və compliance'
          ],
          technologies: ['Spring Boot', 'WebSocket', 'AI/ML', 'Apache Kafka', 'TimescaleDB', 'Docker'],
          duration: '4 həftə'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.selectedMonth === 'all') {
        return this.monthlyProjects;
      }
      return this.monthlyProjects.filter(project => project.month === this.selectedMonth);
    }
  }
}
</script> 