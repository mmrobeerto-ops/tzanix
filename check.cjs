const fs = require('fs');
const content = fs.readFileSync('C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src/App.jsx', 'utf8');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('\ufffd') || lines[i].includes('Ã')) {
        console.log(Line : );
    }
}
