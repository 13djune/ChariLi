const fs = require('fs');

let code = fs.readFileSync('src/components/Gallery.js', 'utf8');

const target = `const GalleryItem = ({ img, idx, setSelectedIndex }) => {
  return (
    <motion.div 
      className="media cursor-pointer relative" 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      key={idx} 
      onClick={() => setSelectedIndex(idx)}
      style={{ zIndex: 1 }}
      whileHover={{ zIndex: 10, scale: 1.05, transition: { duration: 0.2 } }}
    >
      <img 
        src={img.src} 
        alt={img.title} 
        className="w-full h-full object-cover rounded-xl shadow-lg pointer-events-none"
      />
    </motion.div>
  );
};`;

const replacement = `const GalleryItem = ({ img, idx, setSelectedIndex }) => {
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
      style={{ zIndex: 1, width: '100px', height: '100px' }}
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
};`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/Gallery.js', code);
