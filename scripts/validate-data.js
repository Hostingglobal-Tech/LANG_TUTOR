const fs = require('fs');
const path = require('path');

// Load and validate greetings data
function validateGreetingsData() {
  const dataPath = path.join(__dirname, '../src/data/greetings.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  console.log('🔍 데이터 구조 검증 중...\n');
  
  // Validate metadata
  console.log('📊 메타데이터:');
  console.log(`- 버전: ${data.metadata.version}`);
  console.log(`- 총 언어 수: ${data.metadata.totalLanguages}`);
  console.log(`- 총 인사말 수: ${data.metadata.totalGreetings}`);
  console.log(`- 대상 연령: ${data.metadata.targetAge}`);
  
  // Validate languages
  console.log('\n🌍 언어 목록:');
  data.languages.forEach(lang => {
    console.log(`- ${lang.flag} ${lang.name} (${lang.nativeName}) [${lang.code}]`);
  });
  
  // Validate greetings
  console.log('\n💬 인사말 목록:');
  data.greetings.forEach((greeting, index) => {
    console.log(`${index + 1}. ${greeting.korean} (${greeting.id})`);
    console.log(`   - 카테고리: ${greeting.category}`);
    console.log(`   - 난이도: ${greeting.difficulty}/3`);
    console.log(`   - 상황: ${greeting.situation}`);
    
    // Check if all languages have translations
    const missingLangs = data.languages.filter(lang => 
      !greeting.translations[lang.code]
    );
    
    if (missingLangs.length > 0) {
      console.log(`   ⚠️  누락된 번역: ${missingLangs.map(l => l.name).join(', ')}`);
    } else {
      console.log(`   ✅ 모든 언어 번역 완료 (${Object.keys(greeting.translations).length}개)`);
    }
  });
  
  // Summary statistics
  console.log('\n📈 통계:');
  console.log(`- 전체 언어 수: ${data.languages.length}`);
  console.log(`- 전체 인사말 수: ${data.greetings.length}`);
  console.log(`- 총 번역 항목: ${data.greetings.length * data.languages.length}`);
  
  // Validate audio/image paths
  console.log('\n🔍 파일 경로 검증:');
  const audioExtensions = ['.mp3', '.wav', '.ogg'];
  const imageExtensions = ['.svg', '.png', '.jpg'];
  
  let audioCount = 0;
  let imageCount = 0;
  
  data.greetings.forEach(greeting => {
    // Count audio files
    Object.values(greeting.translations).forEach(trans => {
      if (trans.audioUrl && audioExtensions.some(ext => trans.audioUrl.endsWith(ext))) {
        audioCount++;
      }
    });
    
    // Count image files
    if (greeting.imageUrl && imageExtensions.some(ext => greeting.imageUrl.endsWith(ext))) {
      imageCount++;
    }
  });
  
  console.log(`- 예상 음성 파일 수: ${audioCount}`);
  console.log(`- 예상 이미지 파일 수: ${imageCount}`);
  
  console.log('\n✅ 데이터 검증 완료!');
  
  return {
    isValid: true,
    languages: data.languages.length,
    greetings: data.greetings.length,
    audioFiles: audioCount,
    imageFiles: imageCount
  };
}

try {
  const result = validateGreetingsData();
  console.log('\n🎉 검증 성공!', result);
} catch (error) {
  console.error('❌ 검증 실패:', error.message);
  process.exit(1);
}