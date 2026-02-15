
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, lang }) => {
  const qrCodes = [
    { 
      label: lang === 'ar' ? 'لينكد إن' : 'LinkedIn', 
      url: 'https://sa.linkedin.com/in/mohamed-elsayed-yousef-4a2ba81ab',
      icon: '🔗'
    },
    { 
      label: lang === 'ar' ? 'فيسبوك' : 'Facebook', 
      url: 'https://web.facebook.com/mhmdalsydyusf/?_rdc=1&_rdr#',
      icon: '👥'
    },
    { 
      label: lang === 'ar' ? 'الخريطة' : 'Maps', 
      url: 'https://share.google/Bm7iXxzVZdleKU7TU',
      icon: '📍'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                {lang === 'ar' ? 'امسح الكود ووصّلنا' : 'Scan to Reach Us'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {qrCodes.map((qr, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-white rounded-2xl shadow-inner border border-slate-100">
                    <QRCode value={qr.url} size={90} />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{qr.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-10 text-center text-slate-500 font-bold text-sm">
              {lang === 'ar' ? 'وصول سريع لكل منصاتنا بضغطة كاميرا' : 'Instant access to all our platforms via camera'}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QRCodeModal;
