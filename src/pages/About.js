import { Icon } from '@iconify/react';
import FancyButton from '../components/FancyButton';
import MrPotato from '../components/MrPotato';
import xari from '../assets/img/xari.webp'; 
import React, { useRef } from 'react';

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
          <h1 className="text-3xl font-bold mb-4 text-text">Artista audiovisual</h1>
          <p className="text-text">
          Me llamo Chari Li, nací en Málaga y crecí en Torre del Mar, un pueblo en la costa de la Axarquía.
          </p>
          <p className="text-text">
          Nativa en redes sociales, desde muy joven he estado en contacto con el mundo del internet, llegando a gestionar junto a mi equipo cuentas y comunidades de más de 70.000 seguidores.
          </p>
            </div>
            </div>
        </section>
        <section className="max-w-5xl mx-auto my-[9rem]">
            <div className='flex flex-row'>
                <div className='card '>
                    <div>
                    <Icon icon="material-symbols:trophy-outline-rounded" width="24" height="24" className='p-8 rounded-full bg-text '/>
                    </div>
                   
                    <ul>     
                    <li>Categoría Mejor Corto en Festival ADN 2024. Presentado y participando en el Festival Internacional de Cine en Guadalajara (México).</li>
                    <br></br>
                    <li >                    
                        Coordinación en departamentos de dirección y producción en “OutS1d3”, ganador a mejor dirección de arte en festival ADN 2025.</li>
                    </ul>
                </div>
                <div>
       
                </div>
                <div>
                    <h2></h2>
                    <p></p>
                </div>

            </div>
        </section>
        <section className="max-w-5xl mx-auto">
        <FancyButton label="Descargar CV" />
        </section>
        </>
      );
        
  }
  