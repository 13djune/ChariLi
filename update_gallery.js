const fs = require('fs');

let code = fs.readFileSync('src/components/Gallery.js', 'utf8');

// Replace GalleryItem
code = code.replace(/const GalleryItem = \({ img, idx, setSelectedIndex }\) => {[\s\S]*?return \([\s\S]*?<\/motion\.div>\s*);\s*};/m, `const GalleryItem = ({ img, idx, setSelectedIndex }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      className="media cursor-pointer relative" 
      variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
      key={idx} 
      onClick={() => setSelectedIndex(idx)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 1 }}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ zIndex: 10, scale: 1.1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      <img 
        src={img.src} 
        alt={img.title} 
        className="w-full h-full object-cover rounded-xl shadow-md pointer-events-none"
      />
    </motion.div>
  );
};`);

// Optimize the main gallery stagger
code = code.replace(/transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.8, ease: "easeOut" }/, 'transition: { staggerChildren: 0.02, delayChildren: 0.1, duration: 0.4, ease: "easeOut" }');

// Make it symmetrical by using flex justify-center instead of grid auto-fill
code = code.replace(/className="medias"/, 'className="flex flex-wrap justify-center gap-2 md:gap-3 p-4 md:p-8 max-w-[1200px] mx-auto"');

fs.writeFileSync('src/components/Gallery.js', code);
console.log('Gallery optimized');
