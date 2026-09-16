const fs = require('fs');

const footerContent = `
import { useState } from 'react';
import { Icon } from '@iconify/react';
import WorkLink from './WorkLink';

const Lomography = process.env.PUBLIC_URL + '/img/CONTACT/Lomography.png';
const Email = process.env.PUBLIC_URL + '/img/CONTACT/Email.png';
const Linkedin = process.env.PUBLIC_URL + '/img/CONTACT/Linkedin.png';
const Queso = process.env.PUBLIC_URL + '/img/CONTACT/Queso.png';
const Sevenup = process.env.PUBLIC_URL + '/img/CONTACT/Sevenup.png';

export default function Footer() {
  const [hoveredKey, setHoveredKey] = useState(null);

  const links = [
    { href: "https://www.instagram.com/sevenupfresquito/", label: "@sevenupfresquito", image: Sevenup, key: "1" },
    { href: "https://www.instagram.com/quesoenpolvo/", label: "@quesoenpolvo", image: Queso, key: "2" },
    { href: "https://www.lomography.com/homes/charili/photos?order=trending", label: "Lomography", image: Lomography, key: "3" },
    { href: "https://www.linkedin.com/in/charili/", label: "LinkedIn", image: Linkedin, key: "4" },
    { href: "mailto:charidelafreedom@gmail.com", label: "Email", image: Email, key: "5" },
  ];

  const icons = [
    'material-symbols:photo-camera-outline-rounded', 'material-symbols:audio-video-receiver-outline-rounded',
    'material-symbols:extension-outline', 'material-symbols:mic-outline-rounded', 'material-symbols:movie-edit-outline-rounded',
    'material-symbols:blur-on', 'material-symbols:dirty-lens-outline-rounded', 'material-symbols:theaters-rounded',
    'material-symbols:playing-cards-outline-rounded', 'material-symbols:music-cast-rounded', 'material-symbols:filter-drama-outline-rounded',
    'mdi:star-four-points-outline', 'material-symbols:camera-outline-rounded', 'material-symbols:star-shine-outline-rounded',
    'material-symbols:dinner-dining-outline-rounded', 'material-symbols:psychiatry-outline-rounded', 'material-symbols:speed-camera-outline-rounded',
    'material-symbols:confirmation-number-outline-rounded', 'material-symbols:beach-access-rounded', 'material-symbols:fragrance-rounded',
    'material-symbols:mic-external-on-outline-rounded', 'material-symbols:photo-filter-rounded', 'material-symbols:phonelink-ring-rounded',
    'material-symbols:gallery-thumbnail-outline-rounded', 'material-symbols:radio-outline-rounded', 'material-symbols:draw-abstract-outline',
    'material-symbols:folder-zip-outline-rounded', 'material-symbols:draw', 'material-symbols:trail-length-outline-rounded',
    'material-symbols:electrical-services-rounded', 'material-symbols:dirty-lens-outline-rounded', 'material-symbols:wb-incandescent-outline-rounded',
  ];

  const hoveredImage = links.find(link => link.key === hoveredKey)?.image;

  return (
    <footer id="contacto" className="bg-background pt-8 z-0 relative">
      {hoveredImage && (
        <img
          src={hoveredImage}
          alt="hover"
          className="absolute inset-0 w-full h-full object-cover opacity-70 z-40 pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-300"
        />
      )}

      {/* Marquee de iconos */}
      <div className="relative overflow-hidden z-50 mb-12" aria-hidden="true">
        <div className="marquee">
          <div className="marquee-content mb-4">
            {[...icons, ...icons, ...icons].map((icon, i) => (
              <Icon
                key={i}
                icon={icon}
                className="mx-6 text-primary text-3xl sm:text-4xl"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Seccion Contacto */}
      <div className="flex flex-col items-center relative z-50 pb-16 sm:pb-24 max-w-7xl mx-auto px-6">
        <p className="text-text text-sm sm:text-base text-center uppercase py-4 max-w-2xl font-body">
          Si tienes una <strong>idea rondando la cabeza</strong>, no la dejes escapar. <strong>Escríbeme</strong> y veamos qué puede salir de ahí.
        </p>
        <h2 className="text-text text-3xl sm:text-5xl font-heading text-center my-8 max-w-3xl uppercase tracking-wider">
          ¿Nos ponemos en contacto?
        </h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 my-8">
          {links.map(({ href, label, key }) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="text-text text-lg sm:text-xl"
            >
              <WorkLink href={href}>{label}</WorkLink>
            </div>
          ))}
        </div>
      </div>

      {/* Footer base sin Lava */}
      <div className="relative w-full bg-black py-16 flex flex-col items-center justify-center">
        <div className="relative z-50 text-white flex flex-col items-center">
          <p className="p-6 text-center text-sm sm:text-base font-body pointer-events-none">
            © {new Date().getFullYear()} ChariLi. Todos los derechos reservados.
          </p>
          <p className="px-6 pt-6 pb-2 text-center text-sm sm:text-base font-body border-t border-white/30 w-max pointer-events-none uppercase tracking-widest">
            website diseñada & desarrollada por
          </p>
          <p className="text-center text-sm sm:text-base font-body">
            <a
              href="https://belencastillo.netlify.app/"
              className="hover:underline outline-none focus:ring-2 focus:ring-white rounded uppercase tracking-wider font-bold"
              aria-label="Sitio web de June Castillo, se abre en una nueva pestaña"
              target="_blank"
              rel="noopener noreferrer"
            >
              june castillo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
`;
fs.writeFileSync('src/components/Footer.jsx', footerContent);
