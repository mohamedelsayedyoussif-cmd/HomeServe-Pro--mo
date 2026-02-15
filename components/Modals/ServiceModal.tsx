
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Wallet, CheckCircle2 } from 'lucide-react';
import { Service } from '../../types';
import { translations } from '../../lib/i18n';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  lang: 'ar' | 'en';
  onBookNow: (serviceId: string) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service, lang, onBookNow }) => {
  if (!service) return null;
  const t = translations[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              <div className="bg-blue-600 p-12 text-white flex flex-col items-center justify-center text-center">
                <span className="text-8xl mb-6">{service.icon}</span>
                <h2 className="text-4xl font-black mb-4">{service.name[lang]}</h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-bold backdrop-blur-md">
                  <Clock size={16} />
                  {service.eta[lang]}
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col">
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {service.description[lang]}
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="font-black text-slate-900 text-xl mb-4">
                    {lang === 'ar' ? 'مشاكل شائعة:' : 'Common Issues:'}
                  </h3>
                  {service.commonIssues[lang].map((issue, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                      <CheckCircle2 className="text-blue-600" size={20} />
                      {issue}
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500 font-bold">{t.services.startingFrom}</span>
                    <span className="text-2xl font-black text-blue-600">
                      {service.price[lang]} {t.services.egp}
                    </span>
                  </div>
                  <Wallet className="text-slate-300" size={32} />
                </div>

                <button
                  onClick={() => onBookNow(service.id)}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  {t.services.bookThis}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
