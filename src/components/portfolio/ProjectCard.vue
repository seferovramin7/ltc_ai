<template>
  <div class="project-card">
    <div class="project-header">
      <div class="project-info">
        <div class="project-meta">
          <h4 class="project-title">{{ project.title }}</h4>
          <div class="project-badges">
            <span class="project-month" v-if="project.numberOfMonths">{{ project.numberOfMonths }}. Ay</span>
            <span class="project-type" v-if="project.type">{{ getProjectTypeLabel(project.type) }}</span>
          </div>
        </div>
        
        <!-- Project Images Section -->
        <div class="project-images" v-if="project.images && project.images.length > 0">
          <h5 class="images-title">Layihə Şəkilləri:</h5>
          <div class="images-grid">
            <div 
              v-for="(image, index) in project.images" 
              :key="index"
              class="image-thumbnail"
              @click="openImagePopup(image, index)"
            >
              <img 
                :src="image" 
                :alt="`${project.title} - Şəkil ${index + 1}`" 
                @error="handleImageError"
                loading="lazy"
                decoding="async"
              >
              <div class="image-overlay">
                <span class="zoom-icon">🔍</span>
              </div>
            </div>
          </div>
        </div>
        
        <p class="project-description">{{ project.description }}</p>
        
        <div class="project-skills" v-if="project.skills && project.skills.length > 0">
          <h5 class="skills-title">Qazanılan Bacarıqlar:</h5>
          <ul class="skills-list">
            <li v-for="skill in project.skills" :key="skill">{{ skill }}</li>
          </ul>
        </div>
        
        <div class="project-tech" v-if="project.techStack">
          <div class="tech-tags">
            <span 
              v-for="tech in getTechStackArray(project.techStack)" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech.trim() }}
            </span>
          </div>
        </div>
        
        <div class="project-links">
          <SocialShareCard :student="studentInfo" :project="project" />
          <a 
            v-if="project.githubUrl || project.githubLink" 
            :href="project.githubUrl || project.githubLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="project-link github"
          >
            <span class="link-icon">📁</span>
            GitHub
          </a>
          <a 
            v-if="project.liveUrl || project.demoUrl" 
            :href="project.liveUrl || project.demoUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="project-link live"
          >
            <span class="link-icon">🌐</span>
            Demo
          </a>
        </div>
        
        <div class="project-date" v-if="project.date">
          <span class="date-label">Tamamlanma Tarixi:</span>
          <span class="date-value">{{ formatDate(project.date) }}</span>
        </div>
      </div>
    </div>
    
    <!-- Image Popup Modal -->
    <Teleport to="body">
      <div v-if="showImagePopup" class="modal-backdrop" @click="handleBackdropClick">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ project.title }}</h3>
            <button class="modal-close" @click="closeModal" type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="image-container">
              <img 
                :src="currentImage" 
                :alt="`${project.title} - Image ${currentImageIndex + 1}`" 
                class="modal-image"
                @load="onImageLoad"
                @error="onImageError"
              >
              
              <!-- Navigation arrows -->
              <button 
                v-if="project.images.length > 1 && currentImageIndex > 0"
                class="nav-arrow nav-prev" 
                @click="previousImage"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              
              <button 
                v-if="project.images.length > 1 && currentImageIndex < project.images.length - 1"
                class="nav-arrow nav-next" 
                @click="nextImage"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
            
            <!-- Image counter -->
            <div v-if="project.images.length > 1" class="image-counter">
              {{ currentImageIndex + 1 }} / {{ project.images.length }}
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import SocialShareCard from './SocialShareCard.vue'

export default {
  name: 'ProjectCard',
  components: {
    SocialShareCard
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    studentInfo: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      showImagePopup: false,
      currentImage: '',
      currentImageIndex: 0
    }
  },
  methods: {
    getProjectTypeLabel(type) {
      return type === 'monthly' ? 'Aylıq Layihə' : 'Final Layihəsi'
    },
    getTechStackArray(techStack) {
      if (Array.isArray(techStack)) {
        return techStack
      }
      if (typeof techStack === 'string') {
        // Split by common separators: |, •, comma, or line breaks
        return techStack.split(/[|•,\n]/).filter(tech => tech.trim())
      }
      return []
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('az-AZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    openImagePopup(image, index) {
      this.currentImage = image
      this.currentImageIndex = index
      this.showImagePopup = true
      this.$nextTick(() => {
        document.body.style.overflow = 'hidden'
      })
    },
    closeModal() {
      this.showImagePopup = false
      document.body.style.overflow = ''
    },
    handleBackdropClick(event) {
      if (event.target === event.currentTarget) {
        this.closeModal()
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.project.images.length - 1) {
        this.currentImageIndex++
        this.currentImage = this.project.images[this.currentImageIndex]
      }
    },
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
        this.currentImage = this.project.images[this.currentImageIndex]
      }
    },
    onImageLoad() {
      // Image loaded successfully
    },
    onImageError(event) {
      event.target.src = '/images/project-placeholder.jpg'
    },
    handleKeydown(event) {
      if (!this.showImagePopup) return
      
      switch (event.key) {
        case 'Escape':
          this.closeModal()
          break
        case 'ArrowLeft':
          this.previousImage()
          break
        case 'ArrowRight':
          this.nextImage()
          break
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.project-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.project-header {
  display: flex;
  flex-direction: column;
}

.project-info {
  padding: 1.5rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  flex: 1;
}

.project-badges {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: flex-end;
}

.project-month {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.project-month::before {
  content: '📅';
  font-size: 0.7rem;
}

.project-type {
  background: linear-gradient(135deg, #cb2360, #e91e63);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

/* Project Images Styles */
.project-images {
  margin-bottom: 1rem;
}

.images-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.75rem 0;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  max-width: 100%;
}

.image-thumbnail {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e2e8f0;
}

.image-thumbnail:hover {
  transform: scale(1.05);
  border-color: #cb2360;
  box-shadow: 0 4px 12px rgba(203, 35, 96, 0.2);
}

.image-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-thumbnail:hover .image-overlay {
  opacity: 1;
}

.zoom-icon {
  color: white;
  font-size: 1.2rem;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: modalFadeIn 0.2s ease-out;
}

.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 95vw;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-shrink: 0;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #374151;
}

.modal-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  min-height: 0;
}

.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  min-height: 0;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.nav-arrow:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.nav-prev {
  left: 1rem;
}

.nav-next {
  right: 1rem;
}

.image-counter {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.project-description {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.project-skills {
  margin-bottom: 1rem;
}

.skills-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-list li {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.skills-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #cb2360;
  font-weight: bold;
}

.project-tech {
  margin-bottom: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.project-link.github {
  background: #f8fafc;
  color: #1a202c;
  border: 1px solid #e2e8f0;
}

.project-link.github:hover {
  background: #1a202c;
  color: white;
}

.project-link.live {
  background: #cb2360;
  color: white;
}

.project-link.live:hover {
  background: #a91c4d;
  transform: translateY(-1px);
}

.link-icon {
  font-size: 1rem;
}

.project-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
}

.date-label {
  font-weight: 500;
}

.date-value {
  color: #cb2360;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .project-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .project-type {
    margin-left: 0;
    align-self: flex-start;
  }
  
  .project-links {
    flex-direction: column;
  }
  
  .project-link {
    justify-content: center;
  }
  
  .project-badges {
    flex-direction: row;
    align-items: center;
  }
  
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
  
  .image-thumbnail {
    width: 60px;
    height: 60px;
  }
  
  .modal-backdrop {
    padding: 0.5rem;
  }
  
  .modal-container {
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 12px;
  }
  
  .modal-header {
    padding: 0.75rem 1rem;
  }
  
  .modal-title {
    font-size: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-image {
    max-height: 60vh;
  }
  
  .nav-arrow {
    width: 40px;
    height: 40px;
  }
  
  .nav-prev {
    left: 0.5rem;
  }
  
  .nav-next {
    right: 0.5rem;
  }
  
  .image-counter {
    font-size: 0.8rem;
    padding: 0.375rem 0.75rem;
  }
}
</style> 