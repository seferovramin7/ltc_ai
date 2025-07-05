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
            <span class="icon-python">🐍</span>
          </div>
          <h1 class="course-hero-title">Suni intellekt mühəndisliyi</h1>
          <p class="course-hero-description">
            Python əsasında AI və Machine Learning həlləri yaradın. NumPy, Pandas, TensorFlow və MLOps 
            texnologiyalarını öyrənərək peşəkar AI mühəndisi olun.
          </p>
          <div class="course-meta">
            <div class="meta-item">
              <span class="meta-label">Müddət:</span>
              <span class="meta-value">4 ay</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Səviyyə:</span>
              <span class="meta-value">Başlanğıc-Orta</span>
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
                v-for="month in 4" 
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
              Kursun sonunda tələbələr aşağıdakı layihələrdən birini seçərək tam funksional AI həlli hazırlayırlar.
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
  name: 'AIEngineering',
  data() {
    return {
      activeTab: 'syllabus',
      selectedMonth: 'all',
      syllabus: [
        {
          id: 1,
          month: 1,
          title: 'Python & Data Science Fundamentals',
          topics: [
            'Python syntax və əsas konseptlər',
            'NumPy və Pandas əsasları',
            'Data manipulation və cleaning',
            'Matplotlib və Seaborn ilə vizualizasiya',
            'Jupyter Notebook və IDE-lər',
            'Git və version control'
          ]
        },
        {
          id: 2,
          month: 2,
          title: 'Machine Learning Foundations',
          topics: [
            'ML algoritmlərinin əsasları',
            'Supervised və Unsupervised Learning',
            'Scikit-learn library',
            'Model evaluation və validation',
            'Feature engineering',
            'Cross-validation və hyperparameter tuning'
          ]
        },
        {
          id: 3,
          month: 3,
          title: 'Deep Learning & Neural Networks',
          topics: [
            'Neural networks əsasları',
            'TensorFlow və Keras',
            'Convolutional Neural Networks (CNN)',
            'Recurrent Neural Networks (RNN)',
            'Transfer learning',
            'Model optimization'
          ]
        },
        {
          id: 4,
          month: 4,
          title: 'Advanced AI & MLOps',
          topics: [
            'Natural Language Processing (NLP)',
            'Computer Vision',
            'MLOps və model deployment',
            'Docker və containerization',
            'Cloud platforms (AWS/Azure)',
            'Final project development'
          ]
        }
      ],
      monthlyProjects: [
        {
          id: 1,
          month: 1,
          title: 'Sales Data Analysis',
          description: 'Pandas və NumPy istifadə edərək satış məlumatlarının analizi və vizualizasiyası.',
          technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
          difficulty: 2
        },
        {
          id: 2,
          month: 1,
          title: 'Weather Data Visualization',
          description: 'Hava məlumatlarının toplanması və interaktiv vizualizasiya dashboard-u.',
          technologies: ['Python', 'Pandas', 'Seaborn', 'Plotly'],
          difficulty: 3
        },
        {
          id: 3,
          month: 2,
          title: 'House Price Prediction',
          description: 'Ev qiymətlərinin proqnozlaşdırılması üçün ML modeli.',
          technologies: ['Python', 'Scikit-learn', 'Pandas', 'Regression'],
          difficulty: 3
        },
        {
          id: 4,
          month: 2,
          title: 'Customer Segmentation',
          description: 'K-means clustering ilə müştəri seqmentasiyası.',
          technologies: ['Python', 'Scikit-learn', 'Clustering', 'Visualization'],
          difficulty: 4
        },
        {
          id: 5,
          month: 3,
          title: 'Image Classification CNN',
          description: 'Convolutional Neural Network ilə şəkil klassifikasiyası.',
          technologies: ['Python', 'TensorFlow', 'Keras', 'CNN'],
          difficulty: 4
        },
        {
          id: 6,
          month: 3,
          title: 'Stock Price Prediction RNN',
          description: 'LSTM şəbəkələri ilə səhm qiymətlərinin proqnozlaşdırılması.',
          technologies: ['Python', 'TensorFlow', 'LSTM', 'Time Series'],
          difficulty: 5
        },
        {
          id: 7,
          month: 4,
          title: 'Sentiment Analysis NLP',
          description: 'Mətn məlumatlarının sentiment analizi və təsnifatı.',
          technologies: ['Python', 'NLTK', 'TensorFlow', 'NLP'],
          difficulty: 4
        },
        {
          id: 8,
          month: 4,
          title: 'Object Detection System',
          description: 'Real-time obyekt aşkarlama sistemi.',
          technologies: ['Python', 'OpenCV', 'YOLO', 'Computer Vision'],
          difficulty: 5
        }
      ],
      finalProjects: [
        {
          id: 1,
          title: 'Intelligent Healthcare Assistant',
          type: 'AI-Powered Application',
          description: 'Tibbi şəkillərin analizi və xəstəlik diaqnostikası üçün AI köməkçisi.',
          features: [
            'Medical image analysis',
            'Symptom-based diagnosis',
            'Drug interaction checker',
            'Health monitoring dashboard',
            'Personalized treatment recommendations'
          ],
          technologies: ['Python', 'TensorFlow', 'OpenCV', 'NLP', 'Flask', 'MongoDB'],
          duration: '3 həftə'
        },
        {
          id: 2,
          title: 'Smart Trading Bot',
          type: 'Financial AI System',
          description: 'Cryptocurrency və forex ticarəti üçün AI-əsaslı avtomatik ticarət botu.',
          features: [
            'Real-time market data analysis',
            'Predictive price modeling',
            'Risk management algorithms',
            'Portfolio optimization',
            'Automated trading execution'
          ],
          technologies: ['Python', 'TensorFlow', 'Pandas', 'API Integration', 'Time Series', 'FastAPI'],
          duration: '3 həftə'
        },
        {
          id: 3,
          title: 'Multilingual Content Generator',
          type: 'NLP Application',
          description: 'Çoxdilli məzmun yaradıcısı və tərcümə sistemi.',
          features: [
            'Text generation in multiple languages',
            'Real-time translation',
            'Content summarization',
            'Sentiment analysis',
            'SEO optimization suggestions'
          ],
          technologies: ['Python', 'Transformers', 'BERT', 'GPT', 'FastAPI', 'React'],
          duration: '3 həftə'
        },
        {
          id: 4,
          title: 'Computer Vision Security System',
          type: 'IoT AI Solution',
          description: 'Ağıllı təhlükəsizlik sistemi real-time obyekt və üz tanıma ilə.',
          features: [
            'Real-time face recognition',
            'Anomaly detection',
            'Motion tracking',
            'Alert system integration',
            'Mobile app dashboard'
          ],
          technologies: ['Python', 'OpenCV', 'TensorFlow', 'Raspberry Pi', 'Flask', 'SQLite'],
          duration: '3 həftə'
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