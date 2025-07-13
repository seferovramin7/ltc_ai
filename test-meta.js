import fetch from 'node-fetch';
import ServerApiService from './server-api.js';

// Make fetch globally available
global.fetch = fetch;

async function testMetaGeneration() {
  console.log('🧪 Testing Meta Tag Generation for Social Media Sharing\n');
  
  const apiService = new ServerApiService();
  
  // Test with a real student ID
  const studentId = 14; // Using the example from the user query
  
  try {
    console.log(`📊 Fetching student data for ID: ${studentId}`);
    const student = await apiService.getStudentById(studentId);
    
    if (student) {
      console.log('✅ Student data fetched successfully:');
      console.log(`   Name: ${student.name} ${student.surname}`);
      console.log(`   Profession: ${student.profession}`);
      console.log(`   Age: ${student.age}`);
      console.log(`   Program: ${student.programName}`);
      console.log(`   Projects: ${student.projects.length}`);
      
      // Generate meta tags
      const studentName = `${student.name} ${student.surname}`;
      const projectHighlight = student.projects && student.projects.length > 0 ? student.projects[0] : null;
      
      let title = `${studentName} - Portfolio | LTC Lab AI Tələbəsi`;
      let description = `${studentName} - ${student.profession}, ${student.age} yaş. `;
      
      if (projectHighlight) {
        description += `Son layihəsi: "${projectHighlight.title}" - ${projectHighlight.description?.substring(0, 100)}...`;
        title = `${studentName} - ${projectHighlight.title} | LTC Lab Portfolio`;
      } else if (student.projects && student.projects.length > 0) {
        const projectCount = student.projects.length;
        description += `${projectCount} layihə ilə LTC Lab-da suni intellekt sahəsində təhsil alır.`;
      } else {
        description += `LTC Lab-da suni intellekt sahəsində təhsil alır.`;
      }
      
      description += ` ${student.programName || 'Suni intellekt'} proqramı tələbəsi.`;

      // Use student photo if available, otherwise use logo
      let imageUrl = 'https://ai.ltclab.edu.az/lts_logo.29f6d82c.svg';
      if (student.photo && student.photo !== '/images/default-avatar.jpg') {
        imageUrl = student.photo.startsWith('http') ? student.photo : `https://ai.ltclab.edu.az${student.photo}`;
      }
      
      console.log('\n🎯 Generated Meta Tags for LinkedIn/Social Media:');
      console.log('='.repeat(60));
      console.log(`📝 Title: ${title}`);
      console.log(`📄 Description: ${description}`);
      console.log(`🖼️  Image: ${imageUrl}`);
      console.log(`🔗 URL: https://ai.ltclab.edu.az/portfolio/${student.id}`);
      console.log('='.repeat(60));
      
      // Test HTML meta tag injection
      const sampleHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Default Title</title>
  <meta property="og:title" content="Default OG Title">
  <meta property="og:description" content="Default OG Description">
  <meta property="og:image" content="default-image.jpg">
  <meta property="og:url" content="default-url">
  <meta property="twitter:title" content="Default Twitter Title">
  <meta property="twitter:description" content="Default Twitter Description">
  <meta property="twitter:image" content="default-twitter-image.jpg">
  <meta name="description" content="Default meta description">
</head>
<body>Content</body>
</html>`;

      const meta = {
        title,
        description,
        image: imageUrl,
        url: `https://ai.ltclab.edu.az/portfolio/${student.id}`
      };

      const injectedHTML = sampleHTML
        .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
        .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${meta.title}"`)
        .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${meta.description}"`)
        .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${meta.image}"`)
        .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${meta.url}"`)
        .replace(/<meta property="twitter:title" content=".*?"/, `<meta property="twitter:title" content="${meta.title}"`)
        .replace(/<meta property="twitter:description" content=".*?"/, `<meta property="twitter:description" content="${meta.description}"`)
        .replace(/<meta property="twitter:image" content=".*?"/, `<meta property="twitter:image" content="${meta.image}"`)
        .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${meta.description}"`);

      console.log('\n🔧 Sample HTML with injected meta tags:');
      console.log(injectedHTML);
      
    } else {
      console.log('❌ Student not found, testing fallback data...');
      
      const fallbackStudent = apiService.getFallbackStudentData(studentId);
      console.log('✅ Fallback data generated:');
      console.log(`   Name: ${fallbackStudent.name} ${fallbackStudent.surname}`);
      console.log(`   Profession: ${fallbackStudent.profession}`);
      console.log(`   Age: ${fallbackStudent.age}`);
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  }
  
  console.log('\n🎉 Meta tag generation test completed!');
  console.log('\n📋 Next steps to test:');
  console.log('1. Start the server: node server.js');
  console.log('2. Test with social media validators:');
  console.log('   - Facebook: https://developers.facebook.com/tools/debug/');
  console.log('   - LinkedIn: https://www.linkedin.com/post-inspector/');
  console.log('   - Twitter: https://cards-dev.twitter.com/validator');
  console.log('3. Test URL: https://ai.ltclab.edu.az/portfolio/14');
}

// Run the test
testMetaGeneration().catch(console.error); 