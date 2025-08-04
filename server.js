import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import ServerApiService from './server-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const apiService = new ServerApiService();

// Make fetch globally available for the server API service
global.fetch = fetch;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// Function to generate meta tags for student portfolios
async function generateStudentMeta(studentId) {
  try {
    const student = await apiService.getStudentById(studentId);
    
    if (!student) {
      // Use fallback data
      const fallbackStudent = apiService.getFallbackStudentData(studentId);
      return generateMetaFromStudent(fallbackStudent);
    }
    
    return generateMetaFromStudent(student);
  } catch (error) {
    console.error('Error generating student meta:', error);
    // Use fallback data
    const fallbackStudent = apiService.getFallbackStudentData(studentId);
    return generateMetaFromStudent(fallbackStudent);
  }
}

function generateMetaFromStudent(student) {
  const studentName = `${student.name} ${student.surname}`;
  const projectHighlight = student.projects && student.projects.length > 0 ? student.projects[0] : null;
  
  let title = `${studentName} - Portfolio | LTC Lab AI Tələbəsi`;
  let description = `${studentName} - ${student.profession}, ${student.age} yaş. `;
  
  if (projectHighlight) {
    description += `Son layihəsi: "${projectHighlight.title}" - ${projectHighlight.description?.substring(0, 100)}...`;
    title = `${studentName} - ${projectHighlight.title} | LTC Lab Portfolio`;
  } else if (student.projects && student.projects.length > 0) {
    const projectCount = student.projects.length;
    description += `${projectCount} layihə ilə LTC Lab-da süni intellekt sahəsində təhsil alır.`;
  } else {
    description += `LTC Lab-da süni intellekt sahəsində təhsil alır.`;
  }
  
  description += ` ${student.programName || 'Süni intellekt'} proqramı tələbəsi.`;

  // Use student photo if available, otherwise use logo
  let imageUrl = 'https://ai.ltclab.edu.az/lts_logo.29f6d82c.svg';
  if (student.photo && student.photo !== '/images/default-avatar.jpg') {
    imageUrl = student.photo.startsWith('http') ? student.photo : `https://ai.ltclab.edu.az${student.photo}`;
  }
  
  return {
    title,
    description,
    image: imageUrl,
    url: `https://ai.ltclab.edu.az/portfolio/${student.id}`,
    studentName,
    profession: student.profession
  };
}

// Function to inject meta tags into HTML
function injectMetaTags(html, meta) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${meta.description}"`)
    .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${meta.image}"`)
    .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${meta.url}"`)
    .replace(/<meta property="twitter:title" content=".*?"/, `<meta property="twitter:title" content="${meta.title}"`)
    .replace(/<meta property="twitter:description" content=".*?"/, `<meta property="twitter:description" content="${meta.description}"`)
    .replace(/<meta property="twitter:image" content=".*?"/, `<meta property="twitter:image" content="${meta.image}"`)
    .replace(/<meta property="twitter:url" content=".*?"/, `<meta property="twitter:url" content="${meta.url}"`)
    .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${meta.description}"`);
}

// Check if the request is from a social media crawler
function isCrawler(userAgent) {
  const crawlers = [
    'facebookexternalhit',
    'Facebot',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'TelegramBot',
    'SkypeUriPreview',
    'SlackBot',
    'DiscordBot',
    'Applebot'
  ];
  
  return crawlers.some(crawler => 
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
}

// Handle portfolio routes with dynamic meta tags
app.get('/portfolio/:id', async (req, res) => {
  const userAgent = req.get('User-Agent') || '';
  const studentId = req.params.id;
  
  try {
    // Read the base HTML file
    const htmlPath = join(__dirname, 'dist', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // If it's a social media crawler, inject dynamic meta tags
    if (isCrawler(userAgent)) {
      const meta = await generateStudentMeta(studentId);
      html = injectMetaTags(html, meta);
    }
    
    res.send(html);
  } catch (error) {
    console.error('Error serving portfolio page:', error);
    // Fallback to basic HTML
    const htmlPath = join(__dirname, 'dist', 'index.html');
    res.sendFile(htmlPath);
  }
});

// Handle portfolio listing page
app.get('/portfolio', (req, res) => {
  const userAgent = req.get('User-Agent') || '';
  
  // Read the base HTML file
  const htmlPath = join(__dirname, 'dist', 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // If it's a social media crawler, inject portfolio listing meta tags
  if (isCrawler(userAgent)) {
    const meta = {
      title: 'Tələbə Portfolioları - LTC Lab AI Kursları | Bakı',
      description: 'LTC Lab tələbələrinin real AI layihələri və portfolioları. Süni intellekt kurslarımızda hazırlanan layihələri kəşf edin. AI proqramlaşdırma və maşın öyrənməsi nümunələri.',
      image: 'https://ai.ltclab.edu.az/lts_logo.29f6d82c.svg',
      url: 'https://ai.ltclab.edu.az/portfolio'
    };
    html = injectMetaTags(html, meta);
  }
  
  res.send(html);
});

// Handle SPA routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
}); 