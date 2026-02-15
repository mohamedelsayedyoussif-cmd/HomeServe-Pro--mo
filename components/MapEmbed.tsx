
import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

interface MapEmbedProps {
  lang: 'ar' | 'en';
  title: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ lang, title }) => {
  // رابط مباشر للموقع بدلاً من التضمين لتجنب مشاكل الـ pb parameter
  const directMapsUrl = "https://www.google.com/maps/place/Cairo,+Egypt/@30.0444,31.2357,12z";

  return (
    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-[2.5rem] border border-white bg-slate-100 shadow-2xl group">
      {/* واجهة الخريطة الوهمية (Stylized Dummy Map) */}
      <div className="absolute inset-0 bg-[#e5e3df] opacity-80">
        {/* خطوط وهمية لتمثيل الشوارع */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(#d1d1d1 1px, transparent 1px), linear-gradient(90deg, #d1d1d1 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* شوارع رئيسية وهمية */}
        <div className="absolute top-1/2 left-0 w-full h-8 bg-[#fdfdfd] -translate-y-1/2 rotate-12"></div>
        <div className="absolute top-0 left-1/3 w-10 h-full bg-[#fdfdfd] -translate-x-1/2 -rotate-6"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-6 bg-[#fdfdfd] rotate-[-15deg]"></div>
      </div>

      {/* نقطة الموقع (Map Pin) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-red-600 text-white p-3 rounded-2xl shadow-xl shadow-red-200">
            <MapPin size={32} />
          </div>
        </div>
        <div className="mt-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100">
          <span className="text-sm font-black text-slate-900">
            {lang === 'ar' ? 'مقر هوم سيرف برو الرئيسي' : 'HomeServe Pro HQ'}
          </span>
        </div>
      </div>

      {/* طبقة التفاعل (Overlay) */}
      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-all duration-500 flex items-end p-8">
        <div className="w-full glass p-6 rounded-3xl border border-white/30 flex flex-col md:flex-row items-center justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Navigation size={24} />
            </div>
            <div>
              <h4 className="font-black text-slate-900">
                {lang === 'ar' ? 'جاهز للزيارة؟' : 'Ready to visit?'}
              </h4>
              <p className="text-sm text-slate-600 font-bold">
                {lang === 'ar' ? 'انقر لفتح الاتجاهات بدقة' : 'Click to open exact directions'}
              </p>
            </div>
          </div>
          
          <a 
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl"
          >
            <span>{lang === 'ar' ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* ملصق توضيحي */}
      <div className="absolute top-6 left-6 glass px-4 py-2 rounded-full border border-white/40 text-xs font-black text-slate-500 uppercase tracking-widest z-10">
        Live Location Tracking
      </div>
    </div>
  );
};

export default MapEmbed;
