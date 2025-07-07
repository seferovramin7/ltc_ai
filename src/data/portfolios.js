// Portfolio data structure
// Programs -> Groups -> Students -> Projects

export const portfolioData = {
  programs: {
    'ai-programming': {
      name: 'Suni intellekt Əsaslı Proqramlaşdırma',
      description: 'AI əsaslı proqramlaşdırma kursunda tələbələr müasir texnologiyalar ilə real layihələr hazırlayırlar.',
      groups: {
        'avernus': {
          name: 'Avernus',
          description: 'Birinci qrup - Suni intellekt əsaslı proqramlaşdırma',
          students: {
            'davit-haciyev': {
              name: 'Davit',
              surname: 'Hacıyev',
              age: 22,
              profession: 'Proqramçı',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-4': {
                  type: 'monthly',
                  month: 4,
                  title: 'Expense Tracker – Xərc İzləmə Sistemi',
                  description: 'İstifadəçilərə gündəlik xərclərini məbləğ, kateqoriya və tarixə görə əlavə etmək və aylıq analiz etmək imkanı verir. Xərclər vizual qrafiklər (pie chart və s.) ilə göstərilir.',
                  skills: [
                    'Full-stack tətbiq qurulması (Java Spring Boot + React)',
                    'JWT ilə autentifikasiya və təhlükəsizlik',
                    'REST API dizaynı və inteqrasiyası',
                    'Məlumatların vizualizasiyası (Recharts ilə)',
                    'MySQL ilə real layihə əsaslı verilənlər bazası dizaynı'
                  ],
                  techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'JWT', 'Recharts'],
                  images: [
                    '/images/ai_swe/avernus/davit/1751800471232.jpeg',
                    '/images/ai_swe/avernus/davit/1751800471238.jpeg',
                    '/images/ai_swe/avernus/davit/1751800471301.jpeg',
                    '/images/ai_swe/avernus/davit/1751800471333.jpeg',
                    '/images/ai_swe/avernus/davit/1751800471522.jpeg'
                  ],
                  githubUrl: 'https://github.com/davit-haciyev/expense-tracker',
                  liveUrl: 'https://expense-tracker-demo.com',
                  date: '2024-12-01'
                }
              }
            },
            'aysel-mammadli': {
              name: 'Aysel',
              surname: 'Məmmədli',
              age: 24,
              profession: 'Frontend Developer',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-3': {
                  type: 'monthly',
                  month: 3,
                  title: 'E-commerce Dashboard',
                  description: 'React və Node.js ilə hazırlanmış e-commerce admin paneli. Real-time məlumat analizi, məhsul idarəetməsi və satış statistikası.',
                  skills: [
                    'React ilə komponent əsaslı inkişaf',
                    'Node.js və Express.js backend',
                    'MongoDB verilənlər bazası dizaynı',
                    'Chart.js ilə məlumat vizualizasiyası',
                    'Material-UI komponent kitabxanası'
                  ],
                  techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Material-UI'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/aysel-mammadli/ecommerce-dashboard',
                  liveUrl: 'https://ecommerce-dashboard-demo.com',
                  date: '2024-11-15'
                },
                'final': {
                  type: 'final',
                  title: 'AI Chat Assistant',
                  description: 'OpenAI API istifadə edərək hazırlanmış intelligent chat assistant. Natural language processing və real-time cavab vermə qabiliyyəti.',
                  skills: [
                    'OpenAI API inteqrasiyası',
                    'WebSocket real-time kommunikasiya',
                    'React Hooks və Context API',
                    'Express.js middleware dizaynı',
                    'JWT authentication sistemi'
                  ],
                  techStack: ['React', 'Node.js', 'OpenAI API', 'WebSocket', 'JWT'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/aysel-mammadli/ai-chat-assistant',
                  liveUrl: 'https://ai-chat-assistant-demo.com',
                  date: '2024-12-20'
                }
              }
            }
          }
        },
        'phoenix': {
          name: 'Phoenix',
          description: 'İkinci qrup - Suni intellekt əsaslı proqramlaşdırma',
          students: {
            'elvin-aliyev': {
              name: 'Elvin',
              surname: 'Əliyev',
              age: 26,
              profession: 'Backend Developer',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-2': {
                  type: 'monthly',
                  month: 2,
                  title: 'Task Management System',
                  description: 'Komanda üçün task management sistemi. Kanban board, user roles, və real-time notifications ilə.',
                  skills: [
                    'Spring Boot microservices arxitekturası',
                    'PostgreSQL verilənlər bazası dizaynı',
                    'Redis cache sistemi',
                    'JWT və Spring Security',
                    'Docker containerization'
                  ],
                  techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/elvin-aliyev/task-management',
                  liveUrl: 'https://task-management-demo.com',
                  date: '2024-10-30'
                }
              }
            },
            'leyla-huseynova': {
              name: 'Leyla',
              surname: 'Hüseynova',
              age: 23,
              profession: 'Full Stack Developer',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-5': {
                  type: 'monthly',
                  month: 5,
                  title: 'Social Media Analytics',
                  description: 'Sosial media platformalar üçün analytics dashboard. Data visualization və trend analysis.',
                  skills: [
                    'Vue.js frontend framework',
                    'Python Django backend',
                    'D3.js data visualization',
                    'PostgreSQL database design',
                    'REST API development'
                  ],
                  techStack: ['Vue.js', 'Python', 'Django', 'D3.js', 'PostgreSQL'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/leyla-huseynova/social-analytics',
                  liveUrl: 'https://social-analytics-demo.com',
                  date: '2024-12-10'
                }
              }
            }
          }
        }
      }
    },
    'ai-engineering': {
      name: 'Suni intellekt Mühəndisliyi',
      description: 'AI mühəndisliyi kursunda tələbələr maşın öyrənməsi və dərin öyrənmə texnologiyalarını öyrənirlər.',
      groups: {
        'alpha': {
          name: 'Alpha',
          description: 'Birinci qrup - AI Mühəndisliyi',
          students: {
            'ramin-safarov': {
              name: 'Ramin',
              surname: 'Səfərov',
              age: 25,
              profession: 'Data Scientist',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-2': {
                  type: 'monthly',
                  month: 2,
                  title: 'Customer Churn Prediction',
                  description: 'Machine learning modeli ilə müştəri churn prediction. Feature engineering və model optimization.',
                  skills: [
                    'Python və Pandas data manipulation',
                    'Scikit-learn machine learning',
                    'Feature engineering və selection',
                    'Model evaluation və optimization',
                    'Matplotlib və Seaborn visualization'
                  ],
                  techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Jupyter'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/ramin-safarov/churn-prediction',
                  date: '2024-11-20'
                },
                'final': {
                  type: 'final',
                  title: 'Computer Vision Object Detection',
                  description: 'YOLO algoritmi ilə real-time object detection sistemi. Webcam və video faylları üçün.',
                  skills: [
                    'TensorFlow və Keras deep learning',
                    'Computer Vision texnikaları',
                    'YOLO algoritmi implementation',
                    'OpenCV image processing',
                    'Real-time video processing'
                  ],
                  techStack: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'NumPy'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/ramin-safarov/object-detection',
                  liveUrl: 'https://object-detection-demo.com',
                  date: '2024-12-25'
                }
              }
            },
            'nigar-qasimova': {
              name: 'Nigar',
              surname: 'Qasımova',
              age: 22,
              profession: 'ML Engineer',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-3': {
                  type: 'monthly',
                  month: 3,
                  title: 'Sentiment Analysis System',
                  description: 'NLP əsaslı sentiment analysis sistemi. Twitter və product reviews üçün real-time analiz.',
                  skills: [
                    'Natural Language Processing (NLP)',
                    'BERT model fine-tuning',
                    'Text preprocessing və tokenization',
                    'Flask web application development',
                    'API development və deployment'
                  ],
                  techStack: ['Python', 'BERT', 'Flask', 'NLTK', 'Transformers'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/nigar-qasimova/sentiment-analysis',
                  liveUrl: 'https://sentiment-analysis-demo.com',
                  date: '2024-12-05'
                }
              }
            }
          }
        },
        'beta': {
          name: 'Beta',
          description: 'İkinci qrup - AI Mühəndisliyi',
          students: {
            'orkhan-mammadov': {
              name: 'Orxan',
              surname: 'Məmmədov',
              age: 27,
              profession: 'AI Researcher',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-1': {
                  type: 'monthly',
                  month: 1,
                  title: 'Stock Price Prediction',
                  description: 'LSTM neural networks ilə stock price prediction. Historical data analizi və future trend prediction.',
                  skills: [
                    'Time series analysis',
                    'LSTM neural networks',
                    'Financial data processing',
                    'TensorFlow model building',
                    'Data visualization with Plotly'
                  ],
                  techStack: ['Python', 'TensorFlow', 'LSTM', 'Plotly', 'Pandas'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/orkhan-mammadov/stock-prediction',
                  date: '2024-10-15'
                }
              }
            },
            'sevda-ismayilova': {
              name: 'Sevda',
              surname: 'İsmayılova',
              age: 24,
              profession: 'Data Analyst',
              photo: '/images/default-avatar.jpg',
              projects: {
                'month-4': {
                  type: 'monthly',
                  month: 4,
                  title: 'Recommendation System',
                  description: 'Collaborative filtering və content-based recommendation sistemi. E-commerce platform üçün product recommendations.',
                  skills: [
                    'Collaborative filtering algorithms',
                    'Content-based recommendation',
                    'Matrix factorization techniques',
                    'A/B testing methodology',
                    'Performance metrics evaluation'
                  ],
                  techStack: ['Python', 'Surprise', 'Pandas', 'NumPy', 'Matplotlib'],
                  images: ['/images/project-placeholder.jpg'],
                  githubUrl: 'https://github.com/sevda-ismayilova/recommendation-system',
                  liveUrl: 'https://recommendation-demo.com',
                  date: '2024-12-15'
                }
              }
            }
          }
        }
      }
    }
  }
};

// Helper functions
export function getAllStudents() {
  const students = [];
  
  Object.keys(portfolioData.programs).forEach(programId => {
    const program = portfolioData.programs[programId];
    Object.keys(program.groups).forEach(groupId => {
      const group = program.groups[groupId];
      Object.keys(group.students).forEach(studentId => {
        const student = group.students[studentId];
        const studentProjects = [];
        
        Object.keys(student.projects).forEach(projectId => {
          const project = student.projects[projectId];
          studentProjects.push({
            id: projectId,
            ...project
          });
        });
        
        students.push({
          id: studentId,
          ...student,
          programId,
          groupId,
          programName: program.name,
          groupName: group.name,
          projects: studentProjects
        });
      });
    });
  });
  
  return students;
}

export function getAllProjects() {
  const projects = [];
  
  Object.keys(portfolioData.programs).forEach(programId => {
    const program = portfolioData.programs[programId];
    Object.keys(program.groups).forEach(groupId => {
      const group = program.groups[groupId];
      Object.keys(group.students).forEach(studentId => {
        const student = group.students[studentId];
        Object.keys(student.projects).forEach(projectId => {
          const project = student.projects[projectId];
          projects.push({
            id: projectId,
            ...project,
            studentId,
            studentName: `${student.name} ${student.surname}`,
            programId,
            groupId
          });
        });
      });
    });
  });
  
  return projects;
}

export function getStudentById(studentId) {
  const allStudents = getAllStudents();
  return allStudents.find(student => student.id === studentId);
}

export function getStudentsByProgram(programId) {
  return getAllStudents().filter(student => student.programId === programId);
}

export function getStudentsByGroup(programId, groupId) {
  return getAllStudents().filter(student => 
    student.programId === programId && student.groupId === groupId
  );
}

export const getPrograms = () => {
  return Object.keys(portfolioData.programs).map(key => ({
    id: key,
    ...portfolioData.programs[key]
  }));
};

export const getGroups = (programId) => {
  const program = portfolioData.programs[programId];
  if (!program) return [];
  
  return Object.keys(program.groups).map(key => ({
    id: key,
    programId,
    ...program.groups[key]
  }));
};

export const getStudentProjects = (programId, groupId, studentId) => {
  const student = portfolioData.programs[programId]?.groups[groupId]?.students[studentId];
  if (!student) return [];
  
  return Object.keys(student.projects).map(key => ({
    id: key,
    programId,
    groupId,
    studentId,
    ...student.projects[key]
  }));
};

export const getTechnologies = () => {
  const technologies = new Set();
  
  getAllProjects().forEach(project => {
    project.techStack.forEach(tech => technologies.add(tech));
  });
  
  return Array.from(technologies).sort();
}; 