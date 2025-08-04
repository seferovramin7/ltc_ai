c<template>
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
      <router-link to="/" class="mobile-nav-link" @click="closeMobileNav">Ana Səhifə</router-link>
      <router-link to="/portfolio" class="mobile-nav-link" @click="closeMobileNav">Portfoliolar</router-link>
      <a href="https://www.ltclab.edu.az/about" class="mobile-nav-link" @click="closeMobileNav">Haqqında</a>
      <a href="https://www.ltclab.edu.az/elaqe" class="mobile-nav-link" @click="closeMobileNav">Əlaqə</a>
    </div>

    <!-- Course Hero -->
    <section class="course-hero">
      <div class="container">
        <div class="course-hero-content">
          <div class="course-icon-large">
            <span class="icon-java">☕</span>
          </div>
          <h1 class="course-hero-title">Süni intellekt Əsaslı Java Backend</h1>
                      <p class="course-hero-description">
              Core Java Proqramlaşdırma əsasları, Məlumat Strukturları və Alqoritmlər, Sistem Dizaynını master edin. 
              Spring Boot, Mikroservislər, AI Agent İnkişafı və müəssisə səviyyəli backend tətbiqləri yaradın.
            </p>
          <div class="course-meta">
                      <div class="meta-item">
            <span class="meta-label">Müddət:</span>
            <span class="meta-value">7 ay</span>
          </div>
            <div class="meta-item">
              <span class="meta-label">Səviyyə:</span>
              <span class="meta-value">Orta-İrəli</span>
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
          <!-- Section Filter -->
          <div class="section-filter">
            <h3>Kurikulum Bölmələri</h3>
            <div class="section-filter-buttons">
              <button 
                class="section-filter-btn"
                :class="{ active: selectedSection === 'all' }"
                @click="selectedSection = 'all'"
              >
                Hamısı
              </button>
              <button 
                class="section-filter-btn core-java"
                :class="{ active: selectedSection === 'core-java' }"
                @click="selectedSection = 'core-java'"
              >
                Core Java Proqramlaşdırma
              </button>
              <button 
                class="section-filter-btn dsa"
                :class="{ active: selectedSection === 'dsa' }"
                @click="selectedSection = 'dsa'"
              >
                Məlumat Strukturları və Alqoritmlər
              </button>
              <button 
                class="section-filter-btn system-design"
                :class="{ active: selectedSection === 'system-design' }"
                @click="selectedSection = 'system-design'"
              >
                Sistem Dizaynı
              </button>
            </div>
          </div>

          <!-- Core Java Programming Section -->
          <div v-if="selectedSection === 'all' || selectedSection === 'core-java'" class="section-container">
            <div class="section-header">
              <h2 class="section-title">Core Java Proqramlaşdırma</h2>
              <span class="section-count">6 Modul</span>
            </div>
            <div class="syllabus-grid">
              <div 
                v-for="module in coreJavaModules" 
                :key="module.id"
                class="syllabus-card core-java"
              >
                <div class="syllabus-header">
                  <h3>{{ module.title }}</h3>
                  <span class="module-number">{{ module.id }}</span>
                </div>
                <div class="syllabus-content">
                  <ul class="topic-list">
                    <li v-for="topic in module.topics" :key="topic">{{ topic }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Structures & Algorithms Section -->
          <div v-if="selectedSection === 'all' || selectedSection === 'dsa'" class="section-container">
            <div class="section-header">
              <h2 class="section-title">Məlumat Strukturları və Alqoritmlər</h2>
              <span class="section-count">2 Modul</span>
            </div>
            <div class="syllabus-grid">
              <div 
                v-for="module in dsaModules" 
                :key="module.id"
                class="syllabus-card dsa"
              >
                <div class="syllabus-header">
                  <h3>{{ module.title }}</h3>
                  <span class="module-number">{{ module.id }}</span>
                </div>
                <div class="syllabus-content">
                  <ul class="topic-list">
                    <li v-for="topic in module.topics" :key="topic">{{ topic }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- System Design Section -->
          <div v-if="selectedSection === 'all' || selectedSection === 'system-design'" class="section-container">
            <div class="section-header">
              <h2 class="section-title">Sistem Dizaynı</h2>
              <span class="section-count">3 Modul</span>
            </div>
            <div class="syllabus-grid">
              <div 
                v-for="module in systemDesignModules" 
                :key="module.id"
                class="syllabus-card system-design"
              >
                <div class="syllabus-header">
                  <h3>{{ module.title }}</h3>
                  <span class="module-number">{{ module.id }}</span>
                </div>
                <div class="syllabus-content">
                  <ul class="topic-list">
                    <li v-for="topic in module.topics" :key="topic">{{ topic }}</li>
                  </ul>
                </div>
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
                v-for="month in 7" 
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
  mounted() {
    // Set page title and meta tags
    document.title = 'AI Based Software Engineering - Core Java Programming | LTC Lab';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master AI Based Software Engineering with Core Java Programming, Data Structures & Algorithms, System Design. Learn Spring Boot, Microservices, AI Agent Development. 7-month comprehensive course at LTC Lab Azerbaijan.');
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'AI Based Software Engineering, Core Java Programming, Data Structures Algorithms, System Design, Spring Boot, Microservices, AI Agent Development, Backend Development, Java Course Azerbaijan, LTC Lab, Software Engineering Course, Enterprise Applications');
    }

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileNavOpen) {
        this.closeMobileNav();
      }
    });
  },
  data() {
    return {
      activeTab: 'syllabus',
      selectedMonth: 'all',
      selectedSection: 'all',
      isMobileNavOpen: false,
      syllabus: [
        {
          id: 1,
          section: 'Core Java Programming',
          title: 'Java Fundamentals & OOP',
          topics: [
            'Git & Version Control, IntelliJ IDEA',
            'Variables, Data Types, Operators',
            'Control Flow (if-else, switch), Loops',
            'Arrays, Classes and Objects',
            'Object-Oriented Programming, Encapsulation',
            'Inheritance, Abstraction, Interfaces, Polymorphism'
          ]
        },
        {
          id: 2,
          section: 'Core Java Programming',
          title: 'Advanced Java Concepts',
          topics: [
            'Exception Handling',
            'Java Memory Allocation, Heap and Stack',
            'Garbage Collection in Java',
            'Input/Output Operations, File Handling',
            'Generics',
            'Collections Framework: Lists, Sets, Maps'
          ]
        },
        {
          id: 3,
          section: 'Core Java Programming',
          title: 'Concurrency & Modern Java',
          topics: [
            'Multithreading: Process vs Thread, Lifecycle',
            'Thread Synchronization & Control',
            'String, StringBuilder, StringBuffer',
            'Enum, Wrapper Classes, Autoboxing',
            'Functional Programming with Lambda Expressions',
            'Java Stream API & Design Patterns'
          ]
        },
        {
          id: 4,
          section: 'Core Java Programming',
          title: 'Spring Framework & REST APIs',
          topics: [
            'Spring Core: IoC, Dependency Injection',
            'Spring Bean Management & Controllers',
            'REST API Design & Best Practices',
            'Validation, Exception Handling, Swagger',
            'SQL, Joins',
            'Data Persistence with JPA & Hibernate'
          ]
        },
        {
          id: 5,
          section: 'Core Java Programming',
          title: 'Microservices & Security',
          topics: [
            'API Gateway & Rate Limiting',
            'Spring Feign Client',
            'Spring Security OAuth & JWT',
            'Redis Caching & Session Management',
            'Docker Basics',
            'Microservices Design Patterns'
          ]
        },
        {
          id: 6,
          section: 'Core Java Programming',
          title: 'Advanced Topics & Testing',
          topics: [
            'Unit Testing (JUnit, Mockito, TestContainers)',
            'Integration Testing (Spring Test, WireMock)',
            'GraphQL, gRPC, WebSocket',
            'Apache Kafka, Circuit Breakers',
            'Database Optimization & AWS Basics',
            'AI Agent, Vector DB, RAG, Spring AI'
          ]
        },
        {
          id: 7,
          section: 'Data Structures & Algorithms',
          title: 'DSA Fundamentals',
          topics: [
            'Big-O Notation, Arrays & Hashing',
            'Two Pointers Technique',
            'LeetCode Problems (Easy Level)',
            'Arrays & Strings Problem Solving'
          ]
        },
        {
          id: 8,
          section: 'Data Structures & Algorithms',
          title: 'Advanced Data Structures',
          topics: [
            'Linked Lists, Stacks, Queues',
            'Binary Search, Sliding Window',
            'Trees (BST, DFS, BFS)',
            '1-D Dynamic Programming',
            'LeetCode Problems (Medium Level)'
          ]
        },
        {
          id: 9,
          section: 'System Design',
          title: 'System Design Fundamentals',
          topics: [
            'System Architecture & Components',
            'Databases & Storage Solutions',
            'Caching & In-Memory Stores',
            'Distributed Systems Concepts',
            'Performance & Optimization',
            'Scalability Strategies'
          ]
        },
        {
          id: 10,
          section: 'System Design',
          title: 'AI System Design',
          topics: [
            'AI Agent Architecture',
            'Perception, Decision-making, Action',
            'Learning & Adaptation Systems',
            'Real-time Data Handling',
            'Knowledge Representation',
            'Ethics & Transparency in AI'
          ]
        },
        {
          id: 11,
          section: 'System Design',
          title: 'Large Scale System Design',
          topics: [
            'YouTube System Design',
            'Video Streaming Architecture (CDN)',
            'WhatsApp System Design',
            'Real-time Messaging Systems',
            'Store-and-Forward Architecture',
            'User Engagement Metrics'
          ]
        }
      ],
      monthlyProjects: [
        {
          id: 1,
          month: 1,
          title: 'Şəxsi Maliyyə İzləyicisi',
          description: 'Java ilə şəxsi maliyyə idarəetmə sistemi. OOP prinsipləri və Collections Framework istifadə edilir.',
          technologies: ['Java', 'Collections', 'File I/O'],
          difficulty: 2
        },
        {
          id: 2,
          month: 1,
          title: 'Kitabxana İdarəetmə Sistemi',
          description: 'Kitabxana idarəetmə sistemi. Inheritance, Polymorphism və Exception Handling.',
          technologies: ['Java', 'OOP', 'Exception Handling'],
          difficulty: 3
        },
        {
          id: 3,
          month: 2,
          title: 'RESTful Blog API-si',
          description: 'Spring Boot ilə blog API. CRUD əməliyyatları və JWT authentication.',
          technologies: ['Spring Boot', 'REST API', 'JWT'],
          difficulty: 3
        },
        {
          id: 4,
          month: 2,
          title: 'Tapşırıq İdarəetmə API-si',
          description: 'Tapşırıq idarəetmə sistemi. Spring Security və role-based access control.',
          technologies: ['Spring Boot', 'Spring Security', 'JPA'],
          difficulty: 4
        },
        {
          id: 5,
          month: 3,
          title: 'E-ticarət Verilənlər Bazası Dizaynı',
          description: 'E-ticarət platforması üçün verilənlər bazası dizaynı və optimizasiya.',
          technologies: ['PostgreSQL', 'JPA', 'Database Design'],
          difficulty: 3
        },
        {
          id: 6,
          month: 3,
          title: 'Axtarış Alqoritmləri İmplementasiyası',
          description: 'Müxtəlif axtarış və sıralama alqoritmlərinin implementasiyası.',
          technologies: ['Java', 'Algorithms', 'Data Structures'],
          difficulty: 4
        },
        {
          id: 7,
          month: 4,
          title: 'Mikroservislər E-ticarət Platforması',
          description: 'Microservices arxitekturası ilə e-ticarət platforması.',
          technologies: ['Spring Boot', 'Microservices', 'API Gateway'],
          difficulty: 5
        },
        {
          id: 8,
          month: 4,
          title: 'Hadisə-İdarəli Chat Sistemi',
          description: 'Event-driven arxitektura ilə real-time chat sistemi.',
          technologies: ['Spring Boot', 'WebSocket', 'RabbitMQ'],
          difficulty: 4
        },
        {
          id: 9,
          month: 5,
          title: 'AI-İdarəli Tövsiyə Mühərriki',
          description: 'Machine Learning API-ləri ilə tövsiyə sistemi.',
          technologies: ['Spring Boot', 'ML APIs', 'Redis'],
          difficulty: 5
        },
        {
          id: 10,
          month: 5,
          title: 'Real-vaxt Analitika Paneli',
          description: 'Real-time data processing və analytics dashboard.',
          technologies: ['Spring Boot', 'Kafka', 'WebSocket'],
          difficulty: 4
        },
        {
          id: 11,
          month: 6,
          title: 'Genişlənən Sosial Media API-si',
          description: 'Yüksək yükə davamlı sosial media platforması API-si.',
          technologies: ['Spring Boot', 'Redis', 'PostgreSQL'],
          difficulty: 5
        },
        {
          id: 12,
          month: 6,
          title: 'AI Məzmun Moderasiya Sistemi',
          description: 'AI ilə avtomatik məzmun moderasiya sistemi.',
          technologies: ['Spring Boot', 'AI APIs', 'Microservices'],
          difficulty: 5
        },
        {
          id: 13,
          month: 7,
          title: 'Müəssisə AI Platforması',
          description: 'Tam funksional enterprise AI platforması. Müxtəlif AI xidmətlərini birləşdirən kompleks sistem.',
          technologies: ['Spring Boot', 'Microservices', 'Kubernetes', 'AI/ML APIs'],
          difficulty: 5
        },
        {
          id: 14,
          month: 7,
          title: 'AI-İdarəli DevOps Boru Xətti',
          description: 'AI ilə avtomatlaşdırılmış CI/CD pipeline və deployment optimization sistemi.',
          technologies: ['Spring Boot', 'Jenkins', 'Docker', 'AI Analytics'],
          difficulty: 5
        }
      ],
      finalProjects: [
        {
          id: 1,
          title: 'AI-İdarəli E-ticarət Platforması',
          type: 'Tam-Yığın Tətbiqi',
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
          title: 'Ağıllı Səhiyyə İdarəetmə Sistemi',
          type: 'Müəssisə Tətbiqi',
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
          title: 'Ağıllı Maliyyə Ticarət Platforması',
          type: 'Real-vaxt Sistemi',
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
    },
    coreJavaModules() {
      return this.syllabus.filter(module => module.section === 'Core Java Programming');
    },
    dsaModules() {
      return this.syllabus.filter(module => module.section === 'Data Structures & Algorithms');
    },
    systemDesignModules() {
      return this.syllabus.filter(module => module.section === 'System Design');
    }
  },
  methods: {
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
  },
  beforeUnmount() {
    // Clean up body overflow style
    document.body.style.overflow = '';
  }
}
</script> 