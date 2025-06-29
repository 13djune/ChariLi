import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Gazpachuelo from '../assets/img/GAZPACHUELO/CARTEL_GANADOR.jpg';
import DURA from '../assets/img/DURA.webp';
const projects = [
    {
      name: 'Gazpachuelo',
      link: '/projects#gazpachuelo',
      image: Gazpachuelo,
    },
    {
      name: 'DURA',
      link: '/projects#dura',
      image: DURA,
    },
    {
      name: 'Proyecto 3',
      link: '/projects#proyecto3',
      image: '/images/proyecto3.png',
    },
  ];
  

export default function Menu() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // Añade pequeño delay para evitar cierre abrupto
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredProject(null);
    }, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Botón */}
      <Link to="/projects" className="font-heading primarybutton">
  Proyectos
</Link>


      {/* Dropdown persistente */}
      {open && (
        <div className="absolute top-full -left-8 mt-2 flex text-black dark:text-white z-50">
          {/* Lista de proyectos */}
          <ul className="flex flex-col p-2 min-w-[160px] ">
            {projects.map((project, index) => (
              <li key={index}>
               <Link
  to={project.link} // 👈 aquí
  onMouseEnter={() => setHoveredProject(project)}
  className="block primarybutton justify-self-center m-1 border border-primary font-heading"
>
  {project.name}
</Link>

              </li>
            ))}
          </ul>

          {/* Imagen del proyecto */}
          {hoveredProject && (
            <div className="w-32 h-28 p-1">
              <img
                src={hoveredProject.image}
                alt={hoveredProject.name}
                className="w-40 h-40 object-cover object-left rounded-xl"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
