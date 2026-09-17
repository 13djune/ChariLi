import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ProjectSlider from '../components/ProjectSlider';
import { motion } from 'framer-motion';

import { ASSETS } from '../constants/assets';

import CameraViewfinder from '../components/CameraViewfinder';



// =================================================================
// 1. LightboxModal Componente (para mostrar y navegar entre imágenes)
// =================================================================
const LightboxModal = ({ mediaList, initialIndex, onClose }) => {
  // HOOKS se llaman siempre al inicio
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Filtrar solo imágenes para la galería
  const images = mediaList.filter(item => item.type === 'image');
  const totalImages = images.length;

  const handlePrev = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  }, [totalImages]);

  const handleNext = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  }, [totalImages]);

  useEffect(() => {
    if (totalImages === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext, totalImages]);


  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return createPortal(
    <div className="modal-backdrop-lightbox" onClick={onClose}>
      <button className="nav-button nav-left" onClick={handlePrev}>←</button>

      <div className="modal-content-lightbox" onClick={(e) => e.stopPropagation()}>
        <img loading="lazy" decoding="async"
          src={currentImage.src}
          alt={`Imagen ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain"
        />
        <div className='info-bar'>
            <p>{currentImage.title || `Imagen ${currentIndex + 1}`}</p>
        </div>
      </div>

      <button className="nav-button nav-right" onClick={handleNext}>→</button>
    </div>,
    document.body
  );
};
// =================================================================
// 2. Componente Proyectos con Estado del Modal
// =================================================================

const projects = [
  {
    id: 1,
    title: 'Gazpachuelo',
    year: 2023,
    description: [
      'Una joven malagueña intenta cocinar su primer gazpachuelo en su piso de estudiantes, pero su poca experiencia y su terquedad hacen que ni siquiera consiga montar la mayonesa.',
      'Premio a <strong>Mejor Corto en Festival ADN 2023</strong> y proyectado en el <strong>Festival Internacional de Cine en Guadalajara</strong> (FICG, MEXICO).'
    ],
    media: ASSETS.PROJECTS['Gazpachuelo'].map(src => ({ type: 'image', src })),
    disciplines: ['Directora', 'Dirección Creativa', 'Producción audiovisual'],
    link: 'https://www.youtube.com/watch?v=KA-7mkDLY28',
  },
  {
    id: 2,
    title: 'DURA',
    year: 2023,
    description: 'Grabando en un coche para Rakky Ripper en el videoclip "DURA"',
    media: ASSETS.PROJECTS['DURA'].map(src => ({ type: 'image', src })),
    disciplines: ['Operación de cámara', 'Dirección Creativa'],
    link: 'https://www.youtube.com/watch?v=ifsAMA9N4Mg',
  },
  {
    id: 3,
    title: 'Locurote',
    year: 2023,
    description: 'Videoclip de <strong>Daniel Arias</strong>.',
    media: ASSETS.PROJECTS['Locurote'].map(src => ({ type: 'image', src })),
    disciplines: ['Operación de cámara', 'Grabación de sonido', 'Fotografía fija'],
    link: 'https://www.youtube.com/watch?v=LLGJI6fENJA',
  },
  {
    id: 4,
    title: 'Química-Averzzo + DeKé Magazine',
    year: 2023,
    description: ['Foto fija promocional para videoclip "Química" de <strong>Averzzo</strong> en formato <strong>35mm</strong> con una película caducada.',
    'Portada de la revista "<strong>DeKé Magazine</strong>".'],
    media: ASSETS.PROJECTS['Química-Averzzo + DeKé Magazine'].map(src => ({ type: 'image', src })),
    disciplines: ['Fotografía fija', 'Dirección Creativa'],
    link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  },
  {
    id: 5,
    title: 'Nave Oliva',
    year: 2025,
    description: 'Nave Oliva es un taller y espacio creativo en <strong>Lucero, Madrid</strong>. Se presenta como un "playground" para artistas, enfocado en el diseño, la dirección de arte y la fabricación, sirviendo como un punto de encuentro y trabajo para la comunidad artística. Nave Oliva es un taller y espacio creativo en Lucero, Madrid. Se presenta como un "playground" para artistas, enfocado en el diseño, la dirección de arte y la fabricación, sirviendo como un punto de encuentro y trabajo para la comunidad artística.',
    media: ASSETS.PROJECTS['Nave Oliva'].map(src => ({ type: 'image', src })),
    disciplines: ['Fotografía', 'Fotografía fija', 'BTS'],
    link: 'https://www.instagram.com/naveoliva/?hl=en',
  },
  // {
  //   id: 6,
  //   title: 'BenidormFest',
  //   year: 2022,
  //   description: '',
  //   media: [
  //     { type: 'image', src: ASSETS.Gazpachuelo_0 },
  //   ],
  //   disciplines: ['Fotografía', 'Fotografía fija', 'BTS', 'Postproducción'],
  //   link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  // },
  {
    id: 7,
    title: 'LA CORRIENTE (Making Of)',
    year: 2022,
    description: 'Grabación y edición para el BTS del videoclip de Marta Sango y Rakky Ripper en Mini DV. Fotos BTS',
    media: ASSETS.PROJECTS['LA CORRIENTE (Making Of)'].map(src => ({ type: 'image', src })),
    disciplines: ['Edición de vídeo', 'Grabación de vídeo', 'BTS', 'Postproducción', 'Fotografía fija'],
    link: 'https://www.youtube.com/watch?v=rbM2dwoCa6k',
  },
  // {
  //   id: 8,
  //   title: 'Escapar (Making Of)',
  //   year: 2022,
  //   description: 'Grabación del BTS de "Escapar" de Marta Sango',
  //   media: [
  //     { type: 'image', src: ASSETS.Gazpachuelo_0 },
  //   ],
  //   disciplines: ['Edición de vídeo', 'Grabación de vídeo', 'BTS'],
  //   link: 'https://www.youtube.com/watch?v=VBfAksHBNY0',
  // },
  {
    id: 9,
    title: 'Funked Up',
    year: 2022,
    description: 'Videoclip para <strong>Sandra Iris</strong>. Fotografía fija del set en <strong>35mm</strong> en tres localizaciones/sets.',
    media: ASSETS.PROJECTS['Funked Up'].map(src => ({ type: 'image', src })),
    disciplines: ['Dirección artística', 'Fotografía fija', 'BTS'],
    link: 'https://www.youtube.com/watch?v=jTVdulBDvhE',
  },
  {
    id: 10,
    title: 'Randall Boggs',
    year: 2022,
    description: 'Fotografía fija / promocional para el videoclip "Randall Boggs" de <strong>Daniel Arias</strong>',
    media: ASSETS.PROJECTS['Randall Boggs'].map(src => ({ type: 'image', src })),
    disciplines: ['Fotografía', 'Fotografía fija'],
    link: 'https://www.youtube.com/watch?v=vw2QzYA7Huk',
  },
  // {
  //   id: 11,
  //   title: '2 + 2',
  //   year: 2021,
  //   description: 'Videoclip de 2+2 con Andrea Duro y Daniel Arias. Sonido, Dirección Creativa y foto fija (portada del single).',
  //   media: [
  //     { type: 'image', src: ASSETS.Gazpachuelo_0 },
  //   ],
  //   disciplines: ['Dirección artística', 'Dirección creativa', 'Fotografía fija', 'Grabación de sonido'],
  //   link: 'https://www.youtube.com/watch?v=SR9kwKygzw8',
  // },
];
export default function Proyectos() {

  // Estado para controlar el modal de la galería
  const [modalState, setModalState] = useState({
    isOpen: false,
    mediaList: [],
    initialIndex: 0,
  });

  const openModal = (mediaList, initialIndex) => {
    setModalState({
      isOpen: true,
      mediaList,
      initialIndex,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mediaList: [],
      initialIndex: 0,
    });
  };

  return (
    <>
        <div className="w-full h-[60dvh] md:h-[800px] relative">
        <div className='flex flex-col items-center absolute top-[50%] left-[50%] w-full px-6 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='font-heading text-text text-5xl mb-6'>Proyectos</h1>
        <p className='text-text text-center px-4'>Aquí podrás ver todos los proyectos en los que he participado.</p>

        </div>
        <CameraViewfinder />
        </div>    
        <section className="mx-auto pb-12 px-6 md:px-12">
            {projects.map((project, index) => (
                <motion.section 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    id={project.title.toLowerCase()} key={project.id} className="py-12 border-t-2 px-0 border-primary max-w-full "
                >
                    
                    <ProjectSlider project={project} onImageClick={openModal} />
                    
                    
                    
                </motion.section>
            ))}
        </section>
        
        {/* Renderizado condicional del Modal */}
       {modalState.isOpen && (
          <LightboxModal
            mediaList={modalState.mediaList}
            initialIndex={modalState.initialIndex}
            onClose={closeModal}
          />
      )}
    </>
  );
}