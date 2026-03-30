const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cardIds = ['58ebfc4', 'b6d5841', 'ec1c2de', 'd96ef74', '4aa4dfc', '57b3776', '4d1b9c0', 'd4c35b0'];

const lines = html.split('\n');
const results = [];

for (const cardId of cardIds) {
    let cardLineIdx = lines.findIndex(l => l.includes('elementor-element-' + cardId));
    if (cardLineIdx === -1) continue;
    
    // go up to find the container
    let containerIdx = cardLineIdx;
    while (containerIdx >= 0 && !lines[containerIdx].includes('data-e-type="container"')) {
        containerIdx--;
    }
    
    const containerMatch = lines[containerIdx].match(/elementor-element-([a-z0-9]+)/);
    const containerId = containerMatch ? containerMatch[1] : 'unknown';
    
    // Find the 3 widgets inside this container. We know their approximate order.
    let widgets = [];
    for (let i = containerIdx + 1; i < containerIdx + 100; i++) {
        if (lines[i] && lines[i].includes('data-e-type="container"')) break; // next container
        if (lines[i] && lines[i].includes('data-element_type="widget"')) {
            const wMatch = lines[i].match(/elementor-element-([a-z0-9]+)/);
            if (wMatch) widgets.push(wMatch[1]);
        }
    }
    results.push({ cardId, containerId, widgets });
}
console.log(JSON.stringify(results, null, 2));
