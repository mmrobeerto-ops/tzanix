const fs = require('fs');
const file = 'C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src/components/CompanyModals.jsx';
let content = fs.readFileSync(file, 'utf8');

// Use exact string replacement with wildcards/regex matching everything between 'Misi' and 'n'
content = content.replace(/Misi.n/g, 'Misión');
content = content.replace(/Visi.n/g, 'Visión');
content = content.replace(/MISI."N/g, 'MISIÓN');
content = content.replace(/VISI."N/g, 'VISIÓN');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed using wildcard regex in Node');
