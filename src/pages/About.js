import { Icon } from '@iconify/react';
import FancyButton from '../components/FancyButton';
import MrPotato from '../components/MrPotato';
import xari from '../assets/img/xari.webp';
import React, { useRef } from 'react';
import WorkLink from '../components/WorkLink';
import SkillCircle from '../components/SkillCircle';
export default function About() {
  const containerRef = useRef(null);

  return (
    <>

      <section className="max-w-4xl mx-auto">
        <div className="flex flex-row items-center justify-between">
          <div ref={containerRef} className="relative w-[200%] mx-auto">
            {/* Imagen de fondo como base del tamaño */}
            <img src={xari} alt="Fondo" className="h-full w-full block" />

            {/* Bolas que rebotan encima de la imagen */}
            <MrPotato
              className="z-10"
              image="https://assets.codepen.io/16327/circle.png"
              container={containerRef}
            />
            <MrPotato
              className="z-10"
              image="https://placekitten.com/125/125"
              container={containerRef}
            />
          </div>

          <div className="pl-4">
            <h1 className="text-3xl font-bold mb-4 text-text">¡Hola! Soy Chari Li,</h1>
            <p className="text-text">
              nací en Málaga y crecí en Torre del Mar, un pueblo en la costa de la Axarquía.
            </p>
            <br />
            <p className="text-text">
              Durante los años en los que estudié Comunicación Audiovisual en Madrid, no he parado
              de desarrollarme profesionalmente en diferentes campos.
            </p>
            <br />
            <p className="text-text">
              Nativa en redes sociales, desde muy joven he estado en contacto con el mundo del
              internet, llegando a gestionar junto a mi equipo cuentas y comunidades de más de
              70.000 seguidores.
            </p>
            <br />
            <p className="text-text">
              Estoy dispuesta a trabajar y desempeñar distintos cargos para ganar experiencia en los
              mundos que me apasionan. Nunca se termina de aprender sobre cine, televisión, radio,
              espectáculos…
            </p>
          </div>
        </div>
      </section>

      {/* Sección de trabajos */}
      <section className="max-w-5xl mx-auto my-[9rem]">
        <div className="flex flex-row justify-between gap-6">
          {/* CARD 1 */}
<div className="card group text-text dark:text-text hover:text-text dark:hover:text-text-inverse transition-colors duration-300 p-6 rounded-lg border border-neutral-700">
  <div>
    <Icon
      icon="material-symbols:trophy-outline-rounded"
      width="50"
      height="50"
      className="p-2 rounded-full bg-primary text-black-500"
    />
  </div>

  <WorkLink
    className="cursor-pointer font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
    href="https://www.youtube.com/watch?v=KA-7mkDLY28"
  >
    "Gazpachuelo"
  </WorkLink>

  <p className="text-sm text-center transition-colors duration-300 dark:group-hover:text-text-inverse">
    Categoría Mejor Corto en el Festival ADN 2023. Presentado y participando en el Festival
    Internacional de Cine en Guadalajara (México).
  </p>

  <br />

  <WorkLink
    className="cursor-pointer font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
    href="..."
  >
    "OutS1d3"
  </WorkLink>

  <p className="text-sm text-center transition-colors duration-300 dark:group-hover:text-text-inverse">
    Coordinación en departamentos de dirección y producción, ganador a mejor dirección de arte en el
    Festival ADN 2025.
  </p>
</div>


          {/* CARD 2 */}
          <div className="card group text-text dark:text-text hover:text-text dark:hover:text-text-inverse transition-colors duration-300 p-6 rounded-lg border border-neutral-700">
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
                className="cursor-pointer pill transition-colors duration-300 dark:group-hover:text-text-inverse"
              >
                {skill}
              </h2>
            ))}
          </div>

          {/* CARD 3 */}
          <div className="card group text-text dark:text-text hover:text-text dark:hover:text-text-inverse transition-colors duration-300 p-6 rounded-lg border border-neutral-700">
            <div>
              <Icon
                icon="material-symbols:menu-book-outline-rounded"
                width="50"
                height="50"
                className="p-2 rounded-full bg-primary text-black-500"
              />
            </div>

            <WorkLink
              className="cursor-pointer font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
              href="https://cadenaser.com/nacional/2023/06/21/dos-cortometrajes-universitarios-espanoles-en-el-programa-oficial-del-festival-internacional-de-cine-de-guadalajara-cadena-ser/"
            >
              Cadena Ser
            </WorkLink>

            <p className="text-sm text-center font-bodyItalic transition-colors duration-300 dark:group-hover:text-text-inverse">
              "Presentar en México un proyecto que refleja mi tierra, Andalucía, y exportar
              Gazpachuelo a un festival de prestigio como el FICG, es todo un sueño para mí y mi
              equipo."
            </p>

            <br />

            <WorkLink
              className="cursor-pointer font-heading text-text dark:group-hover:text-text-inverse transition-colors duration-300"
              href="..."
            >
              Lomography
            </WorkLink>

            <p className="text-sm text-center transition-colors duration-300 dark:group-hover:text-text-inverse">
              Seleccionada foto del día y foto del mes en Lomography.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Skills */}
      <section className="max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-xl">Mis skills:</h1>

        <div className="grid grid-cols-3 gap-6 m-10">
          <SkillCircle
            label="Dirección"
            icon="material-symbols:movie-outline-rounded"
            percent={80}
          />
          <SkillCircle
            label="Fotografía analógica + digital"
            icon="material-symbols:camera-roll-outline-rounded"
            percent={90}
          />
          <SkillCircle
            label="Creatividad"
            icon="material-symbols:lightbulb-2-outline-rounded"
            percent={100}
          />
          <SkillCircle
            label="Edición foto + vídeo"
            icon="material-symbols:edit-outline-rounded"
            percent={70}
          />
          <SkillCircle
            label="Social media"
            icon="material-symbols:animated-images-outline-rounded"
            percent={95}
          />
          <SkillCircle
            label="Publicidad"
            icon="material-symbols:connect-without-contact-outline-rounded"
            percent={74}
          />
        </div>

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
      </section>
    </>
  );
}
