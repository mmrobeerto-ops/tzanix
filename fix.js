const fs = require('fs');
const file = 'C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src/components/CompanyModals.jsx';
let content = fs.readFileSync(file, 'utf8');

// Fix the title buttons
content = content.replace(/Misin, Visin/g, 'Misión, Visión');
content = content.replace(/Nuestra Misin/g, 'Nuestra Misión');
content = content.replace(/Nuestra Visin/g, 'Nuestra Visión');
content = content.replace(/MISI"N/g, 'MISIÓN');
content = content.replace(/VISI"N/g, 'VISIÓN');

// Some generic ones
content = content.replace(/crtica/g, 'crítica');
content = content.replace(/trfico/g, 'tráfico');
content = content.replace(/estndar/g, 'estándar');
content = content.replace(/matemtico/g, 'matemático');
content = content.replace(/Estndares/g, 'Estándares');
content = content.replace(/Voltil/g, 'Volátil');
content = content.replace(/olvidndolo/g, 'olvidándolo');
content = content.replace(/Soberana/g, 'Soberanía');
content = content.replace(/Diseo/g, 'Diseño');
content = content.replace(/diseo/g, 'diseño');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed via Node.js');
