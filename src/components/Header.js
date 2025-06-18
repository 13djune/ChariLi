import BulbToggle from './BulbToggle';
import Menu from './Menu';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 text-text bg-none">
      <div className="text-xl font-bold tracking-tight">
        <Link to="/">ChariLi</Link>
      </div>

      <nav className="hidden sm:flex gap-6 text-sm font-medium items-center">
      <Link to="/about" className="primarybutton z-50">Sobre mí</Link>
        <Menu />
        <Link to="/contact" className="primarybutton z-50">Contacto</Link>
      </nav>

      <div>
        <BulbToggle />
      </div>
    </header>
  );
}
