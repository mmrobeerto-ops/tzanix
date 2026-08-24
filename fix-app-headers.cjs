const fs = require('fs');
const file = 'C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

// The text is likely corrupted. We will replace any block that has "EDUCAC" up to "OBSERVABILIDAD" with the correct text.
content = content.replace(/EDUCAC[\s\S]*?OBSERVABILIDAD/g, 'EDUCACIÓN CUÁNTICA & OBSERVABILIDAD');

// For "SEGURIDAD DESDE EL DISEÑO"
content = content.replace(/SEGURIDAD DESDE EL DISE[\s\S]*?O/g, 'SEGURIDAD DESDE EL DISEÑO');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed App.jsx headers');
