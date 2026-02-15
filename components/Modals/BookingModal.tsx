
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Phone, MessageCircle, AlertTriangle, Calendar } from 'lucide-react';
import { translations } from '../../lib/i18n';
import { SERVICES } from '../../lib/constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  prefilledServiceId?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, lang, prefilledServiceId }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    service: prefilledServiceId || '',
    dateTime: '',
    emergency: false,
    details: ''
  });

  // Reset step when modal closes/opens
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep('form'), 300);
    }
    if (isOpen && prefilledServiceId) {
      setFormData(prev => ({ ...prev, service: prefilledServiceId }));
    }
  }, [isOpen, prefilledServiceId]);

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call with loading delay
    setTimeout(() => {
      setStep('success');
    }, 800);
  };

  const handleWhatsApp = () => {
    const serviceName = SERVICES.find(s => s.id === formData.service)?.name[lang] || formData.service;
    const text = encodeURIComponent(
      lang === 'ar' 
        ? `السلام عليكم، حابب أحجز خدمة ${serviceName} من HomeServe Pro.\n\nالاسم: ${formData.name}\nالموبايل: ${formData.phone}\nالعنوان: ${formData.area}\nالموعد المفضل: ${formData.dateTime}\nحالة طوارئ؟: ${formData.emergency ? 'نعم' : 'لا'}\nملاحظات إضافية: ${formData.details || 'لا يوجد'}`
        : `Hello, I'd like to book ${serviceName} service from HomeServe Pro.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.area}\nPreferred Time: ${formData.dateTime}\nEmergency?: ${formData.emergency ? 'Yes' : 'No'}\nNotes: ${formData.details || 'None'}`
    );
    window.open(`https://wa.me/201033776986?text=${text}`, '_blank');
  };

  const toggleEmergency = () => {
    setFormData(prev => ({ ...prev, emergency: !prev.emergency }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10">
              <X size={24} />
            </button>

            {step === 'form' ? (
              <>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  {lang === 'ar' ? 'احجز فني دلوقتي' : 'Book a Pro Now'}
                </h2>
                <p className="text-slate-500 mb-8 font-semibold">
                  {lang === 'ar' ? 'باقي خطوة واحدة لراحة بالك' : 'One step away from peace of mind'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">{t.contact.form.name}</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">{t.contact.form.phone}</label>
                      <input
                        required
                        type="tel"
                        dir="ltr"
                        placeholder="01xxxxxxxxx"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">{t.contact.form.service}</label>
                      <select
                        required
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">{lang === 'ar' ? 'اختر الخدمة' : 'Select Service'}</option>
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.name[lang]}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-black text-slate-700 mb-2">{t.contact.form.area}</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={formData.area}
                        onChange={e => setFormData({ ...formData, area: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">{lang === 'ar' ? 'الموعد المفضل' : 'Preferred Date & Time'}</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <input
                        required
                        type="text"
                        placeholder={lang === 'ar' ? 'مثلاً: غداً الساعة ١٠ صباحاً' : 'e.g., Tomorrow at 10 AM'}
                        className={`w-full bg-slate-50 border border-slate-200 px-4 ${lang === 'ar' ? 'pr-12' : 'pl-12'} py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                        value={formData.dateTime}
                        onChange={e => setFormData({ ...formData, dateTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">{t.contact.form.details}</label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                      placeholder={lang === 'ar' ? 'أي ملاحظات إضافية للفني...' : 'Any additional notes for the pro...'}
                      value={formData.details}
                      onChange={e => setFormData({ ...formData, details: e.target.value })}
                    />
                  </div>

                  {/* Emergency Toggle Switch Section */}
                  <div 
                    onClick={toggleEmergency}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all border cursor-pointer ${
                      formData.emergency 
                      ? 'bg-orange-50 border-orange-200 shadow-sm' 
                      : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${formData.emergency ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-400'}`}>
                        <AlertTriangle size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-black text-sm select-none transition-colors ${formData.emergency ? 'text-orange-900' : 'text-slate-600'}`}>
                          {t.contact.form.isEmergency}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {lang === 'ar' ? 'حالة عاجلة (خلال ٣٠ دقيقة)' : 'Urgent Case (Within 30m)'}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        formData.emergency ? 'bg-orange-600' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={formData.emergency}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.emergency 
                          ? (lang === 'ar' ? '-translate-x-5' : 'translate-x-5') 
                          : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 transform active:scale-95"
                  >
                    {t.nav.bookNow}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100"
                >
                  <CheckCircle size={48} />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">
                  {lang === 'ar' ? 'تم تأكيد الحجز!' : 'Booking Confirmed!'}
                </h2>
                <p className="text-slate-600 mb-10 font-semibold leading-relaxed">
                  {lang === 'ar' 
                    ? 'طلبك وصل لأقرب فني ليك. هنتصل بيك خلال دقائق لتأكيد الميعاد النهائي.' 
                    : 'Your request reached the nearest pro. We will call you within minutes to confirm.'}
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg"
                  >
                    <MessageCircle size={24} />
                    {lang === 'ar' ? 'أرسل تفاصيل الحجز واتساب' : 'Send Details via WhatsApp'}
                  </button>
                  <a
                    href="tel:+201033776986"
                    className="w-full bg-slate-100 text-slate-900 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
                  >
                    <Phone size={24} />
                    {lang === 'ar' ? 'اتصل الآن للمتابعة' : 'Call Now for Follow-up'}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
