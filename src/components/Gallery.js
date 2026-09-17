import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import '../index.css'; // Asegúrate de incluir el CSS que compartiste
import { ASSETS } from '../constants/assets';





const images = ASSETS.GALLERY.map((src, i) => ({
  src,
  title: `Imagen ${i + 1}`,
  description: "..."
}));

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

import { useAnimation } from 'framer-motion';




const GalleryItem = ({ img, idx, setSelectedIndex }) => {
  return (
    <motion.div 
      className="media cursor-pointer relative transition-transform duration-200 ease-out hover:scale-110 hover:z-10 w-full aspect-square snap-center"
      key={idx}
      onClick={() => setSelectedIndex(idx)}
      style={{ willChange: 'transform' }}
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
};



export default function Gallery() {
  
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Parallax optimized hover values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Only desktop
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; 
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * -40); // Max 40px movement
    mouseY.set(y * -40);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <motion.section 
      className="mwg_effect000 max-w-5xl mx-auto my-12 md:my-[9rem] px-6 md:px-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-text">Mi álbum</h1>
      </div>

      <motion.div 
        className="grid grid-rows-4 grid-flow-col auto-cols-[28%] sm:auto-cols-[22%] md:grid-rows-none md:grid-flow-row md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-4 p-4 md:p-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar max-w-[1200px] mx-auto w-full"
        style={{ x: smoothX, y: smoothY }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {images.map((img, idx) => (
          <GalleryItem key={idx} img={img} idx={idx} setSelectedIndex={setSelectedIndex} />
        ))}
      </motion.div>

      {selectedIndex !== null && createPortal(
        <AnimatePresence>
          <motion.div 
            className="modal-backdrop-lightbox !bg-black-500/90" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="nav-button nav-left" 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"/></svg>
            </button>

            <motion.div 
              className="modal-content-lightbox" 
              onClick={(e) => e.stopPropagation()}
              layoutId={`gallery-img-${selectedIndex}`}
            >
              <motion.img loading="lazy" decoding="async" 
                src={images[selectedIndex].src} 
                alt={images[selectedIndex].title} 
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white font-body"
              >
                <h2 className="text-xl font-bold">{images[selectedIndex].title}</h2>
                <p>{images[selectedIndex].description}</p>
              </motion.div>
            </motion.div>

            <button 
              className="nav-button nav-right" 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"/></svg>
            </button>
            <button 
              className="nav-button absolute top-6 right-6 !w-12 !h-12 !top-6 !transform-none" 
              onClick={() => setSelectedIndex(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
            </button>

          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </motion.section>
  );
}
