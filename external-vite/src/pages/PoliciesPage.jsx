import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, FileText, Cookie } from 'lucide-react';

const PoliciesPage = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = [
    { id: 'privacy', name: 'Privacidad', icon: <Shield className="w-4 h-4" /> },
    { id: 'terms', name: 'Términos', icon: <FileText className="w-4 h-4" /> },
    { id: 'cookies', name: 'Cookies', icon: <Cookie className="w-4 h-4" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Legal | Teaching Materials</title>
      </Helmet>

      <div className="pt-32 pb-24 bg-editorial-stone-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl font-playfair font-bold text-primary mb-4">Información Legal</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <div className="bg-white p-4 border border-stone-200">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-widest font-bold transition-colors ${
                                activeSection === section.id ? 'bg-primary text-white' : 'text-stone-500 hover:text-primary'
                            }`}
                        >
                            {section.icon}
                            {section.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="md:col-span-3">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-10 border border-stone-200 shadow-sm"
                >
                    <div className="prose prose-stone max-w-none">
                        <h2 className="font-playfair font-bold text-2xl mb-6 capitalize">{activeSection === 'privacy' ? 'Política de Privacidad' : activeSection === 'terms' ? 'Términos de Servicio' : 'Política de Cookies'}</h2>
                        <p className="text-stone-600 font-light leading-relaxed">
                            {/* Placeholder text for brevity in this specific update, maintaining structure */}
                            En Teaching Materials, nos tomamos muy en serio la transparencia y la seguridad de sus datos. Esta sección detalla nuestros protocolos estándar de operación y cumplimiento legal.
                        </p>
                        <p className="text-stone-600 font-light leading-relaxed mt-4">
                            Para información detallada específica, por favor contacte a nuestro equipo legal o revise la documentación completa proporcionada en el momento de la compra a través de Hotmart.
                        </p>
                    </div>
                </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoliciesPage;
