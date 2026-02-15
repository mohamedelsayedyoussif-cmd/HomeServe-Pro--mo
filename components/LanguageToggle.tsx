
import React from 'react';

interface LanguageToggleProps {
  currentLang: 'ar' | 'en';
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-slate-200 hover:bg-slate-50 transition-all font-semibold text-sm"
      aria-label="Toggle Language"
    >
      <span className={currentLang === 'ar' ? 'text-blue-600' : 'text-slate-400'}>عربي</span>
      <span className="text-slate-300">|</span>
      <span className={currentLang === 'en' ? 'text-blue-600' : 'text-slate-400'}>EN</span>
    </button>
  );
};

export default LanguageToggle;
