const fs = require('fs');
const path = require('path');

// Classic UTF-8 Mojibake mapping
const mojibakeMap = {
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã\xAD': 'í',  // Ã followed by soft hyphen or similar byte, usually mapped to \xAD
    'Ã\x81': 'Á',
    'Ã\x89': 'É',
    'Ã\x93': 'Ó',
    'Ã\x9A': 'Ú',
    'Ã\x91': 'Ñ',
    'Ã\x8D': 'Í',
    'Â¿': '¿',
    'Â¡': '¡',
    // Let's also include string literals since JS regex might misinterpret bytes
    'ÃƒÂ¡': 'á',
    'ÃƒÂ©': 'é',
    'ÃƒÂ³': 'ó',
    'ÃƒÂº': 'ú',
    'ÃƒÂ±': 'ñ',
    'ÃƒÂ\xAD': 'í',
    // Custom ones seen in screenshots
    'Ã³': 'ó',
    'Ã©': 'é',
    'Ã¡': 'á',
    'Ã': 'í', // Sometimes it renders just as Ã in terminal if the next byte is swallowed
    'anomalÃas': 'anomalías',
    'purificaciÃ³n': 'purificación',
    'aplicaciÃ³n': 'aplicación',
    'trÃ¡fico': 'tráfico',
    'DetÃ©n': 'Detén',
    'TopologÃa': 'Topología',
    'TopologÃ?a': 'Topología',
    'cÃ¡lculo': 'cálculo',
    'estÃ¡ndar': 'estándar',
    'MisiÃ³n': 'Misión',
    'VisiÃ³n': 'Visión',
    'EnergÃa': 'Energía',
    'energÃa': 'energía',
    'entropÃa': 'entropía',
    'EntropÃa': 'Entropía',
    'GeometrÃa': 'Geometría',
    'geometrÃa': 'geometría',
    'simetrÃa': 'simetría',
    'TelemetrÃa': 'Telemetría',
    'osciloscopÃa': 'osciloscopía',
    'matemÃ¡tica': 'matemática',
    'MatemÃ¡tica': 'Matemática',
    'CÃ¡lculo': 'Cálculo',
    'dinÃ¡micamente': 'dinámicamente',
    'fÃsicamente': 'físicamente',
    'lÃmite': 'límite',
    'NÃºcleo': 'Núcleo',
    'NÃšCLEO': 'NÚCLEO',
    'MATEMÃ\x81TICO': 'MATEMÁTICO',
    'MATEMÃ\x81TICA': 'MATEMÁTICA',
    'AnÃ¡lisis': 'Análisis',
    'anÃ¡lisis': 'análisis',
    'ProtecciÃ³n': 'Protección',
    'exfiltraciÃ³n': 'exfiltración',
    'computaciÃ³n': 'computación',
    'cÃ³mputo': 'cómputo',
    'visualizaciÃ³n': 'visualización',
    'VisualizaciÃ³n': 'Visualización',
    'animaciÃ³n': 'animación',
    'proyecciÃ³n': 'proyección',
    'FunciÃ³n': 'Función',
    'CuÃ¡ntica': 'Cuántica',
    'cuÃ¡ntico': 'cuántico',
    'CuÃ¡ntico': 'Cuántico',
    'SchrÃ¶dinger': 'Schrödinger',
    'observaciÃ³n': 'observación',
    'mediciÃ³n': 'medición',
    'EDUCACIÃ“N': 'EDUCACIÓN',
    'Ã“': 'Ó',
    'Ã\x89': 'É'
};

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            for (const [bad, good] of Object.entries(mojibakeMap)) {
                // Global replace
                const parts = content.split(bad);
                if (parts.length > 1) {
                    content = parts.join(good);
                    changed = true;
                }
            }
            
            // Generic sweep for leftover Ã sequences (risky but necessary)
            // Replace Ã followed by a vowel or common corrupted letter
            const genericRegex = /Ã[¡©³º±\xAD]/g;
            if (genericRegex.test(content)) {
                content = content.replace(/Ã¡/g, 'á')
                                 .replace(/Ã©/g, 'é')
                                 .replace(/Ã³/g, 'ó')
                                 .replace(/Ãº/g, 'ú')
                                 .replace(/Ã±/g, 'ñ');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed Mojibake in:', fullPath);
            }
        }
    }
}

processDir('C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page/src');
processDir('C:/Users/52664/.gemini/antigravity/scratch/tzanix-landing-page'); // Root for index.html

console.log('Global Mojibake purge complete.');
