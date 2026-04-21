const https = require('https');
https.get('https://kawe.ski/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = [];
    const regex = /["']([^"']*\.(mp3|wav|ogg|m4a))["']/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      urls.push(match[1]);
    }
    console.log(Array.from(new Set(urls)));
  });
}).on('error', console.error);
