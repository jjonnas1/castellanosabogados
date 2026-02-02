import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index}
          className="bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-6 text-left group transition-colors duration-200"
          >
            <span className={`text-lg font-playfair font-medium pr-8 transition-colors duration-300 ${openIndex === index ? 'text-editorial-gold-600' : 'text-primary'}`}>
              {item.question}
            </span>
            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${openIndex === index ? 'border-editorial-gold-600 bg-editorial-gold-50' : 'border-stone-300 group-hover:border-primary'}`}>
               {openIndex === index ? 
                 <Minus className="w-4 h-4 text-editorial-gold-600" /> : 
                 <Plus className="w-4 h-4 text-stone-400 group-hover:text-primary" />
               }
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-8 pt-0 text-stone-600 leading-relaxed font-light pl-6 border-l-2 border-editorial-gold-600 ml-6 mb-6">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
