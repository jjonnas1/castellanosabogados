import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Mí | ProfeKitCastellanos</title>
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-playfair font-bold text-primary mb-6">El Autor</h1>
            <p className="text-xl text-stone-500 font-light italic">Pasión por la pedagogía.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="w-full md:w-1/3">
                <div className="aspect-square bg-stone-200 relative overflow-hidden">
                     {/* Placeholder for image */}
                     <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-500 font-playfair text-6xl">PKC</div>
                </div>
            </div>
            <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-playfair font-bold text-primary mb-6">Filosofía</h2>
                <div className="space-y-6 text-stone-600 text-lg font-light leading-relaxed">
                    <p>
                        Soy abogado y licenciado en Lenguas Modernas, y combino ambas cosas en lo que más me gusta: crear materiales pedagógicos bien estructurados, fáciles de usar y pensados para resultados reales en el aula.
                    </p>
                    <p>
                        Mi trabajo se basa en algo simple: ayudarte a enseñar mejor sin pasar horas preparando. Por eso mis packs están diseñados para que puedas abrir, proyectar o imprimir y empezar a dar clase con seguridad: explicaciones claras, ejemplos útiles, actividades comunicativas y una progresión paso a paso.
                    </p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             {[
                 { icon: <GraduationCap />, text: "Experiencia Docente" },
                 { icon: <Award />, text: "Certificación Internacional" },
                 { icon: <Globe />, text: "Metodología MCER" }
             ].map((item, i) => (
                 <div key={i} className="p-8 bg-editorial-stone-50 border border-stone-100">
                     <div className="text-editorial-gold-600 w-8 h-8 mx-auto mb-4">{item.icon}</div>
                     <p className="font-playfair font-bold text-primary">{item.text}</p>
                 </div>
             ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
