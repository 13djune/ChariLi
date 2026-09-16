const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // replace `const Name = require('path');` with `import Name from 'path';`
  content = content.replace(/const ([a-zA-Z0-9_]+) = require\('([^']+)'\);/g, "import $1 from '$2';");
  
  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/components/Gallery.js');
fixFile('src/pages/Projects.js');
fixFile('src/components/PaintRevealImage.js');
