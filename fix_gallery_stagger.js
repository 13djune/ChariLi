const fs = require('fs');
let code = fs.readFileSync('src/components/Gallery.js', 'utf8');

code = code.replace(
  /transition: { staggerChildren: 0\.02, delayChildren: 0\.1, duration: 0\.4, ease: "easeOut" }/,
  'transition: { duration: 0.4, ease: "easeOut" }'
);

// We should also remove the variants from GalleryItem so Framer Motion doesn't try to animate 100 children
code = code.replace(
  /variants={{ hidden: { opacity: 0, scale: 0\.9 }, visible: { opacity: 1, scale: 1 } }}/,
  ''
);

fs.writeFileSync('src/components/Gallery.js', code);
console.log('Removed heavy stagger logic');
