const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const matches = html.match(/<a [^>]*href="([^"]+)"[^>]*>/g);
if (matches) {
    const uniqueLinks = [...new Set(matches.filter(m => m.includes('elementor-button') || m.includes('whatsapp')))];
    console.log(uniqueLinks.join('\n'));
}