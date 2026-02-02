import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: 'Mensaje Enviado', description: 'Gracias por contactar.' });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Teaching Materials</title>
      </Helmet>

      <div className="pt-32 pb-24 bg-editorial-stone-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-5xl font-playfair font-bold text-primary mb-6">Contacto</h1>
                <p className="text-stone-600 font-light text-lg">Estoy aquí para ayudarte a elegir la mejor herramienta.</p>
            </motion.div>

            <div className="bg-white p-12 shadow-xl border border-stone-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nombre</label>
                            <input 
                                className="w-full border-b border-stone-300 py-3 text-primary focus:border-editorial-gold-600 focus:outline-none transition-colors bg-transparent"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email</label>
                            <input 
                                type="email"
                                className="w-full border-b border-stone-300 py-3 text-primary focus:border-editorial-gold-600 focus:outline-none transition-colors bg-transparent"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Mensaje</label>
                        <textarea 
                            rows="4"
                            className="w-full border-b border-stone-300 py-3 text-primary focus:border-editorial-gold-600 focus:outline-none transition-colors bg-transparent resize-none"
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            required
                        />
                    </div>
                    <Button type="submit" className="bg-primary hover:bg-stone-800 text-white px-10 py-4 rounded-none uppercase tracking-widest text-sm font-bold w-full md:w-auto">
                        Enviar Mensaje
                    </Button>
                </form>

                <div className="mt-16 pt-10 border-t border-stone-100 grid md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-editorial-stone-50 flex items-center justify-center text-primary">
                            <Mail />
                        </div>
                        <div>
                            <p className="font-bold text-primary font-playfair">Email</p>
                            <p className="text-stone-500 text-sm">contacto@teachingmaterials.com</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-editorial-stone-50 flex items-center justify-center text-primary">
                            <MessageCircle />
                        </div>
                        <div>
                            <p className="font-bold text-primary font-playfair">WhatsApp</p>
                            <p className="text-stone-500 text-sm">Respuesta rápida</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
