import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Clock,
  FileText,
  Users,
  Zap,
  MessageCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';

const TeachersPage = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Eficiencia',
      description: 'Material listo para usar, recupera horas de tu vida personal.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Estructura',
      description: 'Secuencias lógicas con objetivos claros.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Comunicación',
      description: 'Fomenta la interacción real desde la primera clase.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Versatilidad',
      description: 'Funciona impecablemente online y offline.'
    }
  ];

  const paths = [
    {
      title: 'Inglés',
      description: 'Pack integral A1–A2. La solución definitiva para docentes de ESL.',
      cta: 'Ver Pack Inglés'
    },
    {
      title: 'Francés',
      description: 'Recursos FLE modernos con enfoque comunicativo riguroso.',
      cta: 'Ver Pack Francés'
    },
    {
      title: 'Español',
      description: 'ELE dinámico y cultural. Material bilingüe de alto impacto.',
      cta: 'Ver Pack Español'
    }
  ];

  // ✅ WhatsApp USA
  const whatsappNumber = '16892960072';
  const whatsappMsg = encodeURIComponent(
    'Hola, soy docente y quiero orientación para elegir el pack ideal. 😊'
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  // ✅ Hotmart Gramática (Vol. 1 & 2)
  const grammarHotmart = 'https://go.hotmart.com/B101403026Y?dp=1';

  return (
    <>
      <Helmet>
        <title>Para Profesores | Teaching Materials</title>
        <meta name="description" content="Soluciones profesionales para la docencia de idiomas." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-editorial-gold-500 font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
              Soluciones Profesionales
            </span>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-8 leading-tight">
              Enseña Más.<br />Prepara Menos.
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
              La herramienta secreta de los profesores que valoran su tiempo y resultados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 border border-stone-100 bg-editorial-stone-50 hover:border-editorial-gold-600/50 transition-colors duration-300"
              >
                <div className="text-primary mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold font-playfair text-primary mb-3">{benefit.title}</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Paths */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-playfair font-bold mb-4">Tu Especialidad</h2>
            <div className="w-16 h-0.5 bg-editorial-gold-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {paths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-editorial-blue-800 p-10 hover:bg-editorial-blue-700 transition-colors duration-300 border border-white/5 group"
              >
                <h3 className="text-3xl font-playfair font-bold mb-4">{path.title}</h3>
                <p className="text-stone-300 mb-8 font-light leading-relaxed">{path.description}</p>
                <div className="flex items-center text-editorial-gold-500 font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors cursor-pointer">
                  {path.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Gramática dentro de Para Profesores */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-editorial-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">
              Gramática para Docentes
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Referencia Profesional (Vol. 1 & 2)
            </h2>
            <p className="text-stone-600 font-light text-lg max-w-3xl mx-auto">
              Una guía clara, lógica y comparativa (EN/ES) para resolver dudas reales de aula y enseñar con seguridad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <div className="border border-stone-200 bg-editorial-stone-50 p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-playfair font-bold text-primary">Qué obtienes</h3>
              </div>

              <ul className="space-y-4">
                {[
                  'Explicación comparativa (EN/ES)',
                  'Estructura lógica progresiva',
                  'Lenguaje técnico preciso',
                  'Cobertura desde básico a avanzado'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-700 font-light">
                    <CheckCircle2 className="w-5 h-5 text-editorial-gold-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 bg-white p-10 shadow-sm">
              <h3 className="text-2xl font-playfair font-bold text-primary mb-4">Ideal para</h3>
              <p className="text-stone-600 font-light leading-relaxed mb-8">
                Docentes que quieren explicar con precisión, ahorrar tiempo en preparación y tener una referencia elegante para planear clases.
              </p>

              <div className="flex flex-col gap-4">
                <Button
                  className="bg-primary hover:bg-editorial-blue-800 text-white px-10 py-6 rounded-none uppercase tracking-widest font-bold"
                  onClick={() => window.open(grammarHotmart, '_blank', 'noopener,noreferrer')}
                >
                  Ver en Hotmart
                </Button>

                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 rounded-none uppercase tracking-widest font-bold"
                  onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
                >
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-8">¿Dudas? Hablemos.</h2>
          <p className="text-xl text-stone-600 font-light mb-10">
            Contacta directamente por WhatsApp para una asesoría personalizada.
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-editorial-blue-800 text-white px-10 py-6 text-lg rounded-none shadow-xl tracking-widest uppercase font-bold"
            onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
          >
            <MessageCircle className="mr-3" />
            WhatsApp Directo
          </Button>
        </div>
      </section>
    </>
  );
};

export default TeachersPage;
