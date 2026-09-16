const fs = require('fs');

const imagesContent = fs.readFileSync('src/constants/images.js', 'utf8');

// We can just keep the imports at the top
const imports = imagesContent.split('\n').filter(line => line.startsWith('import '));

let assetsContent = `// Auto-generated unified assets configuration\n\n`;
assetsContent += imports.join('\n') + '\n\n';

assetsContent += `export const ASSETS = {\n`;

// Add everything from IMAGES directly for backward compatibility or ease, but let's structure it as ASSETS
const allVarNames = imports.map(line => {
  const match = line.match(/^import\s+([A-Za-z0-9_]+)\s+from/);
  return match ? match[1] : null;
}).filter(Boolean);

allVarNames.forEach(v => {
  assetsContent += `  ${v},\n`;
});

assetsContent += `};\n`;
fs.writeFileSync('src/constants/assets.js', assetsContent);
console.log('Created src/constants/assets.js');
