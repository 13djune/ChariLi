import ProjectSlider from '../components/ProjectSlider';
import Gazpachuelo_0 from '../assets/img/Gazpachuelo_0.webp';

const projects = [
  {
    id: 1,
    title: 'Gazpachuelo',
    year: 2023,
    description: 'Premio a Mejor Corto en Festival ADN y proyectado en el Festival Internacional de Cine en Guadalajara (FICG, MEXICO)',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
      { type: 'image', src: Gazpachuelo_0 },
      { type: 'image', src: Gazpachuelo_0 },
      { type: 'image', src: Gazpachuelo_0 },
      { type: 'image', src: Gazpachuelo_0 },
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
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Fotografía fija', 'Dirección Creativa'],
    link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  },
  {
    id: 5,
    title: 'Crisálida - Mikemirror',
    year: 2022,
    description: 'YA NO ESTA EL VIDEOCLIP',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Dirección artística', 'Dirección Creativa'],
    link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  },
  {
    id: 6,
    title: 'Vídeos para reels The Mad Plug',
    year: 2022,
    description: 'YA NO ESTA EL VIDEO EN INSTA',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
    ],
    disciplines: ['Operación de cámara', 'Publicidad', ' Grabación de vídeo'],
    link: 'https://www.youtube.com/watch?v=Wr7C414tpU8',
  },
  {
    id: 7,
    title: 'LA CORRIENTE (Making Of)',
    year: 2022,
    description: 'Grabación y edición para el BTS del videoclip de Marta Sango y Rakky Ripper. Fotos BTS',
    media: [
      { type: 'image', src: Gazpachuelo_0 },
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
      { type: 'image', src: Gazpachuelo_0 },
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
      { type: 'image', src: Gazpachuelo_0 },
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
