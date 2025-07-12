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
            <span class="icon-python">🐍</span>
          </div>
          <h1 class="course-hero-title">AI Mühəndisliyi - Modern LLM və Agent Sistemləri</h1>
          <p class="course-hero-description">
            Modern AI Engineer olmaq üçün lazım olan hər şey: Python, Machine Learning, LLM-lər, RAG sistemləri, 
            Vector Database-lər, LangChain, Multi-Agent Workflows, Docker, AWS və Production AI deployment.
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
                v-for="month in 3" 
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
              <div class="project-markets" v-if="project.markets">
                <span class="markets-label">Bazar tələbatı:</span>
                <div class="markets-tags">
                  <span 
                    v-for="market in project.markets" 
                    :key="market"
                    class="market-tag"
                    :class="getMarketClass(market)"
                  >
                    {{ formatMarketName(market) }}
                  </span>
                </div>
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
                <div class="final-project-markets" v-if="project.markets">
                  <span class="markets-label">Bazar tələbatı:</span>
                  <div class="markets-tags">
                    <span 
                      v-for="market in project.markets" 
                      :key="market"
                      class="market-tag"
                      :class="getMarketClass(market)"
                    >
                      {{ formatMarketName(market) }}
                    </span>
                  </div>
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
  mounted() {
    // Set page title and meta tags
    document.title = 'AI Engineering - Modern LLM & Agent Systems | LTC Lab';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master modern AI Engineering: LLMs, RAG systems, Vector Databases, LangChain, Multi-Agent Workflows, Docker, AWS deployment. 32-lesson comprehensive AI Engineering course at LTC Lab Azerbaijan.');
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'AI Engineering, LLM, RAG Systems, Vector Database, LangChain, Multi-Agent Workflows, Docker, AWS, MLOps, OpenAI, Gemini, ChromaDB, FastAPI, Ollama, Quantization, AI Agents, Production AI, LTC Lab Azerbaijan, Modern AI Course, Prompt Engineering');
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
      isMobileNavOpen: false,
      syllabus: [
        {
          id: 1,
          month: 1,
          title: 'AI Əsasları və Python',
          topics: [
            'Dərs 1: Müasir AI Engineer: ML Ops-dan Agentic Workflows-a doğru',
            'Dərs 2: Birgə Kodlaşdırma: Git və GitHub-a Yiyələnmək',
            'Dərs 3: Production-a Hazır Python: OOP, Data Structures və Təmiz Kod',
            'Dərs 4: AI üçün Məlumatların Hazırlanması: NumPy və Pandas',
            'Dərs 5: ML Əsasları: Supervised və Unsupervised Learning',
            'Dərs 6: Scikit-learn ilə Proqnozlaşdırıcı Modellərin Qurulması',
            'Dərs 7: Neyron Şəbəkələri: Neyronlardan Gradient Descent-ə',
            'Dərs 8: Praktiki Deep Learning: PyTorch-da İlk Neyron Şəbəkəsi'
          ]
        },
        {
          id: 2,
          month: 2,
          title: 'LLM Ekosistemi və Əsas Tətbiq sahələri',
          topics: [
            'Dərs 9: LLM-lər Necə İşləyir: Transformer Arxitekturası və Tokenization',
            'Dərs 10: Prompt Engineering: Zero-Shot, Few-Shot və Chain-of-Thought',
            'Dərs 11: LLM API-lərinin İnteqrasiyası: OpenAI/Gemini',
            'Dərs 12: Semantik Axtarış və Vector DB: AI-ın Yaddaşı',
            'Dərs 13: Praktiki Vector Search: ChromaDB ilə Tətbiq',
            'Dərs 14: LangChain ilə LLM Chain-ləri: LCEL Əsasları',
            'Dərs 15: RAG Sisteminin Dizaynı: Sənədlərin Hazırlanması',
            'Dərs 16: RAG Sisteminin Qurulması: Retrieval və Generation'
          ]
        },
        {
          id: 3,
          month: 3,
          title: 'AI Servislərinin Qurulması və Deployment',
          topics: [
            'Dərs 17: AI Tətbiqlərinin Docker ilə Paketlənməsi',
            'Dərs 18: Praktiki Docker: FastAPI və LangChain Konteynerləşdirilməsi',
            'Dərs 19: Production API-ləri: FastAPI ilə Backend-lər',
            'Dərs 20: AI Modellərinin Serving-i: LangChain FastAPI Endpoint-i',
            'Dərs 21: Cloud-a Giriş: AWS Ekosistemi',
            'Dərs 22: Əsas AWS Servisləri: IAM, S3 və EC2',
            'Dərs 23: Lokaldan Qlobala: Docker AWS EC2-də Deployment',
            'Dərs 24: Geniş Miqyaslı ML: AWS SageMaker'
          ]
        },
        {
          id: 4,
          month: 4,
          title: 'Qabaqcıl AI Sistemləri və Production',
          topics: [
            'Dərs 25: Avtomatlaşdırmanın Gələcəyi: Avtonom AI Agent-ləri',
            'Dərs 26: MLOps Həyat Dövrü: MLflow ilə Təcrübələrin İzlənməsi',
            'Dərs 27: API-dən Asılılıqsız: Ollama ilə Open-Source Modellər',
            'Dərs 28: RAG Dəqiqliyinin Artırılması: Query Rewriting və Re-ranking',
            'Dərs 29: Komanda AI-ları: LangGraph/CrewAI Multi-Agent Workflows',
            'Dərs 30: Yüksək Performanslı AI: Quantization və vLLM Serving',
            'Dərs 31: Production AI Monitorinqi: LangFuse ilə İzləmə',
            'Dərs 32: AI Təhlükəsizliyi: Prompt Injection və Data Leakage Müdafiəsi'
          ]
        }
      ],
      monthlyProjects: [
        // Month 1 Projects
        {
          id: 1,
          month: 1,
          title: 'Müştəri Seqmentasiyası Alqoritmi',
          description: 'Scikit-learn ilə müştəri məlumatlarına əsasən onları fərqli qruplara ayıran K-Means clustering modeli.',
          technologies: ['Python', 'Scikit-learn', 'K-Means', 'Pandas'],
          difficulty: 3,
          markets: ['Azərbaycan', 'UAE', 'Remote (Fundamental)']
        },
        {
          id: 2,
          month: 1,
          title: 'Enerji Sərfiyyatı Proqnozu',
          description: 'Keçmiş məlumatlara əsasən gələcək enerji tələbatını proqnozlaşdıran linear regression modeli.',
          technologies: ['Python', 'Scikit-learn', 'Linear Regression', 'Pandas'],
          difficulty: 3,
          markets: ['Remote (Energy)', 'UAE']
        },
        {
          id: 3,
          month: 1,
          title: 'Maliyyə Məlumatlarının Təmizlənməsi',
          description: 'Pandas ilə səhv və əskik məlumatları olan maliyyə cədvəlini avtomatik təmizləyən Python skripti.',
          technologies: ['Python', 'Pandas', 'Data Cleaning', 'NumPy'],
          difficulty: 2,
          markets: ['UAE (Fintech)', 'Remote (Fintech)']
        },
        {
          id: 4,
          month: 1,
          title: 'Tweet Sentiment Analizatoru',
          description: 'Tweet-lərin positiv, negativ və ya neytral olduğunu təyin edən sadə Scikit-learn klassifikatoru.',
          technologies: ['Python', 'Scikit-learn', 'NLP', 'Twitter API'],
          difficulty: 3,
          markets: ['Remote', 'UAE']
        },
        {
          id: 5,
          month: 1,
          title: 'GitHub Repository Analizatoru',
          description: 'GitHub API ilə istifadəçinin repository-lərini analiz edən, dil və aktivlik statistikasını çıxaran alət.',
          technologies: ['Python', 'GitHub API', 'Pandas', 'Matplotlib'],
          difficulty: 3,
          markets: ['Remote']
        },
        {
          id: 6,
          month: 1,
          title: 'Sadə Rəqəm Tanıma Neyron Şəbəkəsi',
          description: 'PyTorch istifadə edərək, MNIST məlumat bazasındakı əl ilə yazılmış rəqəmləri tanıyan sadə neyron şəbəkəsi.',
          technologies: ['Python', 'PyTorch', 'Neural Networks', 'MNIST'],
          difficulty: 4,
          markets: ['Remote', 'UAE (Fundamental)']
        },
        {
          id: 7,
          month: 1,
          title: 'Səhm Qiyməti Vizualizasiyası',
          description: 'Pandas və Matplotlib ilə bir şirkətin tarixi səhm məlumatlarının vizual qrafiklərini yaratmaq.',
          technologies: ['Python', 'Pandas', 'Matplotlib', 'Finance API'],
          difficulty: 2,
          markets: ['UAE (Fintech)', 'Remote (Fintech)']
        },
        {
          id: 8,
          month: 1,
          title: 'İstifadəçi Qeydiyyatı Simulyatoru',
          description: 'OOP tətbiq edərək, yeni istifadəçilərin məlumatlarını doğrulayan və saxlayan bir sinif strukturu.',
          technologies: ['Python', 'OOP', 'Data Validation', 'SQLite'],
          difficulty: 2,
          markets: ['Azərbaycan', 'UAE']
        },
        {
          id: 9,
          month: 1,
          title: 'Əmlak Qiymətlərinin Proqnozlaşdırılması',
          description: 'Scikit-learn ilə evin parametrlərinə əsasən (sahə, otaq sayı) qiymətini təxmin edən model.',
          technologies: ['Python', 'Scikit-learn', 'Regression', 'Feature Engineering'],
          difficulty: 3,
          markets: ['Azərbaycan', 'UAE']
        },
        {
          id: 10,
          month: 1,
          title: 'Hava Məlumatları Təhlili',
          description: 'Açıq API-dan hava proqnozu məlumatlarını toplayan və Pandas ilə analizlər aparan Python skripti.',
          technologies: ['Python', 'Weather API', 'Pandas', 'Data Analysis'],
          difficulty: 2,
          markets: ['Remote (Energy)', 'Azerbaijan']
        },
        // Month 2 Projects
        {
          id: 11,
          month: 2,
          title: 'Sənəd Sual-Cavab Botu (RAG)',
          description: 'Şirkətin daxili sənədlərini ChromaDB-yə yükləyib, sualları cavablandıran LangChain chatbot-u.',
          technologies: ['Python', 'LangChain', 'ChromaDB', 'OpenAI API'],
          difficulty: 4,
          markets: ['UAE', 'Azerbaijan', 'Remote']
        },
        {
          id: 12,
          month: 2,
          title: 'Məhsul Təsviri Yaradıcısı',
          description: 'Məhsulun xüsusiyyətlərindən LLM API ilə cəlbedici marketinq təsvirləri yaradan alət.',
          technologies: ['Python', 'LLM API', 'Prompt Engineering', 'Marketing'],
          difficulty: 3,
          markets: ['Remote', 'UAE']
        },
        {
          id: 13,
          month: 2,
          title: 'E-poçt Kategorizatoru',
          description: 'Gələn e-poçtları avtomatik təsnifləndirən və hər kateqoriya üçün cavab layihəsi hazırlayan sistem.',
          technologies: ['Python', 'NLP', 'Email Processing', 'LLM'],
          difficulty: 4,
          markets: ['Remote', 'UAE']
        },
        {
          id: 14,
          month: 2,
          title: 'Xəbər Məqaləsi Xülasəçisi',
          description: 'URL-dən məqaləni oxuyan və LLM ilə 3-4 cümləlik xülasəsini çıxaran proqram.',
          technologies: ['Python', 'Web Scraping', 'LLM', 'BeautifulSoup'],
          difficulty: 3,
          markets: ['Remote', 'Azerbaijan']
        },
        {
          id: 15,
          month: 2,
          title: 'Kod Açıqlayıcısı',
          description: 'Bir Python funksiyasını qəbul edib, onun nə işə yaradığını sadə dildə izah edən prompt-a əsaslanan alət.',
          technologies: ['Python', 'Code Analysis', 'LLM', 'Prompt Engineering'],
          difficulty: 3,
          markets: ['Remote']
        },
        {
          id: 16,
          month: 2,
          title: 'Fintech FAQ Botu',
          description: 'Bankçılıqla bağlı tez-tez verilən sualların cavabları üzərində qurulmuş RAG botu.',
          technologies: ['Python', 'RAG', 'LangChain', 'Financial Domain'],
          difficulty: 4,
          markets: ['UAE (Fintech)', 'Remote (Fintech)']
        },
        {
          id: 17,
          month: 2,
          title: 'Sosial Media Post Generatoru',
          description: 'Mövzuya uyğun Twitter və LinkedIn üçün post fikirləri yaradan prompt-a əsaslanan alət.',
          technologies: ['Python', 'Social Media APIs', 'LLM', 'Content Generation'],
          difficulty: 3,
          markets: ['Remote']
        },
        {
          id: 18,
          month: 2,
          title: 'İstifadəçi Rəylərinin Analizi',
          description: 'Müştəri rəylərindən əsas şikayət mövzularını və pozitiv cəhətləri çıxaran LLM sistemi.',
          technologies: ['Python', 'Sentiment Analysis', 'LLM', 'Data Processing'],
          difficulty: 3,
          markets: ['UAE', 'Azerbaijan']
        },
        {
          id: 19,
          month: 2,
          title: 'Travel Itinerary Planlayıcısı',
          description: 'Verilən məlumatlara əsasən (şəhər, gün sayı) fərdi səyahət planı tərtib edən proqram.',
          technologies: ['Python', 'LLM', 'Travel APIs', 'Planning Logic'],
          difficulty: 3,
          markets: ['Remote', 'Azerbaijan']
        },
        {
          id: 20,
          month: 2,
          title: 'Enerji Hesabı Məlumat Çıxarıcısı',
          description: 'Enerji fakturasının şəklindən VLM API ilə ümumi sərfiyyat kimi məlumatları avtomatik çıxaran prototip.',
          technologies: ['Python', 'Vision API', 'OCR', 'Document Processing'],
          difficulty: 4,
          markets: ['Remote (Energy)']
        },
        // Month 3 Projects
        {
          id: 21,
          month: 3,
          title: 'RAG Chatbot API-ı',
          description: '2-ci aydakı "Sənəd Sual-Cavab Botu"nu FastAPI və Docker ilə REST API-a çevirmək.',
          technologies: ['Python', 'FastAPI', 'Docker', 'RAG', 'API Development'],
          difficulty: 4,
          markets: ['Remote', 'UAE']
        },
        {
          id: 22,
          month: 3,
          title: 'AWS-də Deploy Edilmiş Xülasə Servisi',
          description: '"Xəbər Məqaləsi Xülasəçisi" layihəsini Docker-laşdırıb, AWS EC2-də deploy etmək.',
          technologies: ['Python', 'AWS EC2', 'Docker', 'Deployment', 'Cloud'],
          difficulty: 4,
          markets: ['Remote', 'UAE']
        },
        {
          id: 23,
          month: 3,
          title: 'Real-Time Səhm Məlumatı API-ı',
          description: 'Real-zamanlı səhm məlumatları ilə "bu səhm niyə qalxır?" kimi suallara cavab verən FastAPI servisi.',
          technologies: ['Python', 'FastAPI', 'Real-time Data', 'Finance APIs', 'LLM'],
          difficulty: 5,
          markets: ['UAE (Fintech)', 'Remote (Fintech)']
        },
        {
          id: 24,
          month: 3,
          title: 'Avtomatlaşdırılmış Kod Review Servisi',
          description: 'Hər yeni commit-də kodu LLM-ə göndərərək potensial səhvlər haqqında rəy bildirən backend servisi.',
          technologies: ['Python', 'Git Hooks', 'LLM', 'Code Analysis', 'FastAPI'],
          difficulty: 5,
          markets: ['Remote']
        },
        {
          id: 25,
          month: 3,
          title: 'Müştəri Rəyi Analiz Paneli',
          description: 'FastAPI və Streamlit ilə müştəri rəylərini analiz edən interaktiv panel yaratmaq.',
          technologies: ['Python', 'FastAPI', 'Streamlit', 'Docker', 'Analytics'],
          difficulty: 4,
          markets: ['UAE', 'Azerbaijan']
        },
        {
          id: 26,
          month: 3,
          title: 'S3 Sənədlər üçün RAG Sistemi',
          description: 'AWS S3-ə yeni PDF yükləndikdə avtomatik olaraq onu emal edib ChromaDB-yə əlavə edən proses.',
          technologies: ['Python', 'AWS S3', 'Lambda', 'ChromaDB', 'RAG'],
          difficulty: 5,
          markets: ['Remote', 'UAE']
        },
        {
          id: 27,
          month: 3,
          title: 'Fərdi Enerji Məsləhəti API-ı',
          description: 'Aylıq enerji sərfiyyatına görə qənaət üçün fərdi məsləhətlər verən LLM əsaslı API servisi.',
          technologies: ['Python', 'FastAPI', 'LLM', 'Energy Analytics', 'Recommendations'],
          difficulty: 4,
          markets: ['Remote (Energy)']
        },
        {
          id: 28,
          month: 3,
          title: 'Tərcümə Mikroservisi',
          description: 'Mətni bir dildən digərinə tərcümə edən, Docker-da işləyən sadə bir mikroservis.',
          technologies: ['Python', 'Translation API', 'Docker', 'Microservices', 'FastAPI'],
          difficulty: 3,
          markets: ['Azerbaijan', 'UAE']
        },
        {
          id: 29,
          month: 3,
          title: 'Şəkil Tagging Servisi',
          description: 'Şəkil URL-i qəbul edib, VLM API ilə şəkildəki obyektləri təsvir edən tag-lər qaytaran servis.',
          technologies: ['Python', 'Vision API', 'FastAPI', 'Image Processing', 'ML'],
          difficulty: 4,
          markets: ['Remote']
        },
        {
          id: 30,
          month: 3,
          title: 'KYC Sənəd Doğrulama API-ı',
          description: 'Şəxsiyyət vəsiqəsinin şəklindən VLM ilə məlumatları çıxaran və yoxlayan API prototipi.',
          technologies: ['Python', 'Vision API', 'OCR', 'Document Verification', 'Security'],
          difficulty: 5,
          markets: ['UAE (Fintech)']
        }
      ],
      finalProjects: [
        {
          id: 1,
          title: 'Maliyyə Bazarı Analizi üçün Multi-Agent Sistemi',
          type: 'Multi-Agent AI Sistemi',
          description: 'Xəbərləri, sosial medianı və qiymətləri analiz edib gündəlik bazar icmalı hazırlayan agent-lər komandası.',
          features: [
            'News sentiment analysis agent',
            'Social media monitoring agent',
            'Price prediction agent',
            'Risk assessment agent',
            'Daily market report generation'
          ],
          technologies: ['Python', 'LangGraph', 'CrewAI', 'LLM APIs', 'Financial APIs', 'Multi-Agent Framework'],
          duration: '3 həftə',
          markets: ['Remote (Fintech)', 'UAE (Fintech)']
        },
        {
          id: 2,
          title: 'Performans-Optimizasiya Edilmiş RAG Servisi',
          type: 'Production AI Sistemi',
          description: 'vLLM və quantization ilə aşağı latency ilə işləyən və LangFuse ilə monitorinq edilən RAG API-ı.',
          features: [
            'High-performance inference with vLLM',
            'Model quantization for efficiency',
            'Real-time monitoring with LangFuse',
            'Scalable API architecture',
            'Cost optimization tracking'
          ],
          technologies: ['Python', 'vLLM', 'Quantization', 'LangFuse', 'FastAPI', 'Docker', 'Monitoring'],
          duration: '3 həftə',
          markets: ['Remote']
        },
        {
          id: 3,
          title: 'Avtonom Kod Təkmilləşdirmə Agent-i',
          type: 'Code Analysis AI',
          description: 'Mövcud kod bazasını analiz edən, səhvləri tapan və refactoring təklifləri verən agent-lər qrupu.',
          features: [
            'Automated code review',
            'Bug detection and suggestions',
            'Code quality metrics',
            'Refactoring recommendations',
            'Performance optimization hints'
          ],
          technologies: ['Python', 'Code Analysis', 'LLM', 'Git Integration', 'Multi-Agent', 'AST Parsing'],
          duration: '3 həftə',
          markets: ['Remote']
        },
        {
          id: 4,
          title: 'Enerji Ticarəti Strategiyası Co-pilot-u',
          type: 'Energy Trading AI',
          description: 'Hava proqnozu, tələbat və xəbərləri analiz edərək treyderlər üçün strategiyalar təklif edən sistem.',
          features: [
            'Weather data integration',
            'Demand forecasting',
            'Market news analysis',
            'Trading strategy recommendations',
            'Risk management alerts'
          ],
          technologies: ['Python', 'Energy APIs', 'Weather APIs', 'LLM', 'Time Series Analysis', 'Trading Logic'],
          duration: '3 həftə',
          markets: ['Remote (Energy)']
        },
        {
          id: 5,
          title: 'Ərəb Dilli Müştəri Xidmətləri üçün Multi-Agent Sistemi',
          type: 'Multilingual AI Support',
          description: 'Sorğunu anlayan, RAG ilə cavab tapan və lazım gəldikdə insana yönləndirən agent-lərdən ibarət sistem.',
          features: [
            'Arabic language processing',
            'Intent classification',
            'RAG-based knowledge retrieval',
            'Human handoff logic',
            'Multi-channel support'
          ],
          technologies: ['Python', 'Arabic NLP', 'RAG', 'LangChain', 'Multi-Agent', 'Customer Service APIs'],
          duration: '3 həftə',
          markets: ['UAE']
        },
        {
          id: 6,
          title: 'Code a Website Agent-i',
          type: 'Code Generation AI',
          description: 'Sadə təsvirə əsasən (məsələn, "portfolio saytı yarat") HTML, CSS, JS kodlarını yaradan agent.',
          features: [
            'Natural language to code conversion',
            'HTML/CSS/JS generation',
            'Responsive design creation',
            'Code optimization',
            'Live preview generation'
          ],
          technologies: ['Python', 'LLM', 'Code Generation', 'Web Technologies', 'Template Systems'],
          duration: '3 həftə',
          markets: ['Remote']
        },
        {
          id: 7,
          title: 'Daxili IT Helpdesk Avtomatlaşdırması',
          type: 'Enterprise AI Assistant',
          description: 'Şirkətin daxili sənədləri üzərində qurulmuş, Slack/Teams-ə inteqrasiya edilmiş IT problemlərini həll edən agent.',
          features: [
            'Internal documentation RAG',
            'Slack/Teams integration',
            'IT troubleshooting automation',
            'Ticket routing logic',
            'Knowledge base management'
          ],
          technologies: ['Python', 'RAG', 'Slack API', 'Teams API', 'IT Service Management', 'Enterprise Integration'],
          duration: '3 həftə',
          markets: ['UAE', 'Azerbaijan']
        },
        {
          id: 8,
          title: 'Təhlükəsiz AI Gateway Prototipi',
          type: 'AI Security System',
          description: 'LLM-ə gedən prompt-ları yoxlayaraq prompt injection cəhdlərini bloklayan API gateway servisi.',
          features: [
            'Prompt injection detection',
            'Security policy enforcement',
            'API request filtering',
            'Threat monitoring',
            'Audit logging'
          ],
          technologies: ['Python', 'Security Analysis', 'API Gateway', 'Threat Detection', 'Monitoring', 'FastAPI'],
          duration: '3 həftə',
          markets: ['UAE (Fintech)', 'Remote']
        },
        {
          id: 9,
          title: 'Şəxsi AI Məşqçi (Personal AI Coach)',
          type: 'Personal AI Assistant',
          description: 'İstifadəçinin hədəflərini izləyən, motivasiya verən və hesabatlar hazırlayan fərdi agent.',
          features: [
            'Goal tracking and monitoring',
            'Personalized motivation system',
            'Progress reporting',
            'Habit formation assistance',
            'Achievement analytics'
          ],
          technologies: ['Python', 'Personal Analytics', 'LLM', 'Behavioral Analysis', 'Mobile Integration'],
          duration: '3 həftə',
          markets: ['Remote']
        },
        {
          id: 10,
          title: 'Lokal Biznes üçün Marketinq Bot-u',
          type: 'Local Business AI',
          description: 'Azərbaycan bazarındakı kiçik biznesin məhsulları haqqında sualları cavablandıran Telegram/WhatsApp botu.',
          features: [
            'Local business knowledge base',
            'Telegram/WhatsApp integration',
            'Product information system',
            'Customer inquiry handling',
            'Local market insights'
          ],
          technologies: ['Python', 'Telegram Bot API', 'WhatsApp API', 'Local Business APIs', 'RAG', 'Azerbaijani NLP'],
          duration: '3 həftə',
          markets: ['Azerbaijan']
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
    },
    getMarketClass(market) {
      if (market.includes('Azerbaijan') || market.includes('Azərbaycan')) {
        return 'market-azerbaijan';
      } else if (market.includes('UAE')) {
        return 'market-uae';
      } else if (market.includes('Remote')) {
        return 'market-remote';
      } else if (market.includes('Fintech')) {
        return 'market-fintech';
      } else if (market.includes('Energy')) {
        return 'market-energy';
      }
      return 'market-default';
    },
    formatMarketName(market) {
      if (market.includes('Azerbaijan') || market.includes('Azərbaycan')) {
        return '🇦🇿 ' + market.replace('Azerbaijan', 'Azərbaycan');
      } else if (market.includes('UAE')) {
        return '🇦🇪 ' + market.replace('UAE', 'BƏƏ');
      } else if (market.includes('Remote')) {
        return '🌐 ' + market;
      }
      return market;
    }
  },
  beforeUnmount() {
    // Clean up body overflow style
    document.body.style.overflow = '';
  }
}
</script> 