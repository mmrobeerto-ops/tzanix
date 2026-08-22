const fs = require('fs');
const path = require('path');

const replacements = [
    { regex: /ENTROP\ufffdA/g, text: 'ENTROPÍA' },
    { regex: /ENTROP\ufffd\?A/g, text: 'ENTROPÍA' },
    { regex: /MATEM\ufffdTICO/g, text: 'MATEMÁTICO' },
    { regex: /MATEM\ufffd\?TICO/g, text: 'MATEMÁTICO' },
    { regex: /Topolog\ufffda/g, text: 'Topología' },
    { regex: /Topolog\ufffd\?a/g, text: 'Topología' },
    { regex: /c\ufffdlculo/g, text: 'cálculo' },
    { regex: /c\ufffd\?lculo/g, text: 'cálculo' },
    { regex: /Protecci\ufffdn/g, text: 'Protección' },
    { regex: /Protecci\ufffd\?n/g, text: 'Protección' },
    { regex: /entrop\ufffda/g, text: 'entropía' },
    { regex: /entrop\ufffd\?a/g, text: 'entropía' },
    { regex: /f\ufffdsicamente/g, text: 'físicamente' },
    { regex: /medici\ufffdn/g, text: 'medición' },
    { regex: /geometr\ufffda/g, text: 'geometría' },
    { regex: /Entrop\ufffda/g, text: 'Entropía' },
    { regex: /an\ufffdlisis/g, text: 'análisis' },
    { regex: /exfiltraci\ufffdn/g, text: 'exfiltración' },
    { regex: /matem\ufffdtica/g, text: 'matemática' },
    { regex: /Matem\ufffdtica/g, text: 'Matemática' },
    // Catch-alls for the double corrupted symbols
    { regex: /\?A/g, text: 'ÍA' },
    { regex: /\?a/g, text: 'ía' },
    { regex: /\?T/g, text: 'ÁT' },
    { regex: /\?n/g, text: 'ón' },
    { regex: /\?o/g, text: 'ió' },
    { regex: /\?N/g, text: 'ÓN' }
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            for (const rep of replacements) {
                if (rep.regex.test(content)) {
                    content = content.replace(rep.regex, rep.text);
                    changed = true;
                }
            }
            
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed:', fullPath);
            }
        }
    }
}

processDir('C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src');
console.log('Mass replacement finished');
