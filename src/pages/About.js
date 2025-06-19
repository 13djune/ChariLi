import { Icon } from '@iconify/react';
import FancyButton from '../components/FancyButton';
import MrPotato from '../components/MrPotato';
import xari from '../assets/img/xari.webp'; 
import React, { useRef } from 'react';
import WorkLink from '../components/WorkLink';

export default function About() {
    const containerRef = useRef(null);
    return (
        <>
        <section className="max-w-3xl mx-auto">
            <div className="flex flex-row items-center justify-between">
                <div ref={containerRef} className="relative w-[200%] mx-auto">
                    {/* Imagen de fondo como base del tamaño */}
                    <img
                        src={xari}
                        alt="Fondo"
                        className="h-full w-full block"
                    />

                    {/* Bolas que rebotan encima de la imagen */}
                    <MrPotato className="z-10" image="https://assets.codepen.io/16327/circle.png" container={containerRef}/>
                    <MrPotato className="z-10"image="https://placekitten.com/125/125" container={containerRef}/>
                </div>
            <div className='pl-4'>
          <h1 className="text-3xl font-bold mb-4 text-text">¡Hola! Soy Chari Li,</h1>
          <p className="text-text">
        nací en Málaga y crecí en Torre del Mar, un pueblo en la costa de la Axarquía.
          </p>
          <p className="text-text">
          Nativa en redes sociales, desde muy joven he estado en contacto con el mundo del internet, llegando a gestionar junto a mi equipo cuentas y comunidades de más de 70.000 seguidores.
          </p>
            </div>
            </div>
        </section>
        <section className="max-w-5xl mx-auto my-[9rem]">
            <div className='flex flex-row'>
            <div className="card group">
            <div>
                    <Icon
                        icon="material-symbols:trophy-outline-rounded"
                        width="50"
                        height="50"
                        className="p-2 rounded-full bg-primary text-black-500"
                        />
                    </div>
                    <WorkLink className="cursor-pointer" key="gaz" href="https://www.youtube.com/watch?v=KA-7mkDLY28">"Gazpachuelo"</WorkLink>
                    <p className='text-xs'>
                     Categoría Mejor Corto en el Festival ADN 2023. Presentado y participando en el Festival Internacional de Cine en Guadalajara (México).
                    </p>
                    <br></br>
                    <WorkLink key="out"  href="...">"OutS1d3"</WorkLink>
                    <p className='text-xs'>
                        Coordinación en departamentos de dirección y producción, ganador a mejor dirección de arte en el Festival ADN 2025.
                        </p>

                </div>
                <div>
       
                </div>
                <div className="card group text-text hover:text-text-inverse dark:text-text dark:hover:text-text-inverse">
                <div>
                    <Icon
                        icon="material-symbols:explosion-outline-rounded"
                        width="50"
                        height="50"
                        className="p-2 rounded-full bg-primary text-black-500"
                        />
                    </div>
                    <h2 className="cursor-pointer pill"  href="">Dirección</h2>
                  
                    <h2 className="cursor-pointer pill"  href="">Producción</h2>
                  
                    <h2  className="cursor-pointer pill" href="">Fotografía</h2>

                    <h2 className="cursor-pointer pill"  href="">Sonido</h2>
                
                    <h2 className="cursor-pointer pill"  href="">BTS</h2>
                
                    <h2 className="cursor-pointer pill" href="">Dirección de arte</h2>
                     
                    <h2 className="cursor-pointer pill"  href="">Creación de contenido</h2>
                  
                </div>

            </div>
        </section>
        <section className="max-w-5xl mx-auto">
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
  