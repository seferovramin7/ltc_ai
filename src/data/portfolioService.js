import ApiService from '../services/apiService.js';

class PortfolioService {
  constructor() {
    this.apiService = ApiService;
    this.cachedData = {
      programs: null,
      students: null,
      lastFetch: null
    };
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Check if cache is still valid
  isCacheValid() {
    return this.cachedData.lastFetch && 
           (Date.now() - this.cachedData.lastFetch) < this.cacheTimeout;
  }

  // Get all programs
  async getPrograms() {
    try {
      const programs = await this.apiService.getPrograms();
      return programs.map(program => ({
        id: this.apiService.generateProgramKey(program.name),
        name: program.name,
        description: this.apiService.generateProgramDescription(program.name),
        groups: program.groups || []
      }));
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  // Get groups for a specific program
  async getGroups(programId) {
    try {
      // First get all programs to find the actual program ID
      const programs = await this.apiService.getPrograms();
      const program = programs.find(p => this.apiService.generateProgramKey(p.name) === programId);
      
      if (!program) return [];
      
      const groups = await this.apiService.getProgramGroups(program.id);
      return groups.map(group => ({
        id: this.apiService.generateGroupKey(group.name),
        name: group.name,
        programId: programId,
        programName: group.programName,
        students: group.students || []
      }));
    } catch (error) {
      console.error('Error fetching groups:', error);
      return [];
    }
  }

  // Get all students (cached for performance)
  async getAllStudents() {
    if (this.isCacheValid() && this.cachedData.students) {
      return this.cachedData.students;
    }

    try {
      const students = await this.apiService.getAllStudents();
      this.cachedData.students = students;
      this.cachedData.lastFetch = Date.now();
      return students;
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  }

  // Get student by ID
  async getStudentById(studentId) {
    try {
      return await this.apiService.getStudentById(studentId);
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  }

  // Get students by program
  async getStudentsByProgram(programId) {
    const allStudents = await this.getAllStudents();
    return allStudents.filter(student => student.programId === programId);
  }

  // Get students by group
  async getStudentsByGroup(programId, groupId) {
    const allStudents = await this.getAllStudents();
    return allStudents.filter(student => 
      student.programId === programId && student.groupId === groupId
    );
  }

  // Get all projects
  async getAllProjects() {
    const allStudents = await this.getAllStudents();
    const projects = [];
    
    allStudents.forEach(student => {
      student.projects.forEach(project => {
        projects.push({
          ...project,
          studentId: student.id,
          studentName: `${student.name} ${student.surname}`,
          programId: student.programId,
          groupId: student.groupId
        });
      });
    });
    
    return projects;
  }

  // Get technologies (extracted from all projects)
  async getTechnologies() {
    const projects = await this.getAllProjects();
    const technologies = new Set();
    
    projects.forEach(project => {
      if (project.techStack) {
        project.techStack.forEach(tech => technologies.add(tech));
      }
    });
    
    return Array.from(technologies).sort();
  }

  // Get student projects
  async getStudentProjects(studentId) {
    const student = await this.getStudentById(studentId);
    return student ? student.projects : [];
  }

  // Clear cache (useful for forcing refresh)
  clearCache() {
    this.cachedData = {
      programs: null,
      students: null,
      lastFetch: null
    };
  }

  // Get portfolio data in the old format for backward compatibility
  async getPortfolioData() {
    try {
      const programs = await this.apiService.getPrograms();
      const portfolioData = { programs: {} };
      
      for (const program of programs) {
        const programKey = this.apiService.generateProgramKey(program.name);
        const groups = await this.apiService.getProgramGroups(program.id);
        
        portfolioData.programs[programKey] = {
          id: program.id,
          name: program.name,
          description: this.apiService.generateProgramDescription(program.name),
          groups: {}
        };
        
        for (const group of groups) {
          const groupKey = this.apiService.generateGroupKey(group.name);
          portfolioData.programs[programKey].groups[groupKey] = {
            id: group.id,
            name: group.name,
            description: `${group.name} qrupu - ${group.programName}`,
            students: {}
          };
          
          if (group.students) {
            for (const student of group.students) {
              const studentKey = this.apiService.generateStudentKey(student.name);
              portfolioData.programs[programKey].groups[groupKey].students[studentKey] = {
                id: student.id,
                name: student.name.split(' ')[0] || student.name,
                surname: student.name.split(' ').slice(1).join(' ') || '',
                age: student.age,
                profession: student.profession,
                photo: student.imageUrl || '/images/default-avatar.jpg',
                projects: {}
              };
              
              if (student.projects) {
                for (const project of student.projects) {
                  const projectKey = this.apiService.generateProjectKey(project.title);
                  portfolioData.programs[programKey].groups[groupKey].students[studentKey].projects[projectKey] = {
                    id: project.id,
                    type: 'monthly',
                    title: project.title,
                    description: project.description,
                    skills: this.apiService.extractSkillsFromTechStack(project.techStack),
                    techStack: this.apiService.parseTechStack(project.techStack),
                    images: project.images || [],
                    githubUrl: project.githubLink,
                    numberOfMonths: project.numberOfMonths || 1
                  };
                }
              }
            }
          }
        }
      }
      
      return portfolioData;
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      return { programs: {} };
    }
  }
}

export default new PortfolioService(); 