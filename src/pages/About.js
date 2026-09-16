import { Icon } from '@iconify/react';
import FancyButton from '../components/FancyButton';
import MrPotato from '../components/MrPotato';
import { ASSETS } from '../constants/assets';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import WorkLink from '../components/WorkLink';
import SkillCircle from '../components/SkillCircle';

export default function About() {
  const containerRef = useRef(null);
  const lomographyRef = useRef(null);
  // Mantener solo un estado para el hover
  const [isLomographyHovered, setIsLomographyHovered] = useState(false);
  // Se elimina isLomographyVisible y TRANSITION_DURATION

  const handleMouseEnter = () => {
    // Solo se cambia el estado a true. La transición la hace CSS.
    setIsLomographyHovered(true);
  };

  const handleMouseLeave = () => {
    // Solo se cambia el estado a false. La transición la hace CSS.
    setIsLomographyHovered(false);
  };
  
  const handleTouchStart = () => handleMouseEnter();
  const handleTouchEnd = () => handleMouseLeave();


  return (
    <>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between mt-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            ref={containerRef} 
            className="relative w-[200%] mx-auto"
          >
            <img loading="lazy" decoding="async" src={ASSETS.xari} alt="Fondo" className="h-full w-full block" />

            <MrPotato
              className="z-10"
              image={ASSETS.Sevenup}
              container={containerRef}
            />
            <MrPotato
              className="z-10"
              image={ASSETS.Queso}
              container={containerRef}
            />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.2, delayChildren: 0.4 }
              }
            }}
            className="pl-4 font-body leading-relaxed"
          >
            <motion.h1 
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="text-3xl font-heading font-bold mb-4 text-text"
            >¡Hola! Soy Chari Li,</motion.h1>
            <motion.p 
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="text-text"
            >
              nací en <strong>Málaga</strong> y crecí en <strong>Torre del Mar</strong>, un pueblo en la costa de la Axarquía.
            </motion.p>
            <br />
            <motion.p 
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="text-text"
            >
              Durante los años en los que estudié <strong>Comunicación Audiovisual</strong> en <strong>Madrid</strong>, no he parado
              de desarrollarme profesionalmente en diferentes campos.
            </motion.p>
            <br />
            <motion.p 
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="text-text"
            >
              <strong>Nativa en redes sociales</strong>, desde muy joven he estado en contacto con el mundo del
              internet, llegando a gestionar junto a mi equipo cuentas y comunidades de <strong>más de
              70.000 seguidores</strong>.
            </motion.p>
            <br />
            <motion.p 
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="text-text"
            >
              Estoy dispuesta a trabajar y desempeñar distintos cargos para ganar experiencia en los
              mundos que me apasionan. Nunca se termina de aprender sobre <strong>cine, televisión, radio,
              espectáculos…</strong>
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Sección de trabajos */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto my-12 md:my-[9rem]"
      >
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* CARD 1 */}
<motion.div 
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="card group text-text dark:text-text hover:text-text dark:hover:text-text-inverse transition-colors duration-300 p-6 rounded-lg border border-neutral-700"
>
  <div>
    <Icon
      icon="material-symbols:trophy-outline-rounded"
      width="50"
      height="50"
      className="p-2 rounded-full bg-primary text-black-500"
    />
  </div>

  <WorkLink
    className="font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
    href="https://www.youtube.com/watch?v=KA-7mkDLY28"
  >
    'Gazpachuelo'
  </WorkLink>

  <p className="text-sm text-center break-words transition-colors duration-300 dark:group-hover:text-text-inverse">
    Categoría Mejor Corto en el <a href="https://festivaladn.com" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline">Festival ADN 2023</a>. Presentado y participando en el Festival Internacional de Cine en Guadalajara (México).
  </p>

  <br />

  <WorkLink
    className="font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
    href="https://www.instagram.com/festivaladn/p/DITnXBNI4z6/?hl=en"
  >
    "OutS1d3"
  </WorkLink>

  <p className="text-sm text-center break-words transition-colors duration-300 dark:group-hover:text-text-inverse">
    Coordinación en departamentos de dirección y producción, ganador a mejor dirección de arte en el <a href="https://festivaladn.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline">Festival ADN 2025</a>.
  </p>
</motion.div>


          {/* CARD 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card group text-text dark:text-text hover:text-text dark:hover:text-text-inverse transition-colors duration-300 p-6 rounded-lg border border-neutral-700"
          >
            <div>
              <Icon
                icon="material-symbols:explosion-outline-rounded"
                width="50"
                height="50"
                className="p-2 rounded-full bg-primary text-black-500"
              />
            </div>

            {[
              'Dirección',
              'Producción',
              'Fotografía',
              'Sonido',
              'BTS',
              'Dirección de arte',
              'Creación de contenido',
            ].map((skill) => (
              <h2
                key={skill}
                className="pill transition-colors duration-300 dark:group-hover:text-text-inverse"
              >
                {skill}
              </h2>
            ))}
          </motion.div>

          {/* CARD 3 - ARREGLO FINAL */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            ref={lomographyRef} 
            className="card group text-text dark:text-text hover:text-text dark:hover:text-text-inverse transition-colors duration-300 p-6 rounded-lg border border-neutral-700 relative flex flex-col items-center text-center justify-center" 
          >
            <div>
              <Icon
                icon="material-symbols:menu-book-outline-rounded"
                width="50"
                height="50"
                className="p-2 rounded-full bg-primary text-black-500"
              />
            </div>

            <div className="relative z-50 flex flex-col items-center justify-center w-full mt-4">
              <WorkLink
                className="font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
                href="https://cadenaser.com/nacional/2023/06/21/dos-cortometrajes-universitarios-espanoles-en-el-programa-oficial-del-festival-internacional-de-cine-de-guadalajara-cadena-ser/"
              >
                Cadena Ser
              </WorkLink>

              <p className="text-sm text-center font-bodyItalic transition-colors duration-300 dark:group-hover:text-text-inverse">
                "Presentar en México un proyecto que refleja mi tierra, Andalucía, y exportar
                Gazpachuelo a un festival de prestigio como el FICG, es todo un sueño para mí y mi
                equipo." -Chari Li
              </p>
            </div>

            <br />
            
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart} 
              onTouchEnd={handleTouchEnd}
              className="relative z-10 flex flex-col items-center justify-center w-full h-full py-6 mt-2"
            >
              <WorkLink 
                className="font-heading block text-center mb-2 relative transition-colors duration-300 dark:group-hover:text-text-inverse"
                href="https://www.lomography.com/homes/charili/photos?order=trending"
              >
                Lomography
              </WorkLink>

              <p className="text-sm text-center break-words transition-colors duration-300 dark:group-hover:text-text-inverse relative">
                Seleccionada foto del día y foto del mes en Lomography.
              </p>
            </div>

                        
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-50">
              <motion.img loading="lazy" decoding="async"
                 className="pointer-events-none absolute shadow-2xl w-24 sm:w-32 md:w-40 lg:w-48 rounded-xl"
                 alt="Portada de Lomography - Foto de la semana"
                 src={ASSETS.Lomo1}
                 initial={false}
                 animate={{ 
                   opacity: isLomographyHovered ? 1 : 0,
                   x: isLomographyHovered ? "-105%" : 0,
                   y: isLomographyHovered ? -60 : 0,
                   rotate: isLomographyHovered ? -5 : 0, 
                   scale: isLomographyHovered ? 1 : 0.75 
                 }}
                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <motion.img loading="lazy" decoding="async"
                 className="pointer-events-none absolute shadow-2xl w-24 sm:w-32 md:w-40 lg:w-48 rounded-xl"
                 alt="Portada de Lomography - Foto del día"
                 src={ASSETS.Lomo3}
                 initial={false}
                 animate={{ 
                   opacity: isLomographyHovered ? 1 : 0,
                   x: isLomographyHovered ? 0 : 0,
                   y: isLomographyHovered ? -60 : 0,
                   rotate: isLomographyHovered ? 0 : 0, 
                   scale: isLomographyHovered ? 1.1 : 0.75 
                 }}
                 transition={{ type: "spring", stiffness: 300, damping: 25, delay: isLomographyHovered ? 0.05 : 0 }}
              />
              <motion.img loading="lazy" decoding="async"
                 className="pointer-events-none absolute shadow-2xl w-24 sm:w-32 md:w-40 lg:w-48 rounded-xl"
                 alt="Portada de Lomography - Foto de la semana"
                 src={ASSETS.Lomo2}
                 initial={false}
                 animate={{ 
                   opacity: isLomographyHovered ? 1 : 0,
                   x: isLomographyHovered ? "105%" : 0,
                   y: isLomographyHovered ? -60 : 0,
                   rotate: isLomographyHovered ? 5 : 0, 
                   scale: isLomographyHovered ? 1 : 0.75 
                 }}
                 transition={{ type: "spring", stiffness: 300, damping: 25, delay: isLomographyHovered ? 0.1 : 0 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Sección Skills */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto flex flex-col items-center z-40"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="text-xl"
        >Mis skills:</motion.h1>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            }
          }}
          className="grid grid-cols-3 gap-6 m-10"
        >
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}>
            <SkillCircle
              label="Dirección"
              icon="material-symbols:movie-outline-rounded"
              percent={80}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}>
            <SkillCircle
              label="Fotografía analógica + digital"
              icon="material-symbols:camera-roll-outline-rounded"
              percent={90}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}>
            <SkillCircle
              label="Creatividad"
              icon="material-symbols:lightbulb-2-outline-rounded"
              percent={100}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}>
            <SkillCircle
              label="Edición foto + vídeo"
              icon="material-symbols:edit-outline-rounded"
              percent={70}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}>
            <SkillCircle
              label="Social media"
              icon="material-symbols:animated-images-outline-rounded"
              percent={95}
            />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}>
            <SkillCircle
              label="Publicidad"
              icon="material-symbols:connect-without-contact-outline-rounded"
              percent={74}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <FancyButton
            label="Descargar CV"
            icon={
              <Icon
                icon="material-symbols:download-2-outline-rounded"
                width="20"
                height="20"
                className="text-current"
              />
            }
          />
        </motion.div>
      </motion.section>
    </>
  );
}