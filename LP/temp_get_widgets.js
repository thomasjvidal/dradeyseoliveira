const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
const start = lines.findIndex(l => l.includes('data-id="12bef64"'));
if(start !== -1) {
    for(let i = start; i < start + 50; i++) {
        if(lines[i].includes('data-element_type="widget"')) console.log(lines[i].trim());
    }
}