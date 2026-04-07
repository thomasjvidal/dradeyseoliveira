const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace width: 100%; height: 100%; with width: 70px; height: 70px;
// I will use 70px because the CSS says font-size: 70px; and it might be slightly better, or 65px.
// Let's use 70px to match the CSS font-size of the elementor-icon, or 65px which was the SVG size.
// Let's just use 70px width and height.

content = content.replace(/style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"/g, 'style="width: 65px; height: 65px; object-fit: cover; border-radius: 10px;"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed img sizes');
