// Simple server-side API service for fetching student data
// This is a simplified version for meta tag generation

class ServerApiService {
  constructor() {
    this.baseUrl = 'https://ltclab-api-production.up.railway.app/api';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async getStudentById(studentId) {
    const cacheKey = `student_${studentId}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/students/${studentId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const studentData = await response.json();
      
      // Transform the data
      const student = {
        id: studentData.id,
        name: studentData.name.split(' ')[0] || studentData.name,
        surname: studentData.name.split(' ').slice(1).join(' ') || '',
        age: studentData.age,
        profession: studentData.profession,
        photo: studentData.imageUrl || '/images/default-avatar.jpg',
        groupId: studentData.groupId,
        groupName: studentData.groupName,
        projects: studentData.projects ? studentData.projects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          techStack: project.techStack ? project.techStack.split(',').map(tech => tech.trim()) : [],
          images: project.images || [],
          githubUrl: project.githubLink,
          numberOfMonths: project.numberOfMonths || 1
        })) : []
      };

      // Try to determine program name
      try {
        const programsResponse = await this.fetchWithTimeout(`${this.baseUrl}/programs`);
        if (programsResponse.ok) {
          const programs = await programsResponse.json();
          for (const program of programs) {
            const groupsResponse = await this.fetchWithTimeout(`${this.baseUrl}/programs/${program.id}/groups`);
            if (groupsResponse.ok) {
              const groups = await groupsResponse.json();
              const studentGroup = groups.find(group => group.id === studentData.groupId);
              if (studentGroup) {
                student.programName = program.name;
                break;
              }
            }
          }
        }
      } catch (error) {
        console.warn('Could not determine program name:', error);
        student.programName = 'Suni intellekt Proqramı';
      }

      // Cache the result
      this.cache.set(cacheKey, {
        data: student,
        timestamp: Date.now()
      });

      return student;
    } catch (error) {
      console.error('Error fetching student data:', error);
      return null;
    }
  }

  // Fallback data for when API is unavailable
  getFallbackStudentData(studentId) {
    return {
      id: studentId,
      name: `Tələbə`,
      surname: `${studentId}`,
      age: 22,
      profession: 'AI Mütəxəssis',
      photo: '/images/default-avatar.jpg',
      programName: 'Suni intellekt Proqramı',
      projects: [
        {
          id: 1,
          title: 'AI Layihəsi',
          description: 'LTC Lab-da hazırlanan suni intellekt layihəsi',
          techStack: ['Python', 'TensorFlow', 'React'],
          images: [],
          githubUrl: '',
          numberOfMonths: 1
        }
      ]
    };
  }
}

export default ServerApiService; 