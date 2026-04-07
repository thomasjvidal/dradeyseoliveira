const fs = require('fs');
const path = 'Mini-Chat-Original/index.html';
let html = fs.readFileSync(path, 'utf8');

// Fix viewport meta tag to prevent zoom
html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, interactive-widget=resizes-content">');

fs.writeFileSync(path, html, 'utf8');
console.log('Viewport updated!');
