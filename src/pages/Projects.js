import ProjectSlider from '../components/ProjectSlider';
import Gazpachuelo_0 from '../assets/img/GAZPACHUELO/CARTEL_GANADOR.jpg';
import Gazpachuelo_1 from '../assets/img/GAZPACHUELO/596b0024-91de-4245-8a9d-e3b36581695a.jpg';
import Gazpachuelo_2 from '../assets/img/GAZPACHUELO/IMG_5628.jpg';
import Gazpachuelo_3 from '../assets/img/GAZPACHUELO/IMG_5642.jpg';
import Gazpachuelo_4 from '../assets/img/GAZPACHUELO/IMG_5649.jpg';
import Gazpachuelo_5 from '../assets/img/GAZPACHUELO/IMG_6691.jpg';
import Corriente_0 from '../assets/img/LA_CORRIENTE_BTS/137218.jpg';
import Corriente_1 from '../assets/img/LA_CORRIENTE_BTS/137223.jpg';
import Corriente_2 from '../assets/img/LA_CORRIENTE_BTS/137225.jpg';
import Corriente_3 from '../assets/img/LA_CORRIENTE_BTS/137227.jpg';
import Quimica_0 from '../assets/img/QUIMICA_AVERZZO/000009.jpg';
import Quimica_1 from '../assets/img/QUIMICA_AVERZZO/000012.jpg';
import  Quimica_2 from '../assets/img/QUIMICA_AVERZZO/000015.jpg';
import Quimica_3 from '../assets/img/QUIMICA_AVERZZO/000016.jpg';
import  Quimica_4 from '../assets/img/QUIMICA_AVERZZO/000021.jpg';
import Quimica_5 from '../assets/img/QUIMICA_AVERZZO/000024.jpg';
import Quimica_6 from '../assets/img/QUIMICA_AVERZZO/000026.jpg';
import Quimica_7 from '../assets/img/QUIMICA_AVERZZO/000030.jpg';
import  Quimica_8 from '../assets/img/QUIMICA_AVERZZO/000035.jpg';
import  Quimica_9 from '../assets/img/QUIMICA_AVERZZO/000036.jpg';
import Funked_0 from '../assets/img/FUNKED_UP/863118.jpg';
import Funked_1 from '../assets/img/FUNKED_UP/907702.jpg';
import Funked_2 from '../assets/img/FUNKED_UP/907704.jpg';
import Randall_0 from '../assets/img/RANDALL_BOGGS/806231.jpg';
import Randall_1 from '../assets/img/RANDALL_BOGGS/806232.jpg';
import Randall_2 from '../assets/img/RANDALL_BOGGS/806234.jpg';

const projects = [
  {
    id: 1,
    title: 'Gazpachuelo',
    year: 2023,
    description: 'Premio a Mejor Corto en Festival ADN y proyectado en el Festival Internacional de Cine en Guadalajara (FICG, MEXICO)',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
      { type: 'image', src: Gazpachuelo_1 },
      { type: 'image', src: Gazpachuelo_2 },
      { type: 'image', src: Gazpachuelo_3 },
      { type: 'image', src: Gazpachuelo_4 },
      { type: 'image', src: Gazpachuelo_5 },
    ],
    disciplines: ['Directora', 'Dirección Creativa', 'Producción audiovisual'],
    link: 'https://www.youtube.com/watch?v=KA-7mkDLY28',
  },
  {
    id: 2,
    title: 'DURA - RAKKY RIPPER',
    year: 2023,
    description: 'Grabando en un coche para Rakky Ripper en el videoclip "DURA"',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Operación de cámara', 'Dirección Creativa'],
    link: 'https://www.youtube.com/watch?v=ifsAMA9N4Mg',
  },
  {
    id: 3,
    title: 'Locurote',
    year: 2023,
    description: 'Videoclip de Daniel Arias',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Operación de cámara', 'Grabación de sonido'],
    link: 'https://www.youtube.com/watch?v=LLGJI6fENJA',
  },
  {
    id: 4,
    title: 'Química - Averzzo',
    year: 2023,
    description: 'Foto fija promocional para videoclip "Química" de Averzzo. Portada de la revista "DeKé Magazine".',
    media: [
      { type: 'image', src: Quimica_0 },
      { type: 'image', src: Quimica_1 },
      { type: 'image', src: Quimica_2 },
      { type: 'image', src: Quimica_3 },
      { type: 'image', src: Quimica_4 },
      { type: 'image', src: Quimica_5 },
      { type: 'image', src: Quimica_6 },
      { type: 'image', src: Quimica_7 },
      { type: 'image', src: Quimica_8 },
      { type: 'image', src: Quimica_9 },
    ],
    disciplines: ['Fotografía fija', 'Dirección Creativa'],
    link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  },
  // {
  //   id: 5,
  //   title: 'Crisálida - Mikemirror',
  //   year: 2022,
  //   description: 'YA NO ESTA EL VIDEOCLIP',
  //   media: [
  //     { type: 'image', src: Gazpachuelo_0 },
  //   ],
  //   disciplines: ['Dirección artística', 'Dirección Creativa'],
  //   link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  // },
  // {
  //   id: 6,
  //   title: 'Vídeos para reels The Mad Plug',
  //   year: 2022,
  //   description: 'YA NO ESTA EL VIDEO EN INSTA',
  //   media: [
  //     { type: 'image', src: Gazpachuelo_0 },
  //   ],
  //   disciplines: ['Operación de cámara', 'Publicidad', ' Grabación de vídeo'],
  //   link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  // },
  {
    id: 7,
    title: 'LA CORRIENTE (Making Of)',
    year: 2022,
    description: 'Grabación y edición para el BTS del videoclip de Marta Sango y Rakky Ripper. Fotos BTS',
    media: [
      { type: 'image', src: Corriente_0 },
      { type: 'image', src: Corriente_1 },
      { type: 'image', src: Corriente_2 },
      { type: 'image', src: Corriente_3 },
    ],
    disciplines: ['Edición de vídeo', 'Grabación de vídeo', 'BTS'],
    link: 'https://www.youtube.com/watch?v=rbM2dwoCa6k',
  },
  {
    id: 8,
    title: 'Escapar (Making Of)',
    year: 2022,
    description: 'Grabación del BTS de "Escapar" de Marta Sango',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Edición de vídeo', 'Grabación de vídeo', 'BTS'],
    link: 'https://www.youtube.com/watch?v=VBfAksHBNY0',
  },
  {
    id: 9,
    title: 'Funked Up',
    year: 2022,
    description: 'Videoclip para Sandra Iris',
    media: [
      { type: 'image', src: Funked_0 },
      { type: 'image', src: Funked_1 },
      { type: 'image', src: Funked_2 },

    ],
    disciplines: ['Dirección artística',],
    link: 'https://www.youtube.com/watch?v=jTVdulBDvhE',
  },
  {
    id: 10,
    title: 'Randall Boggs',
    year: 2022,
    description: 'Fotografía fija / promocional para el videoclip "Randall Boggs" de  Daniel Arias',
    media: [
      { type: 'image', src: Randall_0 },
      { type: 'image', src: Randall_1 },
      { type: 'image', src: Randall_2 },
    ],
    disciplines: ['Fotografía', 'Fotografía fija'],
    link: 'https://www.youtube.com/watch?v=vw2QzYA7Huk',
  },
  {
    id: 11,
    title: '2 + 2',
    year: 2021,
    description: 'Videoclip de 2+2 con Andrea Duro y Daniel Arias. Sonido, Dirección Creativa y foto fija (portada del single).',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Dirección artística', 'Dirección creativa', 'Fotografía fija', 'Grabación de sonido'],
    link: 'https://www.youtube.com/watch?v=SR9kwKygzw8',
  },
];
export default function Proyectos() {
  return (
    <section className="mx-auto py-12">
      {projects.map((project) => (
        <section id={project.title.toLowerCase()} key={project.id} className="py-12 border-t-2 px-0 border-primary max-w-full ">
          <ProjectSlider project={project} className=""/>
        </section>
      ))}
    </section>
  );
}
