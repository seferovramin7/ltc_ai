class ImageService {
  constructor() {
    this.loadedImages = new Set();
    this.imageCache = new Map();
  }

  // Preload critical images
  preloadImage(src) {
    if (this.loadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload multiple images
  async preloadImages(imageSources) {
    const promises = imageSources.map(src => this.preloadImage(src).catch(() => {
      console.warn(`Failed to preload image: ${src}`);
    }));
    
    await Promise.allSettled(promises);
  }

  // Get optimized image URL (placeholder for future CDN integration)
  getOptimizedUrl(originalUrl, options = {}) {
    const { width, height, quality = 80, format = 'webp' } = options;
    
    // For now, return original URL
    // In the future, this could integrate with a CDN service
    return originalUrl;
  }

  // Create a placeholder data URL for images while loading
  createPlaceholder(width = 300, height = 200, backgroundColor = '#f3f4f6') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add loading text
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Yüklənir...', width / 2, height / 2);
    
    return canvas.toDataURL();
  }

  // Lazy load images with intersection observer
  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      return; // Fallback for older browsers
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const dataSrc = img.getAttribute('data-src');
          
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    return imageObserver;
  }

  // Optimize image loading for portfolio
  async optimizePortfolioImages(students) {
    const imagesToPreload = [];
    
    // Collect avatar images for preloading
    students.forEach(student => {
      if (student.photo && student.photo !== '/images/default-avatar.jpg') {
        imagesToPreload.push(student.photo);
      }
    });

    // Preload first few avatar images for better perceived performance
    const priorityImages = imagesToPreload.slice(0, 6);
    await this.preloadImages(priorityImages);
    
    // Preload remaining images in background
    setTimeout(() => {
      const remainingImages = imagesToPreload.slice(6);
      this.preloadImages(remainingImages);
    }, 1000);
  }

  // Handle image error with retry logic
  handleImageError(event, retryCount = 0) {
    const img = event.target;
    const maxRetries = 2;
    
    if (retryCount < maxRetries) {
      setTimeout(() => {
        img.src = img.src + '?retry=' + (retryCount + 1);
      }, 1000 * (retryCount + 1));
    } else {
      // Fallback to default image
      img.src = '/images/default-avatar.jpg';
    }
  }

  // Get image dimensions without loading full image
  async getImageDimensions(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Clear image cache
  clearCache() {
    this.loadedImages.clear();
    this.imageCache.clear();
  }
}

export default new ImageService(); 