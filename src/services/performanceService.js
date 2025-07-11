class PerformanceService {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
  }

  // Start timing a operation
  startTiming(label) {
    this.metrics.set(label, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  // End timing and calculate duration
  endTiming(label) {
    const metric = this.metrics.get(label);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${label}: ${metric.duration.toFixed(2)}ms`);
      }
      
      return metric.duration;
    }
    return null;
  }

  // Get timing for a specific operation
  getTiming(label) {
    return this.metrics.get(label);
  }

  // Get all metrics
  getAllMetrics() {
    const results = {};
    this.metrics.forEach((value, key) => {
      results[key] = value;
    });
    return results;
  }

  // Monitor Core Web Vitals
  observeWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  observeLCP() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🎨 LCP:', lastEntry.startTime.toFixed(2) + 'ms');
      }
      
      this.metrics.set('LCP', {
        value: lastEntry.startTime,
        element: lastEntry.element
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(observer);
  }

  observeFID() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚡ FID:', entry.processingStart - entry.startTime + 'ms');
        }
        
        this.metrics.set('FID', {
          value: entry.processingStart - entry.startTime
        });
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
    this.observers.push(observer);
  }

  observeCLS() {
    if (!('PerformanceObserver' in window)) return;
    
    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📐 CLS:', clsValue.toFixed(4));
      }
      
      this.metrics.set('CLS', { value: clsValue });
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(observer);
  }

  // Monitor resource loading
  observeResourceTiming() {
    if (!('PerformanceObserver' in window)) return;
    
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.initiatorType === 'img' && entry.duration > 1000) {
          console.warn('🐌 Slow image loading:', entry.name, entry.duration + 'ms');
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
    this.observers.push(observer);
  }

  // Get navigation timing
  getNavigationTiming() {
    if (!performance.getEntriesByType) return null;
    
    const navigation = performance.getEntriesByType('navigation')[0];
    if (!navigation) return null;
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
    };
  }

  // Get a performance report
  getPerformanceReport() {
    return {
      timing: this.getAllMetrics(),
      navigation: this.getNavigationTiming(),
      memory: this.getMemoryInfo(),
      connection: this.getConnectionInfo()
    };
  }

  // Get memory information
  getMemoryInfo() {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  // Get connection information
  getConnectionInfo() {
    if (navigator.connection) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      };
    }
    return null;
  }

  // Optimize for slow connections
  optimizeForConnection() {
    const connection = this.getConnectionInfo();
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      return {
        reduceImageQuality: true,
        delayNonCriticalRequests: true,
        enableDataSaver: true
      };
    }
    return {
      reduceImageQuality: false,
      delayNonCriticalRequests: false,
      enableDataSaver: false
    };
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  // Initialize performance monitoring
  init() {
    this.observeWebVitals();
    this.observeResourceTiming();
    
    // Start timing page load
    this.startTiming('pageLoad');
    
    // End timing when page is fully loaded
    window.addEventListener('load', () => {
      this.endTiming('pageLoad');
    });
  }
}

export default new PerformanceService(); 