const fs = require('fs');
const path = require('path');

const filesToRefactor = [
  'src/pages/Projects.js',
  'src/components/Gallery.js',
  'src/components/Menu.js',
  'src/components/Footer.jsx',
  'src/pages/About.js',
  'src/pages/Contact.js'
];

let allImports = new Set();
let importStatements = [];

// 1. Collect all imports
filesToRefactor.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach(line => {
    const match = line.match(/^import\s+([A-Za-z0-9_]+)\s+from\s+['"]\.\.\/assets\/img\/(.+)['"];$/);
    if (match) {
      const varName = match[1];
      const imgPath = match[2];
      if (!allImports.has(varName)) {
        allImports.add(varName);
        importStatements.push(`import ${varName} from '../assets/img/${imgPath}';`);
      }
    }
  });
});

// 2. Generate images.js
let imagesFileContent = `// Auto-generated unified images configuration\n\n`;
imagesFileContent += importStatements.join('\n') + '\n\n';
imagesFileContent += `export const IMAGES = {\n`;
allImports.forEach(varName => {
  imagesFileContent += `  ${varName},\n`;
});
imagesFileContent += `};\n`;

fs.writeFileSync('src/constants/images.js', imagesFileContent);
console.log('Created src/constants/images.js');

// 3. Update the files
filesToRefactor.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = [];
  let importsAdded = false;
  
  const lines = content.split('\n');
  lines.forEach(line => {
    const match = line.match(/^import\s+([A-Za-z0-9_]+)\s+from\s+['"]\.\.\/assets\/img\/(.+)['"];$/);
    if (match) {
      if (!importsAdded) {
        // Adjust relative path for constants
        const depth = file.split('/').length - 2;
        let prefix = depth === 0 ? './' : '../'.repeat(depth);
        if (file.startsWith('src/')) prefix = '../';
        
        newContent.push(`import { IMAGES } from '${prefix}constants/images';`);
        importsAdded = true;
      }
    } else {
      newContent.push(line);
    }
  });
  
  // Replace variable usages with IMAGES.varName
  let joinedContent = newContent.join('\n');
  allImports.forEach(varName => {
    // Replace whole word usages of varName with IMAGES.varName, except in imports (which are gone)
    // Need to be careful with property names, e.g., src: Gazpachuelo_0 -> src: IMAGES.Gazpachuelo_0
    const regex = new RegExp(`\\b${varName}\\b`, 'g');
    joinedContent = joinedContent.replace(regex, `IMAGES.${varName}`);
  });
  
  fs.writeFileSync(file, joinedContent);
  console.log(`Updated ${file}`);
});
