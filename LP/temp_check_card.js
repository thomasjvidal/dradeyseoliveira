const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const lines = html.split('\n');
const start = lines.findIndex(l => l.includes('data-id="ba7e3e2"'));
if (start !== -1) {
    for (let i = start; i < start + 60; i++) {
        console.log(lines[i].trim());
    }
}
