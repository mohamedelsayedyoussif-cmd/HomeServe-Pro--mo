
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../lib/i18n';
import { SERVICES } from '../lib/constants';
import { Phone, MessageCircle, Mail, ExternalLink, Linkedin, Facebook, MapPin } from 'lucide-react';
import QRCode from 'react-qr-code';
import MapEmbed from './MapEmbed';

interface ContactProps {
  lang: 'ar' | 'en';
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: SERVICES[0].name[lang],
    area: '',
    details: '',
    isEmergency: false,
    time: 'أي وقت / Anytime'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Pre-filled Message Templates
  const phoneNumber = "+201033776986";
  const emailAddress = "el3arif.m@gmail.com";
  
  const getWhatsAppUrl = () => {
    const message = lang === 'ar' 
      ? `السلام عليكم، عايز احجز خدمة من HomeServe Pro. ممكن تفاصيل الحجز؟`
      : `Hello, I would like to book a service from HomeServe Pro. Could you provide more details?`;
    return `https://wa.me/201033776986?text=${encodeURIComponent(message)}`;
  };

  const getEmailUrl = () => {
    const subject = lang === 'ar' ? "طلب خدمة - HomeServe Pro" : "Service Request - HomeServe Pro";
    const body = lang === 'ar' 
      ? `مرحبًا،\n\nعايز أطلب خدمة من HomeServe Pro.\n\nشكرًا`
      : `Hello,\n\nI would like to request a service from HomeServe Pro.\n\nThank you`;
    return `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const qrCodes = [
    { 
      label: lang === 'ar' ? 'لينكد إن' : 'LinkedIn', 
      url: 'https://sa.linkedin.com/in/mohamed-elsayed-yousef-4a2ba81ab',
      color: '#0a66c2'
    },
    { 
      label: lang === 'ar' ? 'فيسبوك' : 'Facebook', 
      url: 'https://web.facebook.com/mhmdalsydyusf/?_rdc=1&_rdr#',
      color: '#1877f2'
    },
    { 
      label: lang === 'ar' ? 'الخريطة' : 'Maps', 
      url: 'https://share.google/Bm7iXxzVZdleKU7TU',
      color: '#ea4335'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://sa.linkedin.com/in/mohamed-elsayed-yousef-4a2ba81ab', icon: <Linkedin size={24} />, color: 'hover:text-[#0a66c2]' },
    { name: 'Facebook', url: 'https://web.facebook.com/mhmdalsydyusf/?_rdc=1&_rdr#', icon: <Facebook size={24} />, color: 'hover:text-[#1877f2]' }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{t.contact.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 font-semibold">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quick Info & QR Codes */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-white dark:border-slate-800 dark:bg-slate-800/40 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">{lang === 'ar' ? 'بيانات الاتصال' : 'Contact Info'}</h3>
              <div className="space-y-6">
                <motion.a 
                  whileHover={{ scale: 1.03 }}
                  href={`tel:${phoneNumber}`} 
                  className="flex items-center gap-4 group"
                  aria-label="Call HomeServe Pro directly"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold">{lang === 'ar' ? 'اتصل بنا' : 'Call Us'}</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white" dir="ltr">{phoneNumber}</p>
                  </div>
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.03 }}
                  href={getWhatsAppUrl()} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shadow-md">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold">{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white" dir="ltr">{phoneNumber}</p>
                  </div>
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.03 }}
                  href={getEmailUrl()} 
                  className="flex items-center gap-4 group"
                  aria-label="Send us an email"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-md">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                    <p className="text-lg font-black text-slate-900 dark:text-white">{emailAddress}</p>
                  </div>
                </motion.a>
              </div>

              {/* Social Icons with Animation */}
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -4 }}
                    className={`text-slate-400 transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* QR Code Grid */}
            <div className="glass p-8 rounded-3xl border border-white dark:border-slate-800 dark:bg-slate-800/40 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">{t.contact.qrTitle}</h3>
              <div className="grid grid-cols-3 gap-3">
                {qrCodes.map((qr, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 transition-transform"
                    >
                      <QRCode 
                        value={qr.url} 
                        size={64} 
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }} 
                      />
                    </motion.div>
                    <span className="text-[9px] font-black text-slate-500 uppercase text-center">{qr.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <div className="lg:col-span-2 glass p-8 md:p-12 rounded-3xl border border-white dark:border-slate-800 dark:bg-slate-800/40 shadow-xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t.contact.form.success}</h3>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-blue-600 dark:text-blue-400 font-bold underline decoration-2 underline-offset-4"
                >
                  {lang === 'ar' ? 'إرسال طلب آخر' : 'Send another request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">{t.contact.form.name}</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm dark:text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">{t.contact.form.phone}</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm dark:text-white" 
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">{t.contact.form.service}</label>
                    <select 
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm dark:text-white"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      {SERVICES.map(s => <option key={s.id}>{s.name[lang]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">{t.contact.form.area}</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm dark:text-white" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">{t.contact.form.details}</label>
                  <textarea 
                    rows={4} 
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm resize-none dark:text-white"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 transform active:scale-95"
                >
                  {t.contact.form.send}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center shadow-inner">
                <MapPin size={28} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{t.contact.mapTitle}</h3>
            </div>
            
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://share.google/Bm7iXxzVZdleKU7TU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-blue-900/20 group"
            >
              <span>{t.contact.openMaps}</span>
              <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
          
          <MapEmbed lang={lang} title={t.contact.mapTitle} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
