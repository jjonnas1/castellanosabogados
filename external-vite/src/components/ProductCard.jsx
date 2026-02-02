import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const ProductCard = ({ product, index }) => {
  const href = product?.link && product.link !== '#' ? product.link : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-none shadow-lg border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full group"
    >
      <div className="p-8 flex flex-col h-full relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-editorial-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        
        <h3 className="text-2xl font-playfair font-bold text-primary mb-3 leading-tight group-hover:text-editorial-gold-600 transition-colors duration-300">
          {product.title}
        </h3>
        
        {product.targetAudience && (
          <p className="text-xs font-bold text-editorial-gold-600 mb-6 uppercase tracking-widest border-b border-stone-100 pb-4">
            {product.targetAudience}
          </p>
        )}

        {product.description && (
          <p className="text-stone-600 mb-6 leading-relaxed text-sm font-light">
            {product.description}
          </p>
        )}

        {product.benefits && (
          <ul className="space-y-4 mb-10 flex-grow">
            {product.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start text-sm text-stone-600 font-light">
                <div className="mr-3 mt-1 w-4 h-4 rounded-full border border-editorial-gold-600 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-editorial-gold-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* BOTÓN CON LINK REAL */}
        {href ? (
          <Button
            asChild
            className="w-full bg-primary hover:bg-editorial-blue-800 text-white rounded-none py-6 transition-all duration-300 tracking-wider text-sm font-medium shadow-md group-hover:shadow-lg mt-auto"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              Ver en Hotmart
              <ExternalLink className="ml-2" size={16} />
            </a>
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-stone-400 text-white rounded-none py-6 tracking-wider text-sm font-medium shadow-md mt-auto cursor-not-allowed"
          >
            Ver en Hotmart
            <ExternalLink className="ml-2" size={16} />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
