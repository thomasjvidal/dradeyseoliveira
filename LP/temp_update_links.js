const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Substituir os links do whatsapp pelos do minichat
html = html.replace(/href="https:\/\/api\.whatsapp\.com[^"]+"/g, 'href="./Mini-Chat-Original/"');
html = html.replace(/href="https:\/\/wa\.me[^"]+"/g, 'href="./Mini-Chat-Original/"');

fs.writeFileSync('index.html', html);
console.log('Links atualizados com sucesso!');