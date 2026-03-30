const fs = require('fs');
const path = require('path');

// List of working MP4 sample video URLs (from Google's public sample bucket)
const workingVideoUrls = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
];

const seedFile = path.join(__dirname, 'seed.js');
let content = fs.readFileSync(seedFile, 'utf8');

// Replace YouTube URLs with working MP4 URLs
content = content.replace(
  /https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g,
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
);

// Replace all videoUrl occurrences with rotating working MP4 URLs
let urlIndex = 0;
content = content.replace(
  /videoUrl:\s*'https:\/\/storage\.googleapis\.com\/gtv-videos-bucket\/sample\/BigBuckBunny\.mp4'/g,
  () => {
    const url = workingVideoUrls[urlIndex % workingVideoUrls.length];
    urlIndex++;
    return `videoUrl: '${url}'`;
  }
);

fs.writeFileSync(seedFile, content, 'utf8');
console.log(`✅ Successfully updated seed.js!`);
console.log(`📹 Assigned ${urlIndex} videos with working MP4 URLs.`);
console.log('Available sample videos:');
workingVideoUrls.forEach((url, i) => {
  console.log(`  ${i + 1}. ${url.split('/').pop()}`);
});
