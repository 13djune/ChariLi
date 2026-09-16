const fs = require('fs');

const imagesContent = fs.readFileSync('src/constants/images.js', 'utf8');

const imports = imagesContent.split('\n').filter(line => line.startsWith('import '));

let assetsContent = `// Auto-generated unified assets configuration\n\n`;
assetsContent += imports.join('\n') + '\n\n';

assetsContent += `export const ASSETS = {\n`;
const allVarNames = imports.map(line => {
  const match = line.match(/^import\s+([A-Za-z0-9_]+)\s+from/);
  return match ? match[1] : null;
}).filter(Boolean);

allVarNames.forEach(v => {
  assetsContent += `  ${v},\n`;
});

// Let's create dictionaries for Projects and Gallery
const projectGroups = {};
const gallery = [];

allVarNames.forEach(v => {
  if (v.startsWith('Gallery_')) {
    gallery.push(v);
  } else if (v.match(/_[0-9]+$/)) {
    // Project images
    const projectName = v.split('_')[0];
    if (!projectGroups[projectName]) projectGroups[projectName] = [];
    projectGroups[projectName].push(v);
  }
});

assetsContent += `\n  PROJECTS: {\n`;
for (const [project, imgs] of Object.entries(projectGroups)) {
  assetsContent += `    '${project}': [\n      ${imgs.join(',\n      ')}\n    ],\n`;
}
assetsContent += `  },\n`;

assetsContent += `\n  GALLERY: [\n    ${gallery.join(',\n    ')}\n  ],\n`;

assetsContent += `};\n`;
fs.writeFileSync('src/constants/assets.js', assetsContent);
console.log('Created src/constants/assets.js with PROJECTS and GALLERY dictionaries.');
