
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../lib/i18n';
import { ShieldCheck, Award, ThumbsUp, CheckCircle2, ChevronDown } from 'lucide-react';

interface GuaranteeProps {
  lang: 'ar' | 'en';
}

const Guarantee: React.FC<GuaranteeProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const checklistItems = [
    { title: t.guarantee.item1, content: lang === 'ar' ? 'جميع فنيينا يخضعون لفحص سجل جنائي دقيق وتدريب فني مكثف لضمان أعلى مستويات الأمان والجودة في منزلك.' : 'All our technicians undergo rigorous background checks and intensive technical training to ensure the highest safety and quality standards.' },
    { title: t.guarantee.item2, content: lang === 'ar' ? 'نحن نثق في جودة عملنا، لذا نقدم ضماناً حقيقياً لمدة ٣٠ يوماً على أي عطل يتم إصلاحه. لو عاد العطل، نصلحه مجاناً.' : 'We trust our work quality, offering a real 30-day warranty on any fixed fault. If it returns, we fix it for free.' },
    { title: t.guarantee.item3, content: lang === 'ar' ? 'فريق الدعم الفني وخدمة العملاء متاح على مدار الساعة طوال أيام الأسبوع للرد على أي استفسار أو متابعة حالة طلبك.' : 'Our tech support and customer service are available 24/7 to answer any inquiries or track your request status.' },
    { title: t.guarantee.item4, content: lang === 'ar' ? 'الشفافية هي شعارنا؛ ادفع فقط السعر المتفق عليه بعد الانتهاء من المعاينة أو الخدمة، كاش أو عبر وسائل الدفع الإلكتروني.' : 'Transparency is our motto; pay only the agreed price after inspection or service, via cash or electronic payments.' },
  ];

  return (
    <section id="guarantee" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">{t.guarantee.title}</h2>
              <p className="text-lg text-slate-600 font-semibold">{t.guarantee.subtitle}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors"></div>
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{t.guarantee.warrantyTitle}</h3>
                  <p className="text-slate-600 leading-relaxed font-semibold">
                    {t.guarantee.warrantyDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-black text-slate-900 mb-6">{t.guarantee.checklistTitle}</h4>
              <div className="space-y-3">
                {checklistItems.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <button 
                      onClick={() => setActiveItem(activeItem === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-start hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`${activeItem === i ? 'text-blue-600' : 'text-slate-300'} transition-colors shrink-0`} size={20} />
                        <span className="font-black text-slate-800">{item.title}</span>
                      </div>
                      <ChevronDown className={`text-slate-400 transition-transform ${activeItem === i ? 'rotate-180' : ''}`} size={18} />
                    </button>
                    <AnimatePresence>
                      {activeItem === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-slate-500 font-semibold text-sm leading-relaxed border-t border-slate-50">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl">
              <Award className="w-20 h-20 mb-8 opacity-30" />
              <h3 className="text-3xl font-black mb-6 leading-tight">
                {lang === 'ar' ? 'فخورين بخدمة أكتر من ١٠,٠٠٠ منزل في مصر' : 'Proudly serving over 10,000 homes in Egypt'}
              </h3>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-blue-600 bg-blue-100 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex text-orange-400">
                    <ThumbsUp size={16} fill="currentColor" />
                    <ThumbsUp size={16} fill="currentColor" className="mx-1" />
                    <ThumbsUp size={16} fill="currentColor" />
                  </div>
                  <span className="text-sm font-bold">{lang === 'ar' ? 'أعلى تقييم في السوق' : 'Highest market rating'}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 rounded-full blur-3xl -z-10 opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
