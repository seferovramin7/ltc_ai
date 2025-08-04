import CacheService from './cacheService.js';

const API_BASE_URL = 'https://api.ai.ltclab.edu.az/api/public';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.cache = CacheService;
    this.pendingRequests = new Map(); // Prevent duplicate concurrent requests
  }

  async makeRequest(endpoint, options = {}) {
    const cacheKey = this.cache.generateKey('api', { endpoint, options: JSON.stringify(options) });
    
    // Check cache first
    const cachedData = this.cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Prevent duplicate concurrent requests
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      ...options
    };

    const requestPromise = (async () => {
      try {
        const response = await fetch(url, defaultOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache successful responses
        this.cache.set(cacheKey, data);
        
        return data;
      } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
      } finally {
        // Remove from pending requests
        this.pendingRequests.delete(cacheKey);
      }
    })();

    // Store the promise to prevent duplicate requests
    this.pendingRequests.set(cacheKey, requestPromise);
    
    return requestPromise;
  }

  // Get all programs with their groups
  async getPrograms() {
    return this.makeRequest('/programs');
  }

  // Get groups for a specific program with students
  async getProgramGroups(programId) {
    return this.makeRequest(`/programs/${programId}/groups`);
  }

  // Get students for a specific group
  async getGroupStudents(groupId) {
    return this.makeRequest(`/groups/${groupId}/students`);
  }

  // Get individual student with projects
  async getStudent(studentId) {
    return this.makeRequest(`/students/${studentId}`);
  }

  // Helper methods to transform API data to match current component expectations
  transformProgramsData(apiData) {
    const programs = {};
    
    apiData.forEach(program => {
      const programKey = this.generateProgramKey(program.name);
      programs[programKey] = {
        id: program.id,
        name: program.name,
        description: this.generateProgramDescription(program.name),
        groups: this.transformGroupsData(program.groups || [])
      };
    });
    
    return programs;
  }

  transformGroupsData(apiGroups) {
    const groups = {};
    
    apiGroups.forEach(group => {
      const groupKey = this.generateGroupKey(group.name);
      groups[groupKey] = {
        id: group.id,
        name: group.name,
        description: `${group.name} qrupu - ${group.programName}`,
        students: group.students ? this.transformStudentsData(group.students) : {}
      };
    });
    
    return groups;
  }

  transformStudentsData(apiStudents) {
    const students = {};
    
    apiStudents.forEach(student => {
      const studentKey = this.generateStudentKey(student.name);
      students[studentKey] = {
        id: student.id,
        name: student.name.split(' ')[0] || student.name,
        surname: student.name.split(' ').slice(1).join(' ') || '',
        age: student.age,
        profession: student.profession,
        photo: student.imageUrl || '/images/default-avatar.jpg',
        groupId: student.groupId,
        groupName: student.groupName,
        projects: student.projects ? this.transformProjectsData(student.projects) : {}
      };
    });
    
    return students;
  }

  transformProjectsData(apiProjects) {
    const projects = {};
    
    apiProjects.forEach(project => {
      const projectKey = this.generateProjectKey(project.title);
      projects[projectKey] = {
        id: project.id,
        type: 'monthly', // Default type since API doesn't specify
        title: project.title,
        description: project.description,
        skills: this.extractSkillsFromTechStack(project.techStack),
        techStack: this.parseTechStack(project.techStack),
        images: project.images || [],
        githubUrl: project.githubLink,
        liveUrl: null, // API doesn't provide live URL
        date: new Date().toISOString().split('T')[0], // Default to current date
        numberOfMonths: project.numberOfMonths || 1
      };
    });
    
    return projects;
  }

  // Helper methods to generate keys
  generateProgramKey(name) {
    if (name.includes('Proqramlaşdırma')) {
      return 'ai-programming';
    } else if (name.includes('Mühəndisliyi')) {
      return 'ai-engineering';
    }
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  generateGroupKey(name) {
    return name.toLowerCase();
  }

  generateStudentKey(name) {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  generateProjectKey(title) {
    return title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  generateProgramDescription(name) {
    if (name.includes('Proqramlaşdırma')) {
      return 'AI əsaslı proqramlaşdırma kursunda tələbələr müasir texnologiyalar ilə real layihələr hazırlayırlar.';
    } else if (name.includes('Mühəndisliyi')) {
      return 'AI mühəndisliyi kursunda tələbələr maşın öyrənməsi və dərin öyrənmə texnologiyalarını öyrənirlər.';
    }
    return 'Süni intellekt sahəsində peşəkar təhsil proqramı.';
  }

  extractSkillsFromTechStack(techStack) {
    if (!techStack) return [];
    
    const skills = techStack.split(',').map(skill => skill.trim());
    return skills.map(skill => `${skill} texnologiyası ilə işləmə`);
  }

  parseTechStack(techStack) {
    if (!techStack) return [];
    
    // Handle both comma and pipe separators
    const separators = /[,|]/;
    return techStack.split(separators).map(tech => tech.trim()).filter(tech => tech);
  }

  // Clear specific cache entries
  clearCache(type = null) {
    if (type) {
      // Clear specific type of cache
      const keys = Array.from(this.cache.memoryCache.keys());
      keys.forEach(key => {
        if (key.startsWith(type)) {
          this.cache.clear(key);
        }
      });
    } else {
      // Clear all cache
      this.cache.clearAll();
    }
  }

  // Preload critical data
  async preloadData() {
    try {
      // Preload programs and students data
      const programsPromise = this.getPrograms();
      const studentsPromise = this.getAllStudents();
      
      await Promise.all([programsPromise, studentsPromise]);
      
      console.log('Data preloaded successfully');
    } catch (error) {
      console.error('Data preload failed:', error);
    }
  }

  // Method to get all students in the format expected by components
  async getAllStudents() {
    const cacheKey = this.cache.generateKey('allStudents');
    const cachedStudents = this.cache.get(cacheKey);
    
    if (cachedStudents) {
      return cachedStudents;
    }

    const programs = await this.getPrograms();
    const allStudents = [];
    
    // Use Promise.all for concurrent requests to improve performance
    const programPromises = programs.map(async (program) => {
      const programGroups = await this.getProgramGroups(program.id);
      
      const groupStudents = [];
      for (const group of programGroups) {
        if (group.students) {
          for (const student of group.students) {
            groupStudents.push({
              id: student.id,
              name: student.name.split(' ')[0] || student.name,
              surname: student.name.split(' ').slice(1).join(' ') || '',
              age: student.age,
              profession: student.profession,
              photo: student.imageUrl || '/images/default-avatar.jpg',
              programId: this.generateProgramKey(program.name),
              groupId: this.generateGroupKey(group.name),
              programName: program.name,
              groupName: group.name,
              projects: student.projects ? student.projects.map(project => ({
                id: project.id,
                title: project.title,
                description: project.description,
                techStack: this.parseTechStack(project.techStack),
                images: project.images || [],
                githubUrl: project.githubLink,
                githubLink: project.githubLink, // Support both field names
                numberOfMonths: project.numberOfMonths || 1
              })) : []
            });
          }
        }
      }
      return groupStudents;
    });

    const studentArrays = await Promise.all(programPromises);
    studentArrays.forEach(students => allStudents.push(...students));
    
    // Cache the result
    this.cache.set(cacheKey, allStudents);
    
    return allStudents;
  }

  // Method to get student by ID with full project details
  async getStudentById(studentId) {
    const studentData = await this.getStudent(studentId);
    
    // Try to get the program name by finding which program this student's group belongs to
    let programName = 'Süni intellekt Əsaslı Java Backend'; // Default
    try {
      const programs = await this.getPrograms();
      for (const program of programs) {
        const groups = await this.getProgramGroups(program.id);
        const studentGroup = groups.find(group => group.id === studentData.groupId);
        if (studentGroup) {
          programName = program.name;
          break;
        }
      }
    } catch (error) {
      console.warn('Could not determine program name for student:', error);
    }
    
    return {
      id: studentData.id,
      name: studentData.name.split(' ')[0] || studentData.name,
      surname: studentData.name.split(' ').slice(1).join(' ') || '',
      age: studentData.age,
      profession: studentData.profession,
      photo: studentData.imageUrl || '/images/default-avatar.jpg',
      groupId: studentData.groupId,
      groupName: studentData.groupName,
      programName: programName,
      projects: studentData.projects ? studentData.projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        skills: this.extractSkillsFromTechStack(project.techStack),
        techStack: this.parseTechStack(project.techStack),
        images: project.images || [],
        githubUrl: project.githubLink,
        numberOfMonths: project.numberOfMonths || 1,
        type: 'monthly'
      })) : []
    };
  }
}

export default new ApiService(); 