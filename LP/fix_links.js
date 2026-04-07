const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove target="_blank" from links pointing to Mini-Chat
html = html.replace(/href="\.\/Mini-Chat-Original\/"\s+target="_blank"/g, 'href="./Mini-Chat-Original/"');
html = html.replace(/target="_blank"\s+href="\.\/Mini-Chat-Original\/"/g, 'href="./Mini-Chat-Original/"');

// 2. Remove the modal block completely
const modalRegex = /<!-- Mini-Chat Modal -->[\s\S]*?<\/script>/;
html = html.replace(modalRegex, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Links updated and modal removed');
