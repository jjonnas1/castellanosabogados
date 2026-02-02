import React from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, CheckCircle2, MessageCircle, Sparkles, Target } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function GrammarPage() {
  const whatsappNumber = '16892960072';
  const whatsappMsg = encodeURIComponent(
    'Hola, quiero clases particulares de inglés o español. ¿Me das info de horarios, precios y niveles? 😊'
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const highlights = [
    {
      title: 'Clases de inglés y español',
      description:
        'Sesiones personalizadas para objetivos académicos, profesionales o de viaje con progresión real.'
    },
    {
      title: 'Metodología clara y comunicativa',
      description:
        'Explicaciones simples, práctica guiada y conversación activa desde el primer día.'
    },
    {
      title: 'Seguimiento y plan individual',
      description:
        'Diagnóstico inicial, metas por semana y retroalimentación concreta para avanzar sin dudas.'
    }
  ];

  const methods = [
    'Enfoque comunicativo + gramática funcional',
    'Corrección inmediata y explicación comparativa (EN/ES)',
    'Material visual, práctico y reutilizable',
    'Actividades dinámicas adaptadas a tu nivel'
  ];

  const outcomes = [
    'Mayor fluidez al hablar con confianza',
    'Comprensión de estructuras clave sin memorizar',
    'Pronunciación más clara y natural',
    'Preparación para entrevistas, exámenes o viajes'
  ];

  return (
    <>
      <Helmet>
        <title>Clases Particulares | Inglés y Español</title>
        <meta
          name="description"
          content="Clases particulares de inglés y español con metodología clara, práctica y comunicativa. Pagos por PayPal."
        />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-stone-200 bg-editorial-stone-50 p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
                  Clases Particulares de Inglés y Español
                </h1>
                <p className="text-stone-600 font-light text-lg leading-relaxed">
                  Sesiones 1:1 diseñadas para que avances con seguridad, estructura y resultados visibles.
                </p>
              </div>
              <div className="flex items-center gap-3 text-editorial-gold-600 text-sm uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4" />
                Cupos limitados
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="bg-white border border-stone-200 p-6 shadow-sm">
                  <h2 className="text-lg font-playfair font-bold text-primary mb-3">{item.title}</h2>
                  <p className="text-sm text-stone-600 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div className="bg-white border border-stone-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-playfair font-bold text-primary">Metodología</h2>
                </div>
                <ul className="space-y-4">
                  {methods.map((method) => (
                    <li key={method} className="flex items-start gap-3 text-stone-700 font-light">
                      <CheckCircle2 className="w-5 h-5 text-editorial-gold-600 mt-1 flex-shrink-0" />
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-stone-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-playfair font-bold text-primary">Lo que ganas</h2>
                </div>
                <ul className="space-y-4">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 text-stone-700 font-light">
                      <CheckCircle2 className="w-5 h-5 text-editorial-gold-600 mt-1 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-primary hover:bg-editorial-blue-800 text-white rounded-none px-8 py-6 uppercase tracking-widest font-bold"
                onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="mr-3" />
                Agenda por WhatsApp
              </Button>

              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6 uppercase tracking-widest font-bold"
                onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
              >
                Pedir info y precios
              </Button>
            </div>

            <div className="mt-8 text-sm text-stone-500">
              Pagos internacionales disponibles vía <b>PayPal</b>. Horarios flexibles y modalidad online.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
