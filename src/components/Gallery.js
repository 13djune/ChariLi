import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import '../index.css'; // Asegúrate de incluir el CSS que compartiste
import Gallery_0 from '../assets/img/GALLERY/000005.jpg';
import Gallery_1 from '../assets/img/GALLERY/000005(1).jpg';
import Gallery_2 from '../assets/img/GALLERY/000012(1).jpg';
import Gallery_3 from '../assets/img/GALLERY/000013.jpg';
import Gallery_4 from '../assets/img/GALLERY/000017.jpg';
import Gallery_5 from '../assets/img/GALLERY/000026(1).jpg';
import Gallery_6 from '../assets/img/GALLERY/006902.jpg';
import Gallery_7 from '../assets/img/GALLERY/007007.jpg';
import Gallery_8 from '../assets/img/GALLERY/007011.jpg';
import Gallery_9 from '../assets/img/GALLERY/007027.jpg';
import Gallery_10 from '../assets/img/GALLERY/026510.jpg';
import Gallery_11 from '../assets/img/GALLERY/026522.jpg';
import Gallery_12 from '../assets/img/GALLERY/026601.jpg';
import Gallery_13 from '../assets/img/GALLERY/026624.jpg';
import Gallery_14 from '../assets/img/GALLERY/026632.jpg';
import Gallery_15 from '../assets/img/GALLERY/083204.jpg';
import Gallery_16 from '../assets/img/GALLERY/083205.jpg';
import Gallery_17 from '../assets/img/GALLERY/284828.jpg';
import Gallery_18 from '../assets/img/GALLERY/284829.jpg';
import Gallery_19 from '../assets/img/GALLERY/285105.jpg';
import Gallery_20 from '../assets/img/GALLERY/285116.jpg';
import Gallery_21 from '../assets/img/GALLERY/285123.jpg';
import Gallery_22 from '../assets/img/GALLERY/476025.jpg';
import Gallery_23 from '../assets/img/GALLERY/602502.jpg';
import Gallery_24 from '../assets/img/GALLERY/602607.jpg';
import Gallery_25 from '../assets/img/GALLERY/602610.jpg';
import Gallery_26 from '../assets/img/GALLERY/863013.jpg';
import Gallery_27 from '../assets/img/GALLERY/863018.jpg';
import Gallery_28 from '../assets/img/GALLERY/907509.jpg';
import Gallery_29 from '../assets/img/GALLERY/941424.jpg';
import Gallery_30 from '../assets/img/GALLERY/941431.jpg';
import Gallery_31 from '../assets/img/GALLERY/IMG_5645.jpg';
import Gallery_32 from '../assets/img/GALLERY/IMG_5701.jpg';
import Gallery_33 from '../assets/img/GALLERY/IMG_5735.jpg';
import Gallery_34 from '../assets/img/GALLERY/IMG_9575.jpg';
import Gallery_35 from '../assets/img/GALLERY/IMG_9580.jpg';
import Gallery_36 from '../assets/img/GALLERY/Negative0-04-0A(1).jpg';
import Gallery_37 from '../assets/img/GALLERY/Negative0-09-09(1).jpg';
import Gallery_38 from '../assets/img/GALLERY/Negative0-10-10(1).jpg';
import Gallery_39 from '../assets/img/GALLERY/Negative0-22-22(1).jpg';
import Gallery_40 from '../assets/img/GALLERY/Negative0-25-21A(1).jpg';
import Gallery_41 from '../assets/img/GALLERY/Negative0-32-32(1)(1).jpg';
import Gallery_42 from '../assets/img/GALLERY/Negative0-32-32(1).jpg';
import Gallery_43 from '../assets/img/GALLERY/Negative0-40-40(1).jpg';



gsap.registerPlugin(InertiaPlugin);

const images = [
    { src: Gallery_0, title: "Imagen 1", description: "..." },
    { src: Gallery_1, title: "Imagen 2", description: "..." },
    { src: Gallery_2, title: "Imagen 2", description: "..." },
    { src: Gallery_3, title: "Imagen 2", description: "..." },
    { src: Gallery_4, title: "Imagen 2", description: "..." },
    { src: Gallery_5, title: "Imagen 2", description: "..." },
    { src: Gallery_6, title: "Imagen 2", description: "..." },
    { src: Gallery_7, title: "Imagen 2", description: "..." },
    { src: Gallery_8, title: "Imagen 2", description: "..." },
    { src: Gallery_9, title: "Imagen 2", description: "..." },
    { src: Gallery_10, title: "Imagen 2", description: "..." },
    { src: Gallery_11, title: "Imagen 2", description: "..." },
    { src: Gallery_12, title: "Imagen 2", description: "..." },
    { src: Gallery_13, title: "Imagen 2", description: "..." },
    { src: Gallery_14, title: "Imagen 2", description: "..." },
    { src: Gallery_15, title: "Imagen 2", description: "..." },
    { src: Gallery_16, title: "Imagen 2", description: "..." },
    { src: Gallery_17, title: "Imagen 2", description: "..." },
    { src: Gallery_18, title: "Imagen 2", description: "..." },
    { src: Gallery_19, title: "Imagen 2", description: "..." },
    { src: Gallery_20, title: "Imagen 2", description: "..." },
    { src: Gallery_21, title: "Imagen 2", description: "..." },
    { src: Gallery_22, title: "Imagen 2", description: "..." },
    { src: Gallery_23, title: "Imagen 2", description: "..." },
    { src: Gallery_24, title: "Imagen 2", description: "..." },
    { src: Gallery_25, title: "Imagen 2", description: "..." },
    { src: Gallery_26, title: "Imagen 2", description: "..." },
    { src: Gallery_27, title: "Imagen 2", description: "..." },
    { src: Gallery_28, title: "Imagen 2", description: "..." },
    { src: Gallery_29, title: "Imagen 2", description: "..." },
    { src: Gallery_30, title: "Imagen 2", description: "..." },
    { src: Gallery_31, title:" Imagen 31",description:"" },
    { src: Gallery_32, title:" Imagen 32",description:"" },
    { src: Gallery_33, title:" Imagen 33",description:"" },
    { src: Gallery_34, title:" Imagen 34",description:"" },
    { src: Gallery_35, title:" Imagen 35",description:"" },
    { src: Gallery_36, title:" Imagen 36",description:"" },
    { src: Gallery_37, title:" Imagen 37",description:"" },
    { src: Gallery_38, title:" Imagen 38",description:"" },
    { src: Gallery_39, title:" Imagen 39",description:"" },
    { src: Gallery_40, title:" Imagen 40",description:"" },
    { src: Gallery_41, title:" Imagen 41",description:"" },
    { src: Gallery_42, title:" Imagen 42",description:"" },
    { src: Gallery_43, title:" Imagen 43",description:"" }

    // ...
  ];
  

const Modal = ({ img, onClose }) => {
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={img.src} alt={img.title} />
        <h2>{img.title}</h2>
        <p>{img.description}</p>
      </div>
    </div>,
    document.body
  );
};

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  let oldX = 0, oldY = 0, deltaX = 0, deltaY = 0;

  useEffect(() => {
    const root = document.querySelector('.mwg_effect000');

    const handleMouseMove = (e) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    const handleHover = (el) => {
      const img = el.querySelector('img');
      const tl = gsap.timeline({ onComplete: () => tl.kill() });
      tl.timeScale(1.2);
      tl.to(img, {
        inertia: {
          x: { velocity: deltaX * 30, end: 0 },
          y: { velocity: deltaY * 30, end: 0 }
        }
      });
      tl.fromTo(img, { rotate: 0 }, {
        duration: 0.4,
        rotate: (Math.random() - 0.5) * 30,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      }, '<');
    };

    root.addEventListener('mousemove', handleMouseMove);
    root.querySelectorAll('.media').forEach(el => {
      el.addEventListener('mouseenter', () => handleHover(el));
    });

    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="mwg_effect000 max-w-5xl mx-auto my-[9rem]">
      <div className="header flex flex-col items-center">
       <h1 className="text-3xl font-bold mb-4 text-text">Mi álbum</h1> 
        
      </div>

      <div className="medias">
        {images.map((img, idx) => (
          <div className="media" key={idx} onClick={() => setSelected(img)}>
            <img src={img.src} alt={img.title} />
          </div>
        ))}
      </div>

      {selected && <Modal img={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
