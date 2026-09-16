import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import '../index.css'; // Asegúrate de incluir el CSS que compartiste
import { ASSETS } from '../constants/assets';





const images = ASSETS.GALLERY.map((src, i) => ({
  src,
  title: `Imagen ${i + 1}`,
  description: "..."
}));

import { motion, AnimatePresence } from 'framer-motion';

import { useAnimation } from 'framer-motion';




const GalleryItem = ({ img, idx, setSelectedIndex }) => {
  return (
    <motion.div 
      className="media cursor-pointer relative transition-transform duration-200 ease-out hover:scale-110 hover:z-10" 
      
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
};



export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // Handlers for dragging / mouse follow
  const handleMouseMove = (e, idx) => {
    const el = document.getElementById(`gallery-img-wrapper-${idx}`);
    if (el) {
      // Just apply a subtle translation based on movement
      const x = (e.nativeEvent.movementX * 0.5);
      const y = (e.nativeEvent.movementY * 0.5);
      
      const currentTransform = el.style.transform;
      // We will let framer motion's whileHover handle scale/rotate, and apply translation dynamically if needed.
      // But a cleaner way is just using framer-motion drag!
    }
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
      className="mwg_effect000 max-w-5xl mx-auto my-12 md:my-[9rem]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="header flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-text">Mi álbum</h1>
      </div>

      <motion.div 
        className="flex flex-wrap justify-center gap-2 p-8 max-w-[1200px] mx-auto"
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
