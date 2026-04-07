const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const cards = [
  { imgId: '58ebfc4', txtId: '9236988' },
  { imgId: 'b6d5841', txtId: '77b9bf6' },
  { imgId: 'ec1c2de', txtId: '9cb239e' },
  { imgId: 'd96ef74', txtId: '6a49649' },
  { imgId: '4aa4dfc', txtId: '1014647' },
  { imgId: '57b3776', txtId: '124dac7' },
  { imgId: '4d1b9c0', txtId: 'be6eec5' },
  { imgId: 'd4c35b0', txtId: '802e942' }
];

for (const card of cards) {
  // Find the img widget
  const imgWidgetStart = html.indexOf('data-id="' + card.imgId + '"');
  if (imgWidgetStart === -1) continue;
  
  // Extract h3
  const h3Start = html.indexOf('<h3', imgWidgetStart);
  const h3End = html.indexOf('</h3>', h3Start) + 5;
  if (h3Start === -1 || h3End < h3Start || h3Start > imgWidgetStart + 2000) continue;
  
  let h3Html = html.substring(h3Start, h3End);
  
  // Modify h3 styling: remove text-shadow, change color to primary, add bottom margin
  h3Html = h3Html.replace('color: #ffffff;', 'color: var(--e-global-color-primary);');
  h3Html = h3Html.replace('text-shadow: 1px 1px 3px rgba(0,0,0,0.8);', '');
  h3Html = h3Html.replace('margin: 0;', 'margin: 0 0 15px 0; text-align: left;');
  
  // Remove h3 from img widget
  html = html.substring(0, h3Start) + html.substring(h3End);
  
  // Remove brightness filter from img
  const imgTagStart = html.lastIndexOf('<img', h3Start);
  const imgTagEnd = html.indexOf('>', imgTagStart);
  if (imgTagStart > imgWidgetStart) {
    let imgTag = html.substring(imgTagStart, imgTagEnd + 1);
    imgTag = imgTag.replace('filter: brightness(0.5);', '');
    html = html.substring(0, imgTagStart) + imgTag + html.substring(imgTagEnd + 1);
  }
  
  // Insert h3 into txt widget
  const txtWidgetStart = html.indexOf('data-id="' + card.txtId + '"');
  if (txtWidgetStart !== -1) {
    // Find the inner p or content
    const pStart = html.indexOf('<p>', txtWidgetStart);
    if (pStart !== -1 && pStart < txtWidgetStart + 1000) {
        html = html.substring(0, pStart) + h3Html + '\n' + html.substring(pStart);
    } else {
        // if no <p> found, just append to widget
        const divEnd = html.indexOf('</div>', txtWidgetStart);
        html = html.substring(0, divEnd) + h3Html + '\n' + html.substring(divEnd);
    }
  }
}

fs.writeFileSync('index.html', html);
console.log('HTML updated.');
