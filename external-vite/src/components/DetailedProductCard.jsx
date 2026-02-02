import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const DetailedProductCard = ({ product, index }) => {
  const href = product?.link && product.link !== '#' ? product.link : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white rounded-sm shadow-xl border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Header oscuro: texto BLANCO para contraste */}
      <div className="bg-gradient-to-r from-primary to-editorial-blue-800 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

        <h3 className="text-2xl font-playfair font-bold mb-3 tracking-wide relative z-10 text-white">
          {product.title}
        </h3>

        <p className="text-editorial-gold-400 text-xs uppercase tracking-widest font-bold relative z-10">
          {product.targetAudience}
        </p>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-6 border-b border-stone-100 pb-2 inline-block">
            Qué incluye
          </p>

          <ul className="space-y-4">
            {product.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-4 group/item">
                <CheckCircle2 className="w-5 h-5 text-editorial-gold-600 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                <span className="text-stone-700 text-sm leading-relaxed font-light group-hover/item:text-primary transition-colors duration-300">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* BOTÓN CON LINK REAL */}
        {href ? (
          <Button
            asChild
            className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-none py-6 transition-all duration-300 tracking-wider text-sm font-bold uppercase shadow-sm"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              Ver en Hotmart
              <ExternalLink className="ml-2" size={16} />
            </a>
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-stone-200 border border-stone-300 text-stone-500 rounded-none py-6 tracking-wider text-sm font-bold uppercase shadow-sm cursor-not-allowed"
          >
            Ver en Hotmart
            <ExternalLink className="ml-2" size={16} />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default DetailedProductCard;
