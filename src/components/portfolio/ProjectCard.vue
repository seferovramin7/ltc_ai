<template>
  <div class="project-card">
    <div class="project-header">
      <div class="project-info">
        <div class="project-meta">
          <h4 class="project-title">{{ project.title }}</h4>
          <div class="project-badges">
            <span class="project-month" v-if="project.month">{{ project.month }}. Ay</span>
            <span class="project-type">{{ getProjectTypeLabel(project.type) }}</span>
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
              <img :src="image" :alt="`${project.title} - Şəkil ${index + 1}`" @error="handleImageError">
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
        
        <div class="project-tech" v-if="project.techStack && project.techStack.length > 0">
          <div class="tech-tags">
            <span 
              v-for="tech in project.techStack" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="project-links">
          <a 
            v-if="project.githubUrl" 
            :href="project.githubUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="project-link github"
          >
            <span class="link-icon">📁</span>
            GitHub
          </a>
          <a 
            v-if="project.liveUrl" 
            :href="project.liveUrl" 
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
    <div v-if="showImagePopup" class="image-popup-overlay" @click="closeImagePopup">
      <div class="image-popup-container" @click.stop>
        <div class="image-popup-header">
          <h3 class="popup-title">{{ project.title }}</h3>
          <button class="close-button" @click="closeImagePopup">×</button>
        </div>
        <div class="image-popup-content">
          <img :src="currentImage" :alt="`${project.title} - Şəkil ${currentImageIndex + 1}`" class="popup-image">
          <div class="image-navigation" v-if="project.images.length > 1">
            <button 
              class="nav-button prev" 
              @click="previousImage"
              :disabled="currentImageIndex === 0"
            >
              ‹
            </button>
            <span class="image-counter">{{ currentImageIndex + 1 }} / {{ project.images.length }}</span>
            <button 
              class="nav-button next" 
              @click="nextImage"
              :disabled="currentImageIndex === project.images.length - 1"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
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
      document.body.style.overflow = 'hidden'
    },
    closeImagePopup() {
      this.showImagePopup = false
      document.body.style.overflow = 'auto'
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
    handleImageError(event) {
      event.target.src = '/images/project-placeholder.jpg'
    }
  },
  mounted() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.showImagePopup) {
        if (e.key === 'Escape') {
          this.closeImagePopup()
        } else if (e.key === 'ArrowRight') {
          this.nextImage()
        } else if (e.key === 'ArrowLeft') {
          this.previousImage()
        }
      }
    })
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
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
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

/* Image Popup Styles */
.image-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.image-popup-container {
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.image-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.popup-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: #e2e8f0;
  color: #1a202c;
}

.image-popup-content {
  padding: 1.5rem;
  text-align: center;
}

.popup-image {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.nav-button {
  background: #cb2360;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover:not(:disabled) {
  background: #a91c4d;
  transform: scale(1.1);
}

.nav-button:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

.image-counter {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  min-width: 60px;
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
  
  .image-popup-overlay {
    padding: 1rem;
  }
  
  .popup-image {
    max-height: 50vh;
  }
}
</style> 