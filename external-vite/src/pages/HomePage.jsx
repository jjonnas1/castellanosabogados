import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Clock,
  TrendingUp,
  BookOpen,
  Sparkles,
  MessageCircle,
  Download,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQAccordion from '../components/FAQAccordion';
import WhatsAppBenefit from '../components/WhatsAppBenefit';

const HomePage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  // ✅ WhatsApp USA
  const whatsappNumber = '16892960072';
  const whatsappMsg = encodeURIComponent(
    'Hola, quiero información sobre sus materiales y/o clases particulares. 😊'
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Optimización de Tiempo',
      description: 'Recupera tus horas libres. Material pedagógico listo para impartir en minutos.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Progresión MCER',
      description: 'Estructura académica rigurosa A1–B1 para garantizar resultados tangibles.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Pedagogía Efectiva',
      description: 'Equilibrio perfecto entre enfoque comunicativo y claridad gramatical.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Edición Total',
      description: 'Flexibilidad absoluta. Adapta cada recurso a la realidad de tu aula.'
    }
  ];

  // ✅ Links reales (los que me diste)
  const featuredProducts = [
    {
      title: 'English Teaching Toolkit – A1 to A2',
      targetAudience: 'Profesores de Inglés',
      benefits: ['100+ Actividades Listas', 'Guías Didácticas Completas', 'Soluciones Incluidas'],
      link: 'https://go.hotmart.com/B101364901X?dp=1'
    },
    {
      title: 'Le Pack Complet – Anglais (FR)',
      targetAudience: 'Enseignants Francophones',
      benefits: ['Instructions en Français', 'Activités Communicatives', '100% Modifiable'],
      link: 'https://go.hotmart.com/J101687014J?dp=1'
    },
    {
      title: 'Pack Francés A1–A2 (MCER)',
      targetAudience: 'Profesores de Francés',
      benefits: ['Secuencias Didácticas', 'Gramática Visual', 'Material Cultural'],
      link: 'https://go.hotmart.com/C101601427N?dp=1'
    }
  ];

  const steps = [
    { number: '01', title: 'Selección', description: 'Identifica el pack que transformará tu dinámica de clase.' },
    { number: '02', title: 'Acceso', description: 'Proceso seguro vía Hotmart. Descarga inmediata.' },
    { number: '03', title: 'Impacto', description: 'Implementa hoy mismo y observa la diferencia en tus alumnos.' }
  ];

  const faqItems = [
    {
      question: '¿Es un curso de formación docente?',
      answer:
        'No. Son recursos pedagógicos profesionales (PDFs, editables) diseñados para ser utilizados directamente en tus clases.'
    },
    {
      question: '¿Cómo se realiza la entrega?',
      answer:
        'La entrega es digital e inmediata. Tras la compra segura en Hotmart, recibirás un enlace de descarga en tu correo electrónico.'
    },
    {
      question: '¿Puedo adaptar el material?',
      answer:
        'Totalmente. Incluimos archivos editables para que personalices el contenido según las necesidades específicas de tus estudiantes.'
    },
    {
      question: '¿Es compatible con clases online?',
      answer:
        'Sí. El diseño visual está optimizado tanto para proyección en pantalla compartida como para impresión de alta calidad.'
    }
  ];

  const handleLeadMagnet = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, revisa tu dirección de email.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: '¡Recurso enviado!',
      description: 'Revisa tu bandeja de entrada en breves momentos.'
    });
    setEmail('');
  };

  return (
    <>
      <Helmet>
        <title>Teaching Materials | Excelencia en Recursos Educativos</title>
        <meta
          name="description"
          content="Recursos pedagógicos de élite para profesores de idiomas exigentes. Eleva tu enseñanza con material estructurado, visual y efectivo."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-primary"></div>
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop"
            alt="Library background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-8 leading-tight tracking-tight">
              Enseña con <br />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-editorial-gold-400 to-editorial-gold-600">
                Excelencia.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 mb-4 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              Kits pedagógicos de alto nivel para docentes que valoran su tiempo y la calidad de su enseñanza.
            </p>
            <p className="text-base md:text-lg text-stone-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              También ofrecemos clases particulares privadas con excelente pedagogía, enfoque comunicativo y resultados
              visibles. Pagos internacionales disponibles vía PayPal.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-editorial-gold-600 hover:bg-editorial-gold-500 text-white px-10 py-7 text-lg rounded-none shadow-xl hover:shadow-2xl transition-all duration-300 tracking-widest uppercase font-bold"
                onClick={() =>
                  window.scrollTo({
                    top: document.getElementById('featured-products')?.offsetTop - 100,
                    behavior: 'smooth'
                  })
                }
              >
                Ver Colección
              </Button>

              {/* ✅ WhatsApp directo */}
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary px-10 py-7 text-lg rounded-none transition-all duration-300 tracking-widest uppercase font-medium"
                onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="mr-3 w-5 h-5" />
                Consulta Directa
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group text-left"
              >
                <div className="text-editorial-gold-600 mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-playfair font-bold text-primary mb-3">{benefit.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-24 bg-editorial-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-editorial-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">
              Catálogo Seleccionado
            </span>
            <h2 className="text-5xl font-playfair font-bold text-primary mb-6">Productos Destacados</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>

          {/* ✅ PASO 3: Link en lugar de <a href> */}
          <div className="mt-16 text-center">
            <Link
              to="/productos"
              className="inline-flex items-center text-primary font-bold tracking-widest uppercase hover:text-editorial-gold-600 transition-colors border-b-2 border-transparent hover:border-editorial-gold-600 pb-1"
            >
              Ver todos los productos <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Benefit */}
      <WhatsAppBenefit />

      {/* Lead Magnet */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-editorial-stone-50 border border-stone-200 p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-gold-100 rounded-full blur-[80px] -mr-16 -mt-16 opacity-50"></div>
            <div className="relative z-10">
              <Download className="w-12 h-12 text-primary mx-auto mb-8" />
              <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Prueba de Calidad</h2>
              <p className="text-xl text-stone-600 mb-10 font-light">
                Descarga una muestra gratuita (3 actividades + guía) y comprueba el estándar de nuestro material.
              </p>

              <form onSubmit={handleLeadMagnet} className="max-w-md mx-auto relative">
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico profesional"
                    className="w-full px-6 py-4 bg-white border border-stone-300 text-primary placeholder:text-stone-400 focus:outline-none focus:border-editorial-gold-600 transition-colors"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-editorial-blue-800 text-white px-8 py-4 text-lg rounded-none transition-all duration-300 uppercase tracking-widest font-bold"
                  >
                    Solicitar Muestra
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-editorial-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-playfair font-bold text-primary mb-6">Voces de la Comunidad</h2>
            <div className="w-24 h-1 bg-editorial-gold-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah M."
              role="Teacher - ESL"
              text="El nivel de detalle en las guías didácticas es impresionante. Me ha devuelto el placer de enseñar sin el estrés de la planificación."
            />
            <TestimonialCard
              name="Jean-Pierre"
              role="Professeur de FLE"
              text="Enfin des ressources modernes et pertinentes. Mes élèves sont plus engagés et la progression est évidente."
            />
            <TestimonialCard
              name="Laura G."
              role="Profesora de Español"
              text="Material estéticamente impecable y pedagógicamente sólido. Una inversión que se paga sola en la primera semana."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-playfair font-bold text-primary mb-4">Preguntas Frecuentes</h2>
          </motion.div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
