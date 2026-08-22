const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Remove BOM if exists
            if (content.charCodeAt(0) === 0xFEFF) {
                content = content.slice(1);
            }
            
            // Fix index.html specifically if it has corrupted chars
            if (fullPath.endsWith('index.html')) {
                content = content.replace(/Computaci.n Cu.ntica/g, 'Computación Cuántica');
                content = content.replace(/Cr.ticas/g, 'Críticas');
            }
            
            // Always overwrite to force clean UTF-8
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

processDir('C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src');
processDir('C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page'); // to catch index.html
console.log('All files converted to clean UTF-8 without BOM');
