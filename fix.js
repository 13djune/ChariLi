const fs = require('fs');
let code = fs.readFileSync('src/pages/Projects.js', 'utf8');
code = code.replace(/src: src \+ '\?v=2'/g, "src");
fs.writeFileSync('src/pages/Projects.js', code);

let code2 = fs.readFileSync('src/components/Gallery.js', 'utf8');
code2 = code2.replace(/src: src \+ '\?v=2',/g, "src: src,");
fs.writeFileSync('src/components/Gallery.js', code2);
