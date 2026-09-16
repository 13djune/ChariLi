const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // For Gallery.js: replace `process.env.PUBLIC_URL + '/img/` with `require('../assets/img/` and `';` with `');`
  // Wait, if it's `const Gallery_0 = process.env.PUBLIC_URL + '/img/...';`
  // we want `const Gallery_0 = require('../assets/img/...');`
  
  content = content.replace(/process\.env\.PUBLIC_URL \+ '\/img\/([^']+)'/g, "require('../assets/img/$1')");
  
  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/components/Gallery.js');
fixFile('src/pages/Projects.js');
fixFile('src/components/PaintRevealImage.js');
