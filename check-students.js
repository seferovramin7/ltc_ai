import fetch from 'node-fetch';

global.fetch = fetch;

async function checkStudents() {
  try {
    console.log('🔍 Checking available students in the API...\n');
    
    const response = await fetch('https://ltclab-api-production.up.railway.app/api/programs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const programs = await response.json();
    console.log(`📚 Found ${programs.length} programs\n`);
    
    for (const program of programs) {
      console.log(`📖 Program: ${program.name} (ID: ${program.id})`);
      
      try {
        const groupsResponse = await fetch(`https://ltclab-api-production.up.railway.app/api/programs/${program.id}/groups`);
        if (!groupsResponse.ok) {
          console.log(`   ❌ Could not fetch groups for program ${program.id}`);
          continue;
        }
        
        const groups = await groupsResponse.json();
        
        for (const group of groups) {
          console.log(`   👥 Group: ${group.name} (ID: ${group.id})`);
          if (group.students && group.students.length > 0) {
            console.log(`      👨‍🎓 Students: ${group.students.length}`);
            group.students.slice(0, 5).forEach(student => {
              console.log(`         - ${student.name} (ID: ${student.id})`);
            });
            if (group.students.length > 5) {
              console.log(`         ... and ${group.students.length - 5} more`);
            }
          } else {
            console.log(`      (No students in this group)`);
          }
        }
      } catch (error) {
        console.log(`   ❌ Error fetching groups for program ${program.id}:`, error.message);
      }
      
      console.log(''); // Empty line between programs
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkStudents(); 