const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const styleBlock = `
<style>
/* Adjust the 8 service cards to remove padding and allow image to fill */
.elementor-47 .elementor-element.elementor-element-58ebfc4,
.elementor-47 .elementor-element.elementor-element-b6d5841,
.elementor-47 .elementor-element.elementor-element-ec1c2de,
.elementor-47 .elementor-element.elementor-element-d96ef74,
.elementor-47 .elementor-element.elementor-element-4aa4dfc,
.elementor-47 .elementor-element.elementor-element-57b3776,
.elementor-47 .elementor-element.elementor-element-4d1b9c0,
.elementor-47 .elementor-element.elementor-element-d4c35b0 {
    padding: 0 !important;
    overflow: hidden !important;
}
</style>
`;

if (!content.includes('/* Adjust the 8 service cards')) {
    content = content.replace('</head>', styleBlock + '\n</head>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Added CSS to index.html');
} else {
    console.log('CSS already exists');
}
