const fs = require('fs');
let code = fs.readFileSync('src/pages/Projects.js', 'utf8');
code = code.replace(/map\(src => \(\{ type: 'image', src \}\)\)/g, "map(src => ({ type: 'image', src: src + '?v=2' }))");
fs.writeFileSync('src/pages/Projects.js', code);

let code2 = fs.readFileSync('src/components/Gallery.js', 'utf8');
code2 = code2.replace(/src: src,/g, "src: src + '?v=2',");
fs.writeFileSync('src/components/Gallery.js', code2);
