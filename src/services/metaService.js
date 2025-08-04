class MetaService {
  constructor() {
    this.defaultMeta = {
      title: 'Süni intellekt kursları LTC Lab - AI Proqramlaşdırma və Maşın Öyrənməsi | Bakı',
      description: 'Süni intellekt kursları LTC Lab-da! AI proqramlaşdırma, maşın öyrənməsi, dərin öyrənmə öyrənin. Azərbaycanda ən yaxşı süni intellekt təhsili.',
      image: 'https://ai.ltclab.edu.az/lts_logo.29f6d82c.svg',
      url: 'https://ai.ltclab.edu.az/',
      type: 'website'
    }
  }

  // Set meta tag content
  setMetaTag(property, content) {
    // Handle both property and name attributes
    let element = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`)
    
    if (element) {
      element.setAttribute('content', content)
    } else {
      // Create new meta tag if it doesn't exist
      element = document.createElement('meta')
      if (property.startsWith('og:') || property.startsWith('twitter:')) {
        element.setAttribute('property', property)
      } else {
        element.setAttribute('name', property)
      }
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  // Set page title
  setTitle(title) {
    document.title = title
    this.setMetaTag('og:title', title)
    this.setMetaTag('twitter:title', title)
  }

  // Set page description
  setDescription(description) {
    this.setMetaTag('description', description)
    this.setMetaTag('og:description', description)
    this.setMetaTag('twitter:description', description)
  }

  // Set page image
  setImage(imageUrl) {
    // Ensure absolute URL
    const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://ai.ltclab.edu.az${imageUrl}`
    
    this.setMetaTag('og:image', absoluteImageUrl)
    this.setMetaTag('twitter:image', absoluteImageUrl)
    this.setMetaTag('og:image:width', '1200')
    this.setMetaTag('og:image:height', '630')
    this.setMetaTag('og:image:type', 'image/jpeg')
  }

  // Set page URL
  setUrl(url) {
    const absoluteUrl = url.startsWith('http') ? url : `https://ai.ltclab.edu.az${url}`
    this.setMetaTag('og:url', absoluteUrl)
    this.setMetaTag('twitter:url', absoluteUrl)
    this.setMetaTag('canonical', absoluteUrl)
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', absoluteUrl)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', absoluteUrl)
      document.head.appendChild(canonical)
    }
  }

  // Set page type
  setType(type) {
    this.setMetaTag('og:type', type)
  }

  // Set student portfolio meta tags
  setStudentPortfolioMeta(student, projectHighlight = null) {
    if (!student) {
      this.resetToDefault()
      return
    }

    // Generate title
    const studentName = `${student.name} ${student.surname}`
    let title = `${studentName} - Portfolio | LTC Lab AI Tələbəsi`
    
    // Generate description
    let description = `${studentName} - ${student.profession}, ${student.age} yaş. `
    
    if (projectHighlight) {
      description += `Son layihəsi: "${projectHighlight.title}" - ${projectHighlight.description?.substring(0, 100)}...`
      title = `${studentName} - ${projectHighlight.title} | LTC Lab Portfolio`
    } else if (student.projects && student.projects.length > 0) {
      const projectCount = student.projects.length
      description += `${projectCount} layihə ilə LTC Lab-da süni intellekt sahəsində təhsil alır.`
    } else {
      description += `LTC Lab-da süni intellekt sahəsində təhsil alır.`
    }
    
    description += ` ${student.programName || 'Süni intellekt'} proqramı tələbəsi.`

    // Set image - use student photo or default
    let imageUrl = student.photo
    if (!imageUrl || imageUrl === '/images/default-avatar.jpg') {
      // Use a generated avatar or default image
      imageUrl = '/lts_logo.29f6d82c.svg'
    }

    // Set current page URL
    const currentUrl = `/portfolio/${student.id}`

    // Apply all meta tags
    this.setTitle(title)
    this.setDescription(description)
    this.setImage(imageUrl)
    this.setUrl(currentUrl)
    this.setType('profile')
    
    // Additional LinkedIn-specific meta tags
    this.setMetaTag('og:site_name', 'LTC Lab - Süni intellekt kursları')
    this.setMetaTag('twitter:card', 'summary_large_image')
    this.setMetaTag('twitter:site', '@ltclab')
    
    // Add author information
    this.setMetaTag('article:author', studentName)
    this.setMetaTag('profile:first_name', student.name)
    this.setMetaTag('profile:last_name', student.surname)
    
    // Add structured data for better SEO
    this.setStructuredData(student, projectHighlight)
  }

  // Set structured data for student portfolio
  setStructuredData(student, projectHighlight = null) {
    const studentName = `${student.name} ${student.surname}`
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": studentName,
      "jobTitle": student.profession,
      "age": student.age,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "LTC Lab",
        "url": "https://ai.ltclab.edu.az/"
      },
      "url": `https://ai.ltclab.edu.az/portfolio/${student.id}`,
      "image": student.photo && student.photo !== '/images/default-avatar.jpg' ? 
               `https://ai.ltclab.edu.az${student.photo}` : 
               "https://ai.ltclab.edu.az/lts_logo.29f6d82c.svg",
      "description": `${studentName} - LTC Lab süni intellekt proqramı tələbəsi. ${student.profession}, ${student.age} yaş.`
    }

    // Add projects if available
    if (student.projects && student.projects.length > 0) {
      structuredData.hasCredential = student.projects.map(project => ({
        "@type": "EducationalOccupationalCredential",
        "name": project.title,
        "description": project.description,
        "credentialCategory": "certificate",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "LTC Lab"
        }
      }))
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-student-portfolio]')
    if (existingScript) {
      existingScript.remove()
    }

    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-student-portfolio', 'true')
    script.textContent = JSON.stringify(structuredData, null, 2)
    document.head.appendChild(script)
  }

  // Reset to default meta tags
  resetToDefault() {
    this.setTitle(this.defaultMeta.title)
    this.setDescription(this.defaultMeta.description)
    this.setImage(this.defaultMeta.image)
    this.setUrl(this.defaultMeta.url)
    this.setType(this.defaultMeta.type)
    
    // Remove student-specific structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-student-portfolio]')
    if (existingScript) {
      existingScript.remove()
    }
  }

  // Set portfolio listing meta tags
  setPortfolioListingMeta() {
    this.setTitle('Tələbə Portfolioları - LTC Lab AI Kursları | Bakı')
    this.setDescription('LTC Lab tələbələrinin real AI layihələri və portfolioları. Süni intellekt kurslarımızda hazırlanan layihələri kəşf edin. AI proqramlaşdırma və maşın öyrənməsi nümunələri.')
    this.setImage('/lts_logo.29f6d82c.svg')
    this.setUrl('/portfolio')
    this.setType('website')
  }
}

export default new MetaService() 