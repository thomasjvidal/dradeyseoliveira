const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// I will look for each container that has the icon box description, the image card, and the text editor.
// Wait, the user wants the title to be ABOVE the text description in the original layout?
// The user selected `<span class="trae-browser-inspect-draggable">Harmonização Facial e Corporal</span>`
// and said: "`span` quero que passe o titulo aqui para cima dos textos embaixo `div` `div`"
// Currently, the structure is:
// 1. icon-box (description) - "Ajustes estéticos com foco em proporção."
// 2. icon-box (the image card we modified) - "Harmonização Facial e Corporal" (title)
// 3. text-editor - "Equilíbrio entre rosto e corpo."
//
// Let me look at the HTML structure again.
// The container has 3 widgets:
// Widget 1: icon-box with svg and description (e.g. "Ajustes estéticos com foco em proporção.")
// Widget 2: icon-box with the image and title (e.g. "Harmonização Facial e Corporal")
// Widget 3: text-editor with p (e.g. "Equilíbrio entre rosto e corpo.")
//
// The user wants the title (Harmonização Facial e Corporal) to be ABOVE the text description.
// That means Widget 2 should be moved to be ABOVE Widget 1, or just the title moved?
// Wait, the user said: "quero que passe o titulo aqui para cima dos textos embaixo".
// Maybe they want the order of the widgets to change in CSS, or they want the title inside the image card to be positioned differently?
// Wait, the original structure had:
// 1. icon box with svg and description
// 2. icon box with title and icon (now image)
// 3. text editor
// Actually, visually, Elementor might be ordering them with CSS flexbox order.
// Let's check the CSS for these elements.
