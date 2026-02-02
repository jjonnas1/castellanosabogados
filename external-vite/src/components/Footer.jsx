import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-stone-300 pt-20 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-2xl font-playfair font-bold text-white mb-6 tracking-wide">Teaching Materials</p>
            <p className="text-base text-stone-400 leading-relaxed max-w-sm font-light">
              Elevando la calidad de la enseñanza de idiomas con recursos profesionales, estéticos y pedagógicamente sólidos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-6">Explorar</p>
            <div className="space-y-4 flex flex-col">
              <Link to="/productos" className="text-sm hover:text-editorial-gold-500 transition-colors duration-300 w-fit">Productos</Link>
              <Link to="/para-profesores" className="text-sm hover:text-editorial-gold-500 transition-colors duration-300 w-fit">Para Profesores</Link>
              <Link to="/sobre-mi" className="text-sm hover:text-editorial-gold-500 transition-colors duration-300 w-fit">Sobre Mí</Link>
              <Link to="/contacto" className="text-sm hover:text-editorial-gold-500 transition-colors duration-300 w-fit">Contacto</Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white mb-6">Conectar</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center hover:bg-editorial-gold-600 hover:border-editorial-gold-600 hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center hover:bg-editorial-gold-600 hover:border-editorial-gold-600 hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center hover:bg-editorial-gold-600 hover:border-editorial-gold-600 hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center hover:bg-editorial-gold-600 hover:border-editorial-gold-600 hover:text-white transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500 tracking-wide">
            © {new Date().getFullYear()} Teaching Materials. Reservados todos los derechos.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/politicas" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">Política de Privacidad</Link>
            <Link to="/faq" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
