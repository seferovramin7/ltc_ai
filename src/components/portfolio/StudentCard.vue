<template>
  <div class="student-card">
    <div class="student-header">
      <div class="student-avatar">
        <img :src="student.photo" :alt="`${student.name} ${student.surname}`" @error="handleImageError">
      </div>
      <div class="student-info">
        <h3 class="student-name">{{ student.name }} {{ student.surname }}</h3>
        <p class="student-details">{{ student.age }} yaş • {{ student.profession }}</p>
      </div>
    </div>
    
    <div class="student-projects">
      <h4 class="projects-title">Layihələr</h4>
      <div class="projects-grid">
        <ProjectCard
          v-for="project in studentProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue'

export default {
  name: 'StudentCard',
  components: {
    ProjectCard
  },
  props: {
    student: {
      type: Object,
      required: true
    },
    programName: {
      type: String,
      required: true
    },
    groupName: {
      type: String,
      required: true
    }
  },
  computed: {
    studentProjects() {
      return this.student.projects || []
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = '/images/default-avatar.jpg'
    }
  }
}
</script>

<style scoped>
.student-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.student-header {
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.student-avatar {
  flex-shrink: 0;
}

.student-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #cb2360;
  box-shadow: 0 2px 8px rgba(203, 35, 96, 0.2);
}

.student-info {
  flex: 1;
}

.student-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
}

.student-details {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
}

.student-projects {
  padding: 2rem;
}

.projects-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  text-align: center;
  position: relative;
}

.projects-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: #cb2360;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .student-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .student-avatar img {
    width: 70px;
    height: 70px;
  }
  
  .student-name {
    font-size: 1.2rem;
  }
  
  .student-projects {
    padding: 1.5rem;
  }
}
</style> 