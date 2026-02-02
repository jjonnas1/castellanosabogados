import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white p-10 shadow-lg border-l-4 border-editorial-gold-600 hover:shadow-xl transition-all duration-300 relative"
    >
      <div className="absolute top-6 right-8 opacity-10">
        <Quote size={64} className="text-primary" />
      </div>
      <div className="relative z-10">
        <div className="mb-6 text-editorial-gold-600">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
            ))}
        </div>
        <p className="text-stone-600 italic mb-8 leading-relaxed font-light text-lg">"{text}"</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-playfair font-bold text-primary text-xl">
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-primary tracking-wide font-playfair">{name}</p>
                <p className="text-xs text-stone-500 uppercase tracking-widest">{role}</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
