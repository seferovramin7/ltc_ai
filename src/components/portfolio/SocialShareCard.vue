<template>
  <div class="social-share">
    <!-- Share Button -->
    <button
        @click="openShareModal"
        class="share-btn"
        :disabled="!student || !selectedProject"
    >
      Paylaş
    </button>

    <!-- Share Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-backdrop" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>Layihəni Paylaş</h3>
            <button class="modal-close" @click="closeModal">×</button>
          </div>

          <div class="modal-body">
            <!-- Project Selection -->
            <div class="project-selector" v-if="!project && student && student.projects.length > 1">
              <label for="project-select">Layihə seçin:</label>
              <select id="project-select" v-model="selectedProject">
                <option
                    v-for="proj in student.projects"
                    :key="proj.id"
                    :value="proj"
                >
                  {{ proj.title }} ({{ proj.numberOfMonths }}. ay)
                </option>
              </select>
            </div>

            <!-- Preview Card -->
            <div class="share-preview">
              <div id="share-card" class="share-card" ref="shareCard">
                <div class="card-header">
                  <img src="/lts_logo.29f6d82c.svg" alt="LTC Lab" class="logo">
                </div>

                <div class="card-content">
                  <div class="student-info">
                    <div class="avatar">
                      <div v-if="shouldShowPlaceholder(student.photo)" class="avatar-placeholder">
                        <span class="avatar-initials">{{ getInitials(student.name, student.surname) }}</span>
                      </div>
                      <img
                          v-else
                          :src="student.photo"
                          :alt="`${student.name} ${student.surname}`"
                          class="avatar-image"
                      >
                    </div>
                    <div class="student-details">
                      <h3 class="student-name">{{ student.name }} {{ student.surname }}</h3>
                      <p class="student-role">{{ student.profession }}</p>
                    </div>
                  </div>

                  <div class="project-info" v-if="selectedProject">
                    <div class="month-info">
                      <span class="month-text">{{ selectedProject.numberOfMonths }}. ay</span>
                    </div>
                    <h4 class="project-title">{{ selectedProject.title }}</h4>
                    <p class="project-description">{{ truncateText(selectedProject.description, 120) }}</p>

                    <div class="project-meta">


                      <div class="tech-stack" v-if="getTechStackArray(selectedProject.techStack || []).length > 0">
                        <span class="tech-list">{{
                            getTechStackArray(selectedProject.techStack || []).slice(0, 3).join(' • ')
                          }}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Download Button -->
            <div class="download-section">
              <button @click="downloadImage" class="download-btn" :disabled="downloading">
                <span v-if="downloading">Yüklənir...</span>
                <span v-else>Yüklə</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'SocialShareCard',
  props: {
    student: {
      type: Object,
      required: true
    },
    project: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      showModal: false,
      selectedProject: null,
      downloading: false
    }
  },
  watch: {
    student: {
      immediate: true,
      handler(newStudent) {
        if (this.project) {
          this.selectedProject = this.project
        } else if (newStudent && newStudent.projects && newStudent.projects.length > 0) {
          this.selectedProject = newStudent.projects[0]
        }
      }
    },
    project: {
      immediate: true,
      handler(newProject) {
        if (newProject) {
          this.selectedProject = newProject
        }
      }
    }
  },
  methods: {
    openShareModal() {
      if (this.student && this.student.projects.length > 0) {
        this.showModal = true
        document.body.style.overflow = 'hidden'
      }
    },

    closeModal() {
      this.showModal = false
      document.body.style.overflow = ''
    },

    shouldShowPlaceholder(imageUrl) {
      return !imageUrl || imageUrl === '/images/default-avatar.jpg'
    },

    getInitials(name, surname) {
      const firstInitial = name ? name.charAt(0).toUpperCase() : ''
      const lastInitial = surname ? surname.charAt(0).toUpperCase() : ''
      return firstInitial + lastInitial || '??'
    },

    getTechStackArray(techStack) {
      if (!techStack) return []

      if (Array.isArray(techStack)) {
        return techStack.filter(tech => tech && tech.toString().trim())
      }

      if (typeof techStack === 'string') {
        return techStack.split(/[|•,\n]/).map(tech => tech.trim()).filter(tech => tech)
      }

      return []
    },

    truncateText(text, maxLength) {
      if (!text) return ''
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength).trim() + '...'
    },

    async downloadImage() {
      if (!this.selectedProject) return

      try {
        this.downloading = true

        const element = this.$refs.shareCard
        if (!element) return

        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          width: 600,
          height: 350,
          logging: false,
          removeContainer: true
        })

        const link = document.createElement('a')
        link.download = `${this.student.name}_${this.student.surname}_${this.selectedProject.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()

      } catch (error) {
        console.error('Error generating image:', error)
        alert('Şəkil yaradılarkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.')
      } finally {
        this.downloading = false
      }
    }
  }
}
</script>

<style scoped>
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.share-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #9f1c54, #7a1640);
  transform: translateY(-1px);
}

.share-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.share-icon {
  font-size: 1rem;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #1a202c;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: #1a202c;
}

.modal-body {
  padding: 1.5rem;
}

.project-selector {
  margin-bottom: 1.5rem;
}

.project-selector label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
}

.project-selector select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.project-selector select:focus {
  outline: none;
  border-color: #cb2360;
}

/* Share Card Styles */
.share-preview {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.share-card {
  width: 600px;
  height: 350px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.card-header {
  padding: 15px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: center;
}

.logo {
  height: 32px;
  width: auto;
}

.card-content {
  flex: 1;
  padding: 25px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: flex-start;
}

.student-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  flex: 0 0 auto;
  width: 200px;
}

.avatar {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.avatar-image, .avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #cb2360;
}

.avatar-image {
  object-fit: cover;
}

.avatar-placeholder {
  background: linear-gradient(135deg, #cb2360, #9f1c54);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-initials {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
}

.student-details {
  flex: 1;
}

.student-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 4px 0;
}

.student-role {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.project-info {
  flex: 1;
  text-align: left;
  padding-left: 20px;
}

.project-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.project-description {
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.4;
  margin: 0 0 15px 0;
}

.project-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid #f1f5f9;
  flex-wrap: nowrap;
}

.month-info {
  display: flex;
  align-items: center;
  order: 1;
  flex: 0 0 auto;
}

.month-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #cb2360;
  //background: #f8f9fa;
  padding: 0px 0px 10px 0px;
  border-radius: 6px;
}

.tech-stack {
  display: flex;
  align-items: center;
  visibility: visible;
  opacity: 1;
  order: 2;
  flex: 0 0 auto;
}

.tech-list {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  display: inline-block;
  visibility: visible;
  opacity: 1;
}

.download-section {
  text-align: center;
}

.download-btn {
  background: #9a1446;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.download-btn:hover:not(:disabled) {
  background: #3182ce;
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }

  .share-card {
    width: 100%;
    max-width: 500px;
    height: 350px;
  }

  .card-content {
    padding: 20px;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .student-info {
    gap: 12px;
    width: auto;
    text-align: center;
  }

  .project-info {
    text-align: center;
    padding-left: 0;
  }

  .project-meta {
    justify-content: center;
  }

  .avatar-image, .avatar-placeholder {
    width: 60px;
    height: 60px;
  }

  .avatar-initials {
    font-size: 1.4rem;
  }

  .student-name {
    font-size: 1.2rem;
  }

  .project-title {
    font-size: 1.1rem;
  }

  .project-description {
    font-size: 0.9rem;
  }

  .project-meta {
    justify-content: center;
    gap: 12px;
  }

  .month-text {
    font-size: 0.85rem;
  }

  .tech-list {
    font-size: 0.85rem;
  }
}
</style> 