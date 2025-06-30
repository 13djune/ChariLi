import Lomography from '../assets/img/CONTACT/Lomography.png';
import { useState } from 'react';
import WorkLink from '../components/WorkLink';

export default function Contacto() {
  const [hoveredKey, setHoveredKey] = useState(null);

  const links = [
    {
      href: "https://www.instagram.com/sevenupfresquito/",
      label: "@sevenupfresquito",
      image: "/images/fresquito.jpg",
      key: "1",
    },
    {
      href: "https://www.instagram.com/quesoenpolvo/",
      label: "@quesoenpolvo",
      image: "/images/queso.jpg",
      key: "2",
    },
    {
      href: "https://www.lomography.com/homes/charili/photos?order=trending",
      label: "Lomography",
      image: Lomography,
      key: "3",
    },
    {
      href: "https://www.linkedin.com/in/charili/",
      label: "LinkedIn",
      image: "/images/linkedin.jpg",
      key: "4",
    },
    {
      href: "mailto:charidelafreedom@gmail.com",
      label: "Email",
      image: "/images/email.jpg",
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
          className="fixed inset-0 w-full h-full object-cover opacity-70 z-40 pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-300"
        />
      )}

      <div className="flex flex-col items-center relative z-10">
        <p className='text-text text-sm text-center uppercase py-4 w-[30%]'>Si tienes una idea rondando la cabeza, no la dejes escapar. Escríbeme y veamos qué puede salir de ahí.</p>
        <h1 className="text-text text-4xl font-heading text-center my-8 w-[40%] uppercase">¿Nos ponemos en contacto?</h1>
        <div className="flex flex-row items-center my-8">
          {links.map(({ href, label, key }) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="mx-8"
            >
              <WorkLink className="" href={href}>{label}</WorkLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
