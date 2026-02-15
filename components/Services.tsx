
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../lib/constants';
import { translations } from '../lib/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceIconCanvas } from './ThreeD/ServiceIcons';

interface ServicesProps {
  lang: 'ar' | 'en';
  onServiceSelect: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ lang, onServiceSelect }) => {
  const t = translations[lang];

  return (
    <section id="services" className="py-24 bg-white/50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{t.services.title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-semibold">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="glass p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 dark:bg-slate-900/40 shadow-sm flex flex-col items-center text-center group cursor-pointer h-full"
              onClick={() => onServiceSelect(service.id)}
            >
              <div className="w-full transition-transform group-hover:scale-110">
                <ServiceIconCanvas id={service.id} fallback={service.icon} />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{service.name[lang]}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 text-sm font-semibold leading-relaxed">
                {service.description[lang]}
              </p>
              
              <div className="mt-auto w-full flex items-center justify-between text-blue-600 dark:text-blue-400 font-black border-t border-slate-100 dark:border-slate-800 pt-6">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase opacity-50 mb-1">{t.services.startingFrom}</span>
                  <span className="text-lg">
                    {service.price[lang]} <span className="text-xs">{t.services.egp}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 group-hover:gap-2 transition-all bg-blue-50 dark:bg-blue-900/40 px-3 py-2 rounded-xl">
                  <span className="text-xs uppercase tracking-wider">{t.services.learnMore}</span>
                  {lang === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
