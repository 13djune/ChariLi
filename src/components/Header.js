import { useEffect, useState } from 'react';
import BulbToggle from './BulbToggle';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Switch from './Switch';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      className={`sticky top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 text-text bg-none transition-transform duration-300
        ${showHeader ? 'translate-y-0' : '-translate-y-[150%]'}`}
    >
      <div className="text-xl font-bold tracking-tight font-heading">
        <Link to="/">ChariLi</Link>
      </div>

      {/* Desktop nav */}
      <nav className="hidden sm:flex gap-6 text-sm font-medium items-center">
        <Link to="/about" className="primarybutton font-heading z-50">Sobre mí</Link>
        <Menu />
        <Link to="/contact" className="primarybutton font-heading z-50">Contacto</Link>
      </nav>

      {/* BulbToggle visible en todos los tamaños */}
      <div className="hidden sm:block">
        <BulbToggle />
      </div>

      {/* Botón menú + Bulb en móvil */}
      <div className="sm:hidden flex items-center gap-3">
        <button onClick={toggleMobileMenu} className="text-2xl z-50">
          <Icon icon={mobileMenuOpen ? 'material-symbols:cancel-outline-rounded' : 'material-symbols:menu-rounded'} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 text-2xl text-center h-[100dvh]">
          <Link to="/about" onClick={toggleMobileMenu}>Sobre mí</Link>
          <Link to="/projects" onClick={toggleMobileMenu}>Proyectos</Link>
          <Link to="/contact" onClick={toggleMobileMenu}>Contacto</Link>

          {/* Interruptor visual */}
          <div className="scale-[60%] border-2 border-black dark:border-white rounded-xl p-4">
          <Switch />
          </div>
        </div>
      )}
    </header>
  );
}
