const fs = require('fs');

const imagesContent = fs.readFileSync('src/constants/images.js', 'utf8');
const imports = imagesContent.split('\n').filter(line => line.startsWith('import '));

let assetsContent = `// Auto-generated unified assets configuration\n\n`;
assetsContent += imports.join('\n') + '\n\n';

assetsContent += `export const ASSETS = {\n`;

// Add everything from IMAGES directly for backward compatibility
const allVarNames = imports.map(line => {
  const match = line.match(/^import\s+([A-Za-z0-9_]+)\s+from/);
  return match ? match[1] : null;
}).filter(Boolean);

allVarNames.forEach(v => {
  assetsContent += `  ${v},\n`;
});

// Group images by prefix
const projectGroups = {};
const gallery = [];

allVarNames.forEach(v => {
  if (v.startsWith('Gallery_')) {
    gallery.push(v);
  } else if (v.match(/_[0-9]+$/)) {
    const projectName = v.split('_')[0];
    if (!projectGroups[projectName]) projectGroups[projectName] = [];
    projectGroups[projectName].push(v);
  }
});

assetsContent += `\n  PROJECTS: {\n`;
assetsContent += `    'Gazpachuelo': [\n      ${projectGroups['Gazpachuelo']?.join(',\n      ')}\n    ],\n`;
assetsContent += `    'DURA': [\n      ${projectGroups['Dura']?.join(',\n      ')}\n    ],\n`;
assetsContent += `    'Locurote': [\n      ${projectGroups['Locurote']?.join(',\n      ')}\n    ],\n`;
assetsContent += `    'Química-Averzzo + DeKé Magazine': [\n      ${[...(projectGroups['Quimica']||[]), ...(projectGroups['DeKe']||[])].join(',\n      ')}\n    ],\n`;
assetsContent += `    'Nave Oliva': [\n      ${projectGroups['NaveOliva']?.join(',\n      ')}\n    ],\n`;
assetsContent += `    'LA CORRIENTE (Making Of)': [\n      ${projectGroups['Corriente']?.join(',\n      ')}\n    ],\n`;
assetsContent += `    'Funked Up': [\n      ${projectGroups['Funked']?.join(',\n      ')}\n    ],\n`;
assetsContent += `    'Randall Boggs': [\n      ${projectGroups['Randall']?.join(',\n      ')}\n    ],\n`;

assetsContent += `  },\n`;

assetsContent += `\n  GALLERY: [\n    ${gallery.join(',\n    ')}\n  ],\n`;

assetsContent += `};\n`;
fs.writeFileSync('src/constants/assets.js', assetsContent);
console.log('Updated src/constants/assets.js');
