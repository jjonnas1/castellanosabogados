import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Para Profesores', path: '/para-profesores' },
    { name: 'Clases Particulares', path: '/gramatica-ingles' },
    { name: 'Sobre mí', path: '/sobre-mi' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-editorial-stone-50/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div
              className={`w-10 h-10 rounded-none transform rotate-45 flex items-center justify-center transition-colors duration-300 ${
                scrolled ? 'bg-primary' : 'bg-white'
              }`}
            >
              <span
                className={`transform -rotate-45 font-playfair font-bold text-xl ${
                  scrolled ? 'text-white' : 'text-primary'
                }`}
              >
                PKC
              </span>
            </div>
            <span
              className={`text-xl font-playfair font-bold tracking-wider transition-colors duration-300 ${
                scrolled ? 'text-primary' : 'text-white drop-shadow-md'
              }`}
            >
              ProfeKitCastellanos
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium uppercase tracking-widest transition-all duration-300 py-2 border-b-2 ${
                    active
                      ? 'text-editorial-gold-600 border-editorial-gold-600'
                      : scrolled
                        ? 'text-primary border-transparent hover:text-editorial-gold-600 hover:border-editorial-gold-600'
                        : 'text-white/90 border-transparent hover:text-white hover:border-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-editorial-stone-50 border border-stone-200 shadow-xl">
            <div className="py-4 px-2 flex flex-col">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-base font-medium border-l-4 ${
                      active
                        ? 'border-editorial-gold-600 text-primary bg-stone-100'
                        : 'border-transparent text-stone-600 hover:bg-stone-50 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
