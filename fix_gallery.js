const fs = require('fs');
let gallery = fs.readFileSync('src/components/Gallery.js', 'utf8');
gallery = gallery.replace(/const images = \[[\s\S]*?\];/m, `const images = ASSETS.GALLERY.map((src, i) => ({\n  src,\n  title: \`Imagen \${i + 1}\`,\n  description: "..."\n}));`);
fs.writeFileSync('src/components/Gallery.js', gallery);
