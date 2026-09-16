const fs = require('fs');

let code = fs.readFileSync('src/components/Gallery.js', 'utf8');

const target = `const GalleryItem = ({ img, idx, setSelectedIndex }) => {
  return (
    <motion.div 
      className="media cursor-pointer relative" 
      variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
      key={idx} 
      onClick={() => setSelectedIndex(idx)}
      style={{ zIndex: 1, width: '100px', height: '100px' }}
      whileHover={{ zIndex: 10, scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      <img 
        src={img.src} 
        alt={img.title} 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover rounded-xl shadow-md pointer-events-none"
      />
    </motion.div>
  );
};`;

const replacement = `const GalleryItem = ({ img, idx, setSelectedIndex }) => {
  return (
    <motion.div 
      className="media cursor-pointer relative transition-transform duration-200 ease-out hover:scale-110 hover:z-10" 
      variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
      key={idx} 
      onClick={() => setSelectedIndex(idx)}
      style={{ width: '100px', height: '100px', willChange: 'transform' }}
    >
      <img 
        src={img.src} 
        alt={img.title} 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover rounded-xl shadow-md pointer-events-none"
      />
    </motion.div>
  );
};`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/Gallery.js', code);
console.log('Fixed GalleryItem CSS hover');
