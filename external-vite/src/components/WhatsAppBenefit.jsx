import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Gift, Users, Star } from 'lucide-react';

const WhatsAppBenefit = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: 'Grupo Privado VIP',
      description: 'Acceso directo a una comunidad selecta de docentes.'
    },
    {
      icon: <Gift className="w-8 h-8 text-white" />,
      title: 'Material Extra Semanal',
      description: 'Recursos exclusivos gratuitos directamente a tu móvil.'
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: 'Networking Real',
      description: 'Conexiones profesionales que impulsan tu carrera.'
    }
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-editorial-gold-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <motion.div 
                className="lg:w-1/2 text-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-editorial-gold-600/20 border border-editorial-gold-600/30 rounded-full mb-8">
                    <Star className="w-4 h-4 text-editorial-gold-500 fill-editorial-gold-500" />
                    <span className="text-editorial-gold-400 text-xs font-bold uppercase tracking-widest">Bonus Exclusivo</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
                    Más que un producto,<br />una comunidad.
                </h2>
                <p className="text-xl text-stone-300 leading-relaxed font-light mb-8">
                    Al adquirir cualquiera de nuestros packs, obtienes acceso automático a nuestro círculo interno en WhatsApp. No estarás solo en tu camino docente.
                </p>
            </motion.div>

            {/* Cards */}
            <div className="lg:w-1/2 grid gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-editorial-gold-600/50 rounded-lg transition-all duration-300 backdrop-blur-sm group"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-editorial-gold-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1 font-playfair">{feature.title}</h3>
                            <p className="text-stone-400 font-light text-sm">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppBenefit;
