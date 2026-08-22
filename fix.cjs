const fs = require('fs');
const file = 'C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src/components/CompanyModals.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the literal unicode replacement character \ufffd
content = content.replace(/Misi\ufffdn/g, 'Misión');
content = content.replace(/Visi\ufffdn/g, 'Visión');
content = content.replace(/MISI\ufffd"N/g, 'MISIÓN');
content = content.replace(/VISI\ufffd"N/g, 'VISIÓN');
content = content.replace(/cr\ufffdtica/g, 'crítica');
content = content.replace(/tr\ufffdfico/g, 'tráfico');
content = content.replace(/est\ufffdndar/g, 'estándar');
content = content.replace(/Soberan\ufffda/g, 'Soberanía');
content = content.replace(/Vol\ufffdtil/g, 'Volátil');
content = content.replace(/olvid\ufffdndolo/g, 'olvidándolo');
content = content.replace(/Est\ufffdndares/g, 'Estándares');
content = content.replace(/matem\ufffdtico/g, 'matemático');
content = content.replace(/dise\ufffd/g, 'diseñ');
content = content.replace(/DISE\ufffd'O/g, 'DISEÑO');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed via Node.cjs');
