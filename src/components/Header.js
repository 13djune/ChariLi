import { useEffect, useState } from 'react';
import BulbToggle from './BulbToggle';
import Menu from './Menu';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // Scroll down
      } else {
        setShowHeader(true); // Scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 text-text bg-none transition-transform duration-300 
${ showHeader ? 'translate-y-0' : '-translate-y-[150%]' }
        `}
    >
      <div className="text-xl font-bold tracking-tight font-heading">
        <Link to="/">ChariLi</Link>
      </div>

      <nav className="hidden sm:flex gap-6 text-sm font-medium items-center">
        <Link to="/about" className="primarybutton font-heading z-50">Sobre mí</Link>
        <Menu />
        <Link to="/contact" className="primarybutton font-heading z-50">Contacto</Link>
      </nav>

      <div>
        <BulbToggle />
      </div>
    </header>
  );
}
