
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceModal from './components/Modals/ServiceModal';
import BookingModal from './components/Modals/BookingModal';
import QRCodeModal from './components/Modals/QRCodeModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Guarantee from './components/Guarantee';
import Download from './components/Download';
import { SERVICES, FAQS, TESTIMONIALS } from './lib/constants';
import { translations } from './lib/i18n';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, ShieldCheck, Clock, Zap, ChevronDown, AlertCircle, CheckCircle2, MessageCircle, QrCode } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const servicesBgY = useTransform(scrollYProgress, [0.1, 0.4], [0, 50]);

  useEffect(() => {
    // Language initialization
    const savedLang = localStorage.getItem('lang') as 'ar' | 'en';
    if (savedLang) handleSetLang(savedLang);
    else handleSetLang('ar');

    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      handleSetDarkMode(true);
    } else {
      handleSetDarkMode(false);
    }
    
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'services', 'how-it-works', 'pricing', 'proof', 'guarantee', 'faq', 'contact', 'download'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSetLang = (newLang: 'ar' | 'en') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    if (newLang === 'en') document.body.classList.add('en-font');
    else document.body.classList.remove('en-font');
  };

  const handleSetDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const t = translations[lang];

  return (
    <div className={`min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}>
      <Header 
        lang={lang} 
        setLang={handleSetLang} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => handleSetDarkMode(!isDarkMode)}
        onBookClick={() => setIsBookingOpen(true)} 
        onQrClick={() => setIsQrOpen(true)}
        activeSection={activeSection}
      />
      
      <main id="main-content">
        <Hero lang={lang} onBookClick={() => setIsBookingOpen(true)} />

        <div className="relative">
          {/* Subtle Services Background */}
          <motion.div 
            style={{ y: servicesBgY }}
            className="absolute inset-0 -z-10 opacity-30"
          >
             <div className="sticky top-0 h-screen w-full bg-[url('https://images.unsplash.com/photo-1516528387618-afa90b13e000?auto=format&fit=crop&q=80&w=2000')] bg-fixed bg-cover opacity-5 dark:opacity-[0.02]" />
          </motion.div>
          
          <Services lang={lang} onServiceSelect={(id) => {
            setSelectedServiceId(id);
            setIsServiceModalOpen(true);
          }} />
        </div>

        <section className="py-16 bg-orange-600 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-start gap-6 max-w-2xl">
              <div className="shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-3">{t.warning.title}</h3>
                <p className="text-orange-100 font-semibold leading-relaxed text-lg">
                  {t.warning.desc}
                </p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-50 transition-all shadow-2xl shrink-0"
            >
              {t.warning.cta}
            </motion.button>
          </div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
        </section>

        <section id="how-it-works" className="py-24 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-4">{t.howItWorks.title}</h2>
              <p className="text-blue-100 font-bold text-lg">{t.howItWorks.emergencyNote}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-16 relative">
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-blue-400/50 z-0"></div>
              {[1, 2, 3].map((step) => (
                <motion.div 
                  key={step} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step * 0.2 }}
                  className="flex flex-col items-center text-center group relative z-10"
                >
                  <div className="w-24 h-24 bg-white text-blue-600 rounded-[2rem] flex items-center justify-center text-4xl font-black mb-8 transition-all shadow-xl group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
                    {step}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{(t.howItWorks as any)[`step${step}`].title}</h3>
                  <p className="text-blue-50 font-semibold text-lg">{(t.howItWorks as any)[`step${step}`].desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Guarantee lang={lang} />

        <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white text-center mb-20">{t.pricing.title}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="glass p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 dark:bg-slate-800/40 flex flex-col items-center hover:shadow-2xl transition-all">
                <h3 className="text-xl font-bold text-slate-500 mb-6 uppercase tracking-widest">{t.pricing.single}</h3>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-sm text-slate-400 font-bold">{t.services.startingFrom}</span>
                  <span className="text-5xl font-black text-slate-900 dark:text-white">١٠٠</span>
                  <span className="text-slate-500 font-bold">{t.services.egp}</span>
                </div>
                <ul className="space-y-5 mb-12 w-full text-slate-600 dark:text-slate-400 font-semibold text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" size={22} /> {lang === 'ar' ? 'زيارة واحدة فقط' : 'Single visit only'}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" size={22} /> {lang === 'ar' ? 'ضمان ٣٠ يوم' : '30-day warranty'}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" size={22} /> {lang === 'ar' ? 'دعم فني متميز' : 'Priority support'}</li>
                </ul>
                <button onClick={() => setIsBookingOpen(true)} className="w-full py-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-lg hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white hover:border-slate-900 dark:hover:border-white transition-all">{t.pricing.subscribe}</button>
              </div>
              
              <div className="glass p-10 rounded-[2.5rem] border-2 border-blue-600 dark:bg-slate-800/60 flex flex-col items-center relative shadow-2xl shadow-blue-100 dark:shadow-blue-900/20 scale-105 z-10 bg-white/90">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-2 rounded-full text-sm font-black uppercase tracking-widest">
                  {t.pricing.popular}
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-6 uppercase tracking-widest">{t.pricing.home}</h3>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">٩٩</span>
                  <span className="text-slate-500 font-bold">{t.services.egp} / {lang === 'ar' ? 'شهر' : 'month'}</span>
                </div>
                <ul className="space-y-5 mb-12 w-full text-slate-700 dark:text-slate-300 font-black text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-600" size={22} /> {lang === 'ar' ? '٢ زيارة صيانة مجانية' : '2 free maintenance visits'}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-600" size={22} /> {lang === 'ar' ? 'خصم ٢٠٪ على قطع الغيار' : '20% off spare parts'}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-600" size={22} /> {lang === 'ar' ? 'أولوية حجز الطوارئ' : 'Emergency priority'}</li>
                </ul>
                <button onClick={() => setIsBookingOpen(true)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">{t.pricing.subscribe}</button>
              </div>

              <div className="glass p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 dark:bg-slate-800/40 flex flex-col items-center hover:shadow-2xl transition-all">
                <h3 className="text-xl font-bold text-slate-500 mb-6 uppercase tracking-widest">{t.pricing.owners}</h3>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">٢٤٩</span>
                  <span className="text-slate-500 font-bold">{t.services.egp} / {lang === 'ar' ? 'شهر' : 'month'}</span>
                </div>
                <ul className="space-y-5 mb-12 w-full text-slate-600 dark:text-slate-400 font-semibold text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" size={22} /> {lang === 'ar' ? 'صيانة شاملة دورية' : 'Regular full maintenance'}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" size={22} /> {lang === 'ar' ? 'زيارات غير محدودة' : 'Unlimited visits'}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500" size={22} /> {lang === 'ar' ? 'تقارير فنية شهرية' : 'Monthly tech reports'}</li>
                </ul>
                <button onClick={() => setIsBookingOpen(true)} className="w-full py-5 border-2 border-slate-200 dark:border-slate-700 rounded-2xl font-black text-lg hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white hover:border-slate-900 dark:hover:border-white transition-all">{t.pricing.subscribe}</button>
              </div>
            </div>
          </div>
        </section>

        <Download lang={lang} />

        <section id="proof" className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white text-center mb-20">{lang === 'ar' ? 'آراء عملاء هوم سيرف الحقيقية' : 'Real Customer Reviews'}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(item => (
                <motion.div 
                  key={item.id} 
                  whileHover={{ translateY: -10 }}
                  className="glass p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 dark:bg-slate-900/40 shadow-sm flex flex-col hover:shadow-xl transition-all"
                >
                  <div className="flex text-orange-400 mb-6">
                    {[...Array(item.rating)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
                  </div>
                  <p className="mb-10 text-slate-600 dark:text-slate-400 font-semibold text-lg leading-relaxed italic">"{item.text[lang]}"</p>
                  <div className="flex items-center gap-5 mt-auto border-t border-slate-50 dark:border-slate-800 pt-6">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-2xl border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden flex items-center justify-center">
                      <img src={`https://i.pravatar.cc/150?u=${item.id + 5}`} alt={item.name[lang]} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-lg">{item.name[lang]}</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">{item.location[lang]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20">{lang === 'ar' ? 'الأسئلة المتكررة' : 'Common Questions'}</h2>
            <div className="space-y-5">
              {FAQS.map((item, i) => (
                <details key={i} className="group bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden transition-all duration-300 open:ring-2 open:ring-blue-500">
                  <summary className="flex items-center justify-between p-8 cursor-pointer font-black text-xl list-none select-none">
                    <span>{item.question[lang]}</span>
                    <ChevronDown className="group-open:rotate-180 transition-transform text-blue-500" size={28} />
                  </summary>
                  <div className="p-8 pt-0 text-slate-300 font-semibold text-lg leading-relaxed border-t border-slate-700/50">
                    {item.answer[lang]}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Contact lang={lang} />
      </main>

      <Footer 
        lang={lang} 
        onQrClick={() => setIsQrOpen(true)} 
        onBookClick={() => setIsBookingOpen(true)} 
      />

      <a
        href={`https://wa.me/201033776986?text=${encodeURIComponent(lang === 'ar' ? "السلام عليكم، عايز احجز خدمة من HomeServe Pro." : "Hi, I'd like to book a service.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center group`}
      >
        <MessageCircle size={32} />
      </a>

      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        service={SERVICES.find(s => s.id === selectedServiceId) || null}
        lang={lang}
        onBookNow={() => {
          setIsServiceModalOpen(false);
          setIsBookingOpen(true);
        }}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        prefilledServiceId={selectedServiceId || undefined}
      />
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        lang={lang}
      />
    </div>
  );
};

export default App;
