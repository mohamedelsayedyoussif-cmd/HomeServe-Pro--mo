
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, QrCode, Sun, Moon } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { translations } from '../lib/i18n';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onBookClick: () => void;
  onQrClick: () => void;
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, isDarkMode, toggleDarkMode, onBookClick, onQrClick, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home, id: 'home' },
    { href: '#services', label: t.nav.services, id: 'services' },
    { href: '#how-it-works', label: t.nav.howItWorks, id: 'how-it-works' },
    { href: '#pricing', label: t.nav.pricing, id: 'pricing' },
    { href: '#contact', label: t.nav.contact, id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 80;
      const offsetPosition = section.offsetTop - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg dark:bg-slate-900/80' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')} 
          className="flex items-center gap-2 group transition-all duration-500 hover:scale-[1.03] active:scale-95"
        >
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-200">🏠</div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500 group-hover:text-blue-900 dark:group-hover:text-blue-400">HomeServe</span>
            <span className="text-sm font-black text-blue-600 uppercase tracking-widest transition-colors duration-500 group-hover:text-orange-500">Pro</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.id)} className={`font-black transition-all text-sm uppercase tracking-wider relative group ${activeSection === link.id ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={onQrClick} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all" title="Quick Scan QR">
            <QrCode size={20} />
          </button>
          <LanguageToggle currentLang={lang} onToggle={() => setLang(lang === 'ar' ? 'en' : 'ar')} />
          <button onClick={onBookClick} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            {t.nav.bookNow}
          </button>
        </div>

        <button className="lg:hidden p-3 text-slate-900 dark:text-white bg-white/50 dark:bg-slate-800/50 rounded-xl glass" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`lg:hidden glass fixed top-[72px] left-0 w-full p-8 flex flex-col gap-6 shadow-2xl transition-all duration-300 border-t border-slate-100 dark:border-slate-800 dark:bg-slate-900/95 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.id)} className={`text-xl font-black py-3 border-b border-slate-100 dark:border-slate-800 ${activeSection === link.id ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200'}`}>
            {link.label}
          </a>
        ))}
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button 
                onClick={toggleDarkMode} 
                className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={onQrClick} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl">
                <QrCode size={20} />
              </button>
            </div>
            <LanguageToggle currentLang={lang} onToggle={() => setLang(lang === 'ar' ? 'en' : 'ar')} />
          </div>
          <button onClick={() => { setMobileMenuOpen(false); onBookClick(); }} className="bg-blue-600 text-white w-full py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200">
            {t.nav.bookNow}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
