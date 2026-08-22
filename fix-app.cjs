const fs = require('fs');
const file = 'C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/EDUCACI\ufffd"N CU\ufffd\?NTICA/g, 'EDUCACIÓN CUÁNTICA');
content = content.replace(/Visualizaci\ufffdn/g, 'Visualización');
content = content.replace(/osciloscop\ufffda/g, 'osciloscopía');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed App.jsx texts');
