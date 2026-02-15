
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { translations } from '../lib/i18n';
import { Linkedin, Facebook, Heart, QrCode, Calendar, Phone, ChevronRight, ChevronLeft } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
  onQrClick: () => void;
  onBookClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onQrClick, onBookClick }) => {
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0.8, 1], [-100, 0]);

  const footerImage = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 py-16 overflow-hidden">
      {/* Nature Background with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-20 scale-110"
          style={{ backgroundImage: `url('${footerImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/80" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl shadow-lg">🏠</div>
              <span className="text-2xl font-black text-white">HomeServe Pro</span>
            </div>
            <p className="max-w-sm mb-8 leading-relaxed font-semibold text-slate-400">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <a href="https://sa.linkedin.com/in/mohamed-elsayed-yousef-4a2ba81ab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-md group" aria-label="LinkedIn">
                <Linkedin size={20} className="group-hover:scale-110" />
              </a>
              <a href="https://web.facebook.com/mhmdalsydyusf/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-md group" aria-label="Facebook">
                <Facebook size={20} className="group-hover:scale-110" />
              </a>
              <button onClick={onQrClick} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-md group" title="Scan QR">
                <QrCode size={20} className="group-hover:scale-110" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-6">{t.nav.services}</h4>
            <ul className="space-y-4 font-bold">
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">{lang === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />} سباكة / Plumbing</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">{lang === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />} كهرباء / Electricity</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">{lang === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />} تكييف / AC</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">{lang === 'ar' ? <ChevronLeft size={14} /> : <ChevronRight size={14} />} تنظيف / Cleaning</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-6">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="font-bold hover:text-blue-400 transition-all">{t.nav.howItWorks}</a>
                <a href="#pricing" onClick={(e) => handleSmoothScroll(e, 'pricing')} className="font-bold hover:text-blue-400 transition-all">{t.nav.pricing}</a>
                <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="font-bold hover:text-blue-400 transition-all">FAQ</a>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="font-bold hover:text-blue-400 transition-all">{t.nav.contact}</a>
              </nav>
              
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button 
                  onClick={onBookClick}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg group"
                >
                  <Calendar size={18} />
                  <span>{t.nav.bookNow}</span>
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="tel:+201033776986"
                    className="bg-white/10 text-white px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <Phone size={14} />
                    <span>{lang === 'ar' ? 'اتصل بنا' : 'Call'}</span>
                  </a>
                  <button 
                    onClick={onQrClick}
                    className="bg-white/10 text-white px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <QrCode size={14} />
                    <span>{lang === 'ar' ? 'مسح الكود' : 'Scan'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold">
          <p>{t.footer.rights}</p>
          <div className="flex items-center gap-2 opacity-60">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
            <span>in Egypt</span>
          </div>
          <p className="italic text-slate-500">{t.footer.oneLiner}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
