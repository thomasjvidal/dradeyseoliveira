const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const cardIds = ['58ebfc4', 'b6d5841', 'ec1c2de', 'd96ef74', '4aa4dfc', '57b3776', '4d1b9c0', 'd4c35b0'];

const regex = new RegExp(`(<div class="elementor-element elementor-element-(?:${cardIds.join('|')})[^>]*>)(\\s*<div class="elementor-icon-box-wrapper">)\\s*<img src="([^"]+)" alt="([^"]+)" style="[^"]+" \\/>\\s*<div class="elementor-icon-box-content">\\s*<h3 class="elementor-icon-box-title">\\s*<span>\\s*([\\s\\S]*?)\\s*<\\/span>\\s*<\\/h3>\\s*<\\/div>\\s*<\\/div>`, 'g');

const newContent = content.replace(regex, (match, divTag, wrapperTag, imgSrc, imgAlt, title) => {
    return `${divTag}
							<div class="elementor-icon-box-wrapper" style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 15px;">
						<img src="${imgSrc}" alt="${imgAlt}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; filter: brightness(0.5);" />
						<div class="elementor-icon-box-content" style="position: relative; z-index: 2; padding: 20px; text-align: center; width: 100%;">
									<h3 class="elementor-icon-box-title" style="color: #ffffff; text-shadow: 1px 1px 3px rgba(0,0,0,0.8); margin: 0; font-weight: bold;">
						<span>
							${title.trim()}
						</span>
					</h3>
			</div>
		</div>`;
});

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('HTML for cards updated.');
