import { ASSETS } from '../constants/assets';
import { useState } from 'react';
import WorkLink from '../components/WorkLink';

export default function Contacto() {
  const [hoveredKey, setHoveredKey] = useState(null);

  const links = [
    {
      href: "https://www.instagram.com/sevenupfresquito/",
      label: "@sevenupfresquito",
      image: ASSETS.Sevenup,
      key: "1",
    },
    {
      href: "https://www.instagram.com/quesoenpolvo/",
      label: "@quesoenpolvo",
      image: ASSETS.Queso,
      key: "2",
    },
    {
      href: "https://www.lomography.com/homes/charili/photos?order=trending",
      label: 'Lomography',
      image: ASSETS.Lomography,
      key: "3",
    },
    {
      href: "https://www.linkedin.com/in/charili/",
      label: "LinkedIn",
      image: ASSETS.Linkedin,
      key: "4",
    },
    {
      href: "mailto:charidelafreedom@gmail.com",
      label: 'Email',
      image: ASSETS.Email,
      key: "5",
    },
  ];

  const hoveredImage = links.find(link => link.key === hoveredKey)?.image;

  return (
    <section className="mx-auto py-12 relative min-h-dvh flex flex-col justify-center">
      {/* Imagen en pantalla completa con blend mode */}
      {hoveredImage && (
        <img
          src={hoveredImage}
          alt="hover"
          className="fixed inset-0 w-full h-full object-cover opacity-70 z-40 pointer-events-none transition-opacity duration-300"
        />
      )}

      <div className="flex flex-col items-center relative z-10">
        <p className='text-text text-sm text-center uppercase py-4 w-[90%] md:w-[90%] md:w-[60%] lg:w-[40%] lg:w-[30%]'>Si tienes una <strong>idea rondando la cabeza</strong>, no la dejes escapar. <strong>Escríbeme</strong> y veamos qué puede salir de ahí.</p>
        <h1 className="text-text text-4xl font-heading text-center my-8 w-[90%] md:w-[60%] lg:w-[40%] uppercase">¿Nos ponemos en contacto?</h1>
        <div className="flex flex-col md:flex-row items-center my-8 gap-4 md:gap-0">
          {links.map(({ href, label, key }) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="mx-8 text-text "
            >
              <WorkLink className="" href={href}>{label}</WorkLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
