class CacheService {
  constructor() {
    this.memoryCache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds
    this.storagePrefix = 'ltc_cache_';
  }

  // Generate cache key
  generateKey(type, params = {}) {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${type}${paramString ? `_${paramString}` : ''}`;
  }

  // Check if cache entry is still valid
  isValid(timestamp) {
    return timestamp && (Date.now() - timestamp) < this.cacheTimeout;
  }

  // Get from memory cache first, then localStorage
  get(key) {
    // Try memory cache first
    const memoryData = this.memoryCache.get(key);
    if (memoryData && this.isValid(memoryData.timestamp)) {
      return memoryData.data;
    }

    // Try localStorage
    try {
      const storageKey = this.storagePrefix + key;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (this.isValid(parsed.timestamp)) {
          // Restore to memory cache
          this.memoryCache.set(key, parsed);
          return parsed.data;
        } else {
          // Remove expired data
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.warn('localStorage access failed:', error);
    }

    return null;
  }

  // Set data in both memory cache and localStorage
  set(key, data) {
    const cacheEntry = {
      data,
      timestamp: Date.now()
    };

    // Set in memory cache
    this.memoryCache.set(key, cacheEntry);

    // Set in localStorage with error handling
    try {
      const storageKey = this.storagePrefix + key;
      localStorage.setItem(storageKey, JSON.stringify(cacheEntry));
    } catch (error) {
      console.warn('localStorage write failed:', error);
      // If localStorage is full, try to clear old entries
      this.clearExpiredFromStorage();
    }
  }

  // Clear specific cache entry
  clear(key) {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(this.storagePrefix + key);
    } catch (error) {
      console.warn('localStorage clear failed:', error);
    }
  }

  // Clear all cache
  clearAll() {
    this.memoryCache.clear();
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('localStorage clearAll failed:', error);
    }
  }

  // Clear expired entries from localStorage
  clearExpiredFromStorage() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (!this.isValid(parsed.timestamp)) {
                localStorage.removeItem(key);
              }
            }
          } catch (error) {
            // Remove corrupted entries
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('clearExpiredFromStorage failed:', error);
    }
  }

  // Get cache statistics
  getStats() {
    const memorySize = this.memoryCache.size;
    let storageSize = 0;
    let expiredCount = 0;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          storageSize++;
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (!this.isValid(parsed.timestamp)) {
                expiredCount++;
              }
            }
          } catch (error) {
            expiredCount++;
          }
        }
      });
    } catch (error) {
      console.warn('getStats failed:', error);
    }

    return {
      memorySize,
      storageSize,
      expiredCount,
      cacheTimeout: this.cacheTimeout
    };
  }

  // Preload cache with critical data
  async preload(dataLoader) {
    try {
      const data = await dataLoader();
      return data;
    } catch (error) {
      console.error('Cache preload failed:', error);
      throw error;
    }
  }
}

export default new CacheService(); 