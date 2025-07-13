class OGImageService {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }

  // Initialize canvas for image generation
  initCanvas() {
    if (typeof window !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.canvas.width = 1200;
      this.canvas.height = 630;
      this.ctx = this.canvas.getContext('2d');
    }
  }

  // Generate Open Graph image for student portfolio
  async generateStudentOGImage(student, project = null) {
    if (typeof window === 'undefined') {
      // Server-side: return a URL to a generic image or use a service like Bannerbear
      return this.generateServerSideOGImageUrl(student, project);
    }

    this.initCanvas();
    
    // Background
    const gradient = this.ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 1200, 630);

    // LTC Lab Logo/Branding
    this.ctx.fillStyle = '#cb2360';
    this.ctx.font = 'bold 36px Inter, sans-serif';
    this.ctx.fillText('LTC Lab', 50, 60);
    
    this.ctx.fillStyle = '#64748b';
    this.ctx.font = '24px Inter, sans-serif';
    this.ctx.fillText('Suni intellekt kursları', 50, 95);

    // Student Info
    const studentName = `${student.name} ${student.surname}`;
    this.ctx.fillStyle = '#1a202c';
    this.ctx.font = 'bold 48px Inter, sans-serif';
    this.ctx.fillText(studentName, 50, 200);

    this.ctx.fillStyle = '#4a5568';
    this.ctx.font = '32px Inter, sans-serif';
    this.ctx.fillText(`${student.profession} • ${student.age} yaş`, 50, 250);

    // Program Info
    this.ctx.fillStyle = '#cb2360';
    this.ctx.font = 'bold 28px Inter, sans-serif';
    this.ctx.fillText(student.programName || 'Suni intellekt Proqramı', 50, 300);

    // Project Info (if available)
    if (project) {
      this.ctx.fillStyle = '#2d3748';
      this.ctx.font = 'bold 32px Inter, sans-serif';
      this.ctx.fillText('Son layihə:', 50, 380);
      
      this.ctx.fillStyle = '#1a202c';
      this.ctx.font = 'bold 36px Inter, sans-serif';
      const projectTitle = this.truncateText(project.title, 30);
      this.ctx.fillText(projectTitle, 50, 430);
      
      if (project.description) {
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '24px Inter, sans-serif';
        const description = this.truncateText(project.description, 80);
        this.wrapText(description, 50, 470, 700, 28);
      }
    } else if (student.projects && student.projects.length > 0) {
      this.ctx.fillStyle = '#cb2360';
      this.ctx.font = 'bold 32px Inter, sans-serif';
      this.ctx.fillText(`${student.projects.length} layihə hazırlanıb`, 50, 380);
    }

    // Student Avatar Area (placeholder for now)
    this.ctx.fillStyle = '#cb2360';
    this.ctx.beginPath();
    this.ctx.arc(950, 200, 80, 0, 2 * Math.PI);
    this.ctx.fill();
    
    // Avatar initials
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 48px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    const initials = this.getInitials(student.name, student.surname);
    this.ctx.fillText(initials, 950, 215);
    this.ctx.textAlign = 'left';

    // Footer
    this.ctx.fillStyle = '#64748b';
    this.ctx.font = '20px Inter, sans-serif';
    this.ctx.fillText('ai.ltclab.edu.az', 50, 580);

    // Convert canvas to blob and return URL
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, 'image/png');
    });
  }

  // Generate server-side OG image URL (using a service like Bannerbear or similar)
  generateServerSideOGImageUrl(student, project = null) {
    const studentName = encodeURIComponent(`${student.name} ${student.surname}`);
    const profession = encodeURIComponent(student.profession);
    const programName = encodeURIComponent(student.programName || 'Suni intellekt');
    
    // You could use services like:
    // - Bannerbear API
    // - Cloudinary Dynamic Images
    // - Custom image generation service
    // For now, return a placeholder URL that could be handled by your server
    
    const params = new URLSearchParams({
      name: studentName,
      profession: profession,
      program: programName,
      age: student.age,
      projectTitle: project ? project.title : '',
      projectCount: student.projects ? student.projects.length : 0
    });

    return `https://ai.ltclab.edu.az/api/og-image/student?${params.toString()}`;
  }

  // Helper methods
  getInitials(name, surname) {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';
    return firstInitial + lastInitial || '??';
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        this.ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, x, currentY);
  }

  // Generate a simple social share card
  async generateShareCard(student, project = null) {
    const ogImageUrl = await this.generateStudentOGImage(student, project);
    
    return {
      title: `${student.name} ${student.surname} - Portfolio | LTC Lab`,
      description: this.generateShareDescription(student, project),
      image: ogImageUrl,
      url: `https://ai.ltclab.edu.az/portfolio/${student.id}`
    };
  }

  generateShareDescription(student, project = null) {
    const studentName = `${student.name} ${student.surname}`;
    let description = `${studentName} - ${student.profession}, ${student.age} yaş. `;
    
    if (project) {
      description += `Son layihəsi: "${project.title}"`;
    } else if (student.projects && student.projects.length > 0) {
      description += `${student.projects.length} layihə ilə LTC Lab-da təhsil alır.`;
    } else {
      description += `LTC Lab-da suni intellekt sahəsində təhsil alır.`;
    }
    
    return description;
  }
}

export default new OGImageService(); 