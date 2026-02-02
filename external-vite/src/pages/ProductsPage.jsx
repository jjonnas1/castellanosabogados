import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import DetailedProductCard from '../components/DetailedProductCard';

const ProductsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const products = [
    {
      id: 1,
      title: 'Complete English Teaching Toolkit – A1 to A2',
      targetAudience: 'Profesores de Inglés',
      language: 'ingles',
      benefits: [
        '100+ Actividades Listas',
        'Progresión MCER A1-A2',
        'Guías y Soluciones'
      ],
      link: 'https://go.hotmart.com/B101364901X?dp=1'
    },
    {
      id: 2,
      title: 'Le Pack Complet – Anglais pour Professeurs',
      targetAudience: 'Enseignants Francophones',
      language: 'frances',
      benefits: [
        'Matériel en Français',
        'Approche Communicative',
        '100% Modifiable'
      ],
      link: 'https://go.hotmart.com/J101687014J?dp=1'
    },
    {
      id: 3,
      title: 'Pack Francés A1–A2 (MCER)',
      targetAudience: 'Profesores de Francés',
      language: 'frances',
      benefits: [
        'Secuencias Completas',
        'Gramática Clara',
        'Adaptable'
      ],
      link: 'https://go.hotmart.com/C101601427N?dp=1'
    },
    {
      id: 4,
      title: 'Teach Spanish Easy – Docentes',
      targetAudience: 'Profesores de Español',
      language: 'espanol',
      benefits: [
        'Material Bilingüe',
        'Actividades Culturales',
        'Planes de Clase'
      ],
      link: 'https://go.hotmart.com/I101326739A?dp=1'
    },
    {
      id: 5,
      title: 'Gramática del Inglés – Vol. 1 & 2',
      targetAudience: 'Referencia Teórica',
      language: 'ingles',
      benefits: [
        'Explicación Lógica',
        'Comparativa Español',
        'Nivel Profesional'
      ],
      link: 'https://go.hotmart.com/B101403026Y?dp=1'
    }
  ];

  const filteredProducts = selectedLanguage === 'all'
    ? products
    : products.filter(p => p.language === selectedLanguage);

  return (
    <>
      <Helmet>
        <title>Colección | Teaching Materials</title>
        <meta name="description" content="Catálogo exclusivo de recursos pedagógicos para la enseñanza de idiomas." />
      </Helmet>

      <div className="bg-editorial-stone-50 min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-6">
              Nuestra Colección
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              Herramientas diseñadas con precisión académica y estética profesional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-3 text-stone-500 uppercase tracking-widest text-xs font-bold">
              <Filter className="w-4 h-4" />
              <span>Filtrar por Especialidad</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {['all', 'ingles', 'frances', 'espanol'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 border border-stone-300 hover:border-editorial-gold-600 ${
                    selectedLanguage === lang
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-stone-600 hover:text-editorial-gold-600'
                  }`}
                >
                  {lang === 'all' ? 'Todos' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product, index) => (
              <DetailedProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
