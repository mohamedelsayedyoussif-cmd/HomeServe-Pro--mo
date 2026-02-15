
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { translations } from '../lib/i18n';
import { Star, ShieldCheck, Clock, Zap, Leaf } from 'lucide-react';

interface HeroProps {
  lang: 'ar' | 'en';
  onBookClick: () => void;
}

const FloatingLeaf = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0], 
      y: [-20, -120],
      x: ["0%", "10%", "-10%", "5%"],
      rotate: 360 
    }}
    transition={{ 
      duration: 10, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="absolute text-green-400/30 pointer-events-none"
    style={{ left: x, bottom: y }}
  >
    <Leaf size={24} fill="currentColor" />
  </motion.div>
);

const Hero: React.FC<HeroProps> = ({ lang, onBookClick }) => {
  const t = translations[lang];
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const featuredImageY = useTransform(scrollY, [0, 500], [0, 30]);

  const bgImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000";
  const featuredHouseImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000";

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Nature Background with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-white/95 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/70 lg:to-transparent rtl:lg:bg-gradient-to-l dark:from-slate-950/90 dark:via-slate-950/40 dark:to-slate-950/95 lg:dark:bg-gradient-to-r lg:dark:from-slate-950/95 lg:dark:via-slate-950/70" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <FloatingLeaf delay={0} x="10%" y="10%" />
        <FloatingLeaf delay={2} x="85%" y="20%" />
        <FloatingLeaf delay={5} x="50%" y="5%" />
        <FloatingLeaf delay={1} x="20%" y="40%" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 dark:bg-orange-900/40 backdrop-blur-md text-orange-700 dark:text-orange-300 rounded-full font-bold text-sm mb-6 shadow-sm">
              <Zap size={16} fill="currentColor" />
              {t.hero.badges.fast}
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              {t.hero.title}
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-lg leading-relaxed font-semibold">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={onBookClick}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:scale-105 active:scale-95"
              >
                {t.hero.ctaPrimary}
              </button>
              <a
                href="#contact"
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center justify-center hover:scale-105"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-200/50 dark:border-slate-800/50 pt-8 backdrop-blur-sm bg-white/10 dark:bg-slate-900/10 rounded-xl p-4">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{t.hero.stats.rating}</span>
                <div className="flex text-orange-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm text-slate-500 font-bold">{t.hero.stats.reviews}</span>
              </div>
              <div className="flex flex-col border-x border-slate-200/50 dark:border-slate-800/50 px-4">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">+٥٠٠</span>
                <span className="text-sm text-slate-500 font-bold mt-1">{t.hero.stats.technicians}</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="text-green-600 dark:text-green-400 mb-1" size={24} />
                <span className="text-sm text-slate-500 font-bold text-center leading-tight">{t.hero.badges.guaranteed}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y: featuredImageY }}
            className="relative h-full flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 w-full max-w-xl">
              <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-8 border-white dark:border-slate-800 group">
                <img 
                  src={featuredHouseImage} 
                  alt="Modern House" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                {/* Floating Badge on Image */}
                <div className="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 transform transition-transform group-hover:translate-y-[-10px]">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'فحص شامل' : 'Full Inspection'}</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">{lang === 'ar' ? 'منزل ذكي وآمن' : 'Smart & Safe Home'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
