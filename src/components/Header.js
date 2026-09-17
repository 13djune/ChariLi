import { useEffect, useState } from 'react';
import BulbToggle from './BulbToggle';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Switch from './Switch';
import { motion, AnimatePresence } from 'framer-motion';

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
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -150 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 text-text bg-none`}
      >
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold tracking-tight font-heading group"
        >
          <Link to="/" className="interactive-link">
            ChariLi
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100" />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:flex gap-6 text-sm font-medium items-center mr-16 sm:mr-20"
        >
          <Link to="/about" className="primarybutton font-heading z-50">Sobre mí</Link>
          <Link to="/projects" className="primarybutton font-heading z-50">Proyectos</Link>
          <a href="#contacto" className="primarybutton font-heading z-50">Contacto</a>
        </motion.nav>

        {/* Botón menú en móvil */}
        <div className="sm:hidden flex items-center gap-3 ">
          <button onClick={toggleMobileMenu} className="text-3xl z-50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full active:scale-95 transition-all cursor-pointer" aria-label="Abrir menú">
            <Icon icon={mobileMenuOpen ? 'material-symbols:cancel-outline-rounded' : 'material-symbols:menu-rounded'} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 pt-20 text-2xl text-center h-[100dvh]"
            >
              <Link to="/about" onClick={toggleMobileMenu} className="interactive-link group-hover:-translate-y-1">Sobre mí</Link>
              <Link to="/projects" onClick={toggleMobileMenu} className="interactive-link group-hover:-translate-y-1">Proyectos</Link>
              <a href="#contacto" onClick={toggleMobileMenu} className="interactive-link group-hover:-translate-y-1">Contacto</a>
              
              <div className="scale-[50%] border-2 border-text rounded-xl p-2">
              <Switch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <div className="hidden md:block z-50"><BulbToggle /></div>
    </>
  );
}
