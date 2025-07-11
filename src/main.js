import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PerformanceService from './services/performanceService.js'

// Initialize global performance monitoring
PerformanceService.init();

// Create and mount the app
const app = createApp(App);
app.use(router);
app.mount('#app');

// Add global error handling for better debugging
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info);
  
  // In production, you might want to send this to an error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: sendToErrorTrackingService(err, info);
  }
};
