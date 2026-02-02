import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FAQAccordion from '../components/FAQAccordion';

const FAQPage = () => {
  const faqItems = [
    {
      question: '¿Formato de los materiales?',
      answer: 'PDF de alta resolución y archivos editables (Word/PPT) compatibles con cualquier sistema.'
    },
    {
      question: '¿Licencia de uso?',
      answer: 'Licencia individual y perpetua. Puedes usarlo con todos tus estudiantes presentes y futuros.'
    },
    {
      question: '¿Garantía?',
      answer: 'Garantía incondicional de 7 días gestionada por Hotmart.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ | Teaching Materials</title>
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
           >
                <h1 className="text-5xl font-playfair font-bold text-primary mb-6">Preguntas Frecuentes</h1>
                <p className="text-stone-600 font-light">Respuestas claras para decisiones informadas.</p>
           </motion.div>

           <FAQAccordion items={faqItems} />
        </div>
      </div>
    </>
  );
};

export default FAQPage;
