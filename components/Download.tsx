
import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../lib/i18n';
import PhoneScene from './ThreeD/PhoneScene';
import { Apple, Play } from 'lucide-react';

interface DownloadProps {
  lang: 'ar' | 'en';
}

const Download: React.FC<DownloadProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="download" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="flex-1 p-12 lg:p-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {t.download.title}
              </h2>
              <p className="text-xl text-slate-400 font-semibold max-w-lg leading-relaxed">
                {t.download.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                {/* App Store Button */}
                <a 
                  href="https://apps.apple.com/us/app/example-app/id1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#0070c9] text-white px-8 py-4 rounded-[10px] font-black hover:opacity-90 transition-all group shadow-lg shadow-[#0070c9]/20"
                  aria-label="Download HomeServe Pro on the App Store"
                >
                  <Apple className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold opacity-80">
                      {lang === 'ar' ? 'حمّل من على' : 'Download on the'}
                    </span>
                    <span className="text-xl">{t.download.appStore}</span>
                  </div>
                </a>

                {/* Google Play Button */}
                <a 
                  href="https://play.google.com/store/apps/details?id=com.example.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#34A853] text-white px-8 py-4 rounded-[10px] font-black hover:opacity-90 transition-all group shadow-lg shadow-[#34A853]/20"
                  aria-label="Download HomeServe Pro on Google Play"
                >
                  <Play className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold opacity-80">
                      {lang === 'ar' ? 'حمّل من على' : 'Download on'}
                    </span>
                    <span className="text-xl">{t.download.googlePlay}</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 w-full lg:w-auto p-12 flex justify-center items-center bg-blue-600/10">
            <PhoneScene />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
