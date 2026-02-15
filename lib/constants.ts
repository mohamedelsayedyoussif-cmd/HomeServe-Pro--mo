
import { Service, Testimonial, FAQItem } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'plumbing',
    name: { ar: 'سباكة', en: 'Plumbing' },
    icon: '🔧',
    description: { 
      ar: 'تصليح كافة أعطال السباكة، تركيب الأحواض، والخلاطات، ومعالجة التسريب.', 
      en: 'Fixing all plumbing issues, installing sinks, faucets, and leak detection.' 
    },
    price: { ar: '٢٠٠', en: '200' },
    eta: { ar: '٣٠ - ٦٠ دقيقة', en: '30-60 mins' },
    commonIssues: {
      ar: ['تسريب مياه', 'انسداد صرف', 'تركيب خلاط جديد'],
      en: ['Water leaks', 'Drain blockage', 'New faucet installation']
    }
  },
  {
    id: 'electricity',
    name: { ar: 'كهرباء', en: 'Electricity' },
    icon: '⚡',
    description: { 
      ar: 'صيانة لوحات الكهرباء، تركيب النجف والمفاتيح، وتصليح الماس الكهربائي.', 
      en: 'Electrical board maintenance, chandelier installation, and short circuit repair.' 
    },
    price: { ar: '١٥٠', en: '150' },
    eta: { ar: '٤٥ دقيقة', en: '45 mins' },
    commonIssues: {
      ar: ['قفلة كهرباء', 'تركيب سبوتات', 'تغيير مفاتيح'],
      en: ['Short circuit', 'Spotlight installation', 'Switch replacement']
    }
  },
  {
    id: 'ac',
    name: { ar: 'تكييف', en: 'AC Maintenance' },
    icon: '❄️',
    description: { 
      ar: 'تنظيف وشحن فريون وصيانة دورية لجميع أنواع التكييفات.', 
      en: 'Cleaning, gas recharge, and periodic maintenance for all AC types.' 
    },
    price: { ar: '٣٥٠', en: '350' },
    eta: { ar: '٦٠ دقيقة', en: '60 mins' },
    commonIssues: {
      ar: ['التكييف مش بيسقع', 'تسريب مياه من الوحدة', 'شحن فريون'],
      en: ['AC not cooling', 'Water leaking from unit', 'Freon recharge']
    }
  },
  {
    id: 'cleaning',
    name: { ar: 'تنظيف', en: 'Cleaning' },
    icon: '🧹',
    description: { 
      ar: 'تنظيف عميق للمنازل، السجاد، والكنب بأحدث المعدات.', 
      en: 'Deep cleaning for homes, carpets, and sofas using modern equipment.' 
    },
    price: { ar: '٥٠٠', en: '500' },
    eta: { ar: '٣ - ٥ ساعات', en: '3-5 hours' },
    commonIssues: {
      ar: ['تنظيف بعد التشطيب', 'غسيل سجاد', 'تنظيف كنبات'],
      en: ['Post-construction cleaning', 'Carpet washing', 'Sofa cleaning']
    }
  },
  {
    id: 'maintenance',
    name: { ar: 'صيانة عامة', en: 'General Maintenance' },
    icon: '🛠️',
    description: { 
      ar: 'حلول متكاملة للصيانة المنزلية البسيطة والمعقدة.', 
      en: 'Integrated solutions for simple and complex home maintenance.' 
    },
    price: { ar: '١٠٠', en: '100' },
    eta: { ar: 'حسب الطلب', en: 'On demand' },
    commonIssues: {
      ar: ['تركيب ستاير', 'تعليق شاشات', 'تصليح ابواب'],
      en: ['Curtain installation', 'TV mounting', 'Door repair']
    }
  },
  {
    id: 'painting',
    name: { ar: 'دهان', en: 'Painting' },
    icon: '🎨',
    description: { 
      ar: 'خدمات دهانات وديكورات بلمسة احترافية وخامات عالية الجودة.', 
      en: 'Professional painting and decoration services with high-quality materials.' 
    },
    price: { ar: '١٥٠٠', en: '1500' },
    eta: { ar: 'يوم - ٣ أيام', en: '1-3 days' },
    commonIssues: {
      ar: ['تجديد لون غرفة', 'معالجة رطوبة', 'دهان حوائط'],
      en: ['Room repaint', 'Dampness treatment', 'Wall painting']
    }
  },
  {
    id: 'carpentry',
    name: { ar: 'نجارة', en: 'Carpentry' },
    icon: '🪚',
    description: { 
      ar: 'فك وتركيب أثاث، تصليح كوالين، وصيانة غرف النوم.', 
      en: 'Furniture assembly, lock repair, and bedroom maintenance.' 
    },
    price: { ar: '٢٠٠', en: '200' },
    eta: { ar: '٩٠ دقيقة', en: '90 mins' },
    commonIssues: {
      ar: ['تغيير كالون', 'تصليح مفصلات', 'تركيب مطبخ'],
      en: ['Lock replacement', 'Hinge repair', 'Kitchen installation']
    }
  },
  {
    id: 'appliances',
    name: { ar: 'أجهزة منزلية', en: 'Appliances' },
    icon: '🧺',
    description: { 
      ar: 'صيانة غسالات، ثلاجات، بوتجازات، وميكروويف.', 
      en: 'Maintenance for washing machines, fridges, stoves, and microwaves.' 
    },
    price: { ar: '٣٠٠', en: '300' },
    eta: { ar: '٢ - ٣ ساعات', en: '2-3 hours' },
    commonIssues: {
      ar: ['الغسالة بتصرف مياه', 'الثلاجة مش بتبرد', 'تصليح بوتجاز'],
      en: ['Washer leaking', 'Fridge not cooling', 'Stove repair']
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' },
    location: { ar: 'التجمع الخامس', en: 'Fifth Settlement' },
    text: { 
      ar: 'خدمة ممتازة وسريعة جداً. الفني جه في ميعاده وصلح عطل الكهرباء في أقل من نص ساعة.', 
      en: 'Excellent and very fast service. The technician arrived on time and fixed the electrical fault in under 30 minutes.' 
    },
    rating: 5
  },
  {
    id: 2,
    name: { ar: 'سارة حسن', en: 'Sara Hassan' },
    location: { ar: 'مدينة نصر', en: 'Nasr City' },
    text: { 
      ar: 'كنت محتاجة سباك ضروري في نص الليل وهوم سيرف بعتولي فني فوراً. بجد منقذين!', 
      en: 'I needed an emergency plumber at midnight and HomeServe sent a pro immediately. Real lifesavers!' 
    },
    rating: 5
  },
  {
    id: 3,
    name: { ar: 'محمد علي', en: 'Mohamed Ali' },
    location: { ar: 'الشيخ زايد', en: 'Sheikh Zayed' },
    text: { 
      ar: 'الأسعار واضحة ومفيش استغلال زي ما بيحصل مع الفنيين اللي في الشارع. الضمان بيطمن جداً.', 
      en: 'Pricing is clear and there is no exploitation like with street technicians. The warranty is very reassuring.' 
    },
    rating: 4
  }
];

export const FAQS: FAQItem[] = [
  {
    question: { ar: 'هل الأسعار ثابتة؟', en: 'Are prices fixed?' },
    answer: { 
      ar: 'نعم، نوفر تسعير شفاف يبدأ من مبالغ محددة لكل خدمة، ويتم تأكيد السعر النهائي بعد المعاينة وقبل البدء.', 
      en: 'Yes, we provide transparent pricing starting from specific amounts. The final price is confirmed after inspection and before work begins.' 
    }
  },
  {
    question: { ar: 'هل خدمة الطوارئ متاحة ٢٤ ساعة؟', en: 'Is emergency service 24/7?' },
    answer: { 
      ar: 'بالتأكيد، فريق الطوارئ متاح طوال أيام الأسبوع وعلى مدار الساعة للخدمات العاجلة.', 
      en: 'Absolutely, our emergency team is available 24/7 throughout the week for urgent services.' 
    }
  },
  {
    question: { ar: 'ماذا يغطي الضمان؟', en: 'What does the warranty cover?' },
    answer: { 
      ar: 'الضمان يغطي أي عيوب في الصيانة التي قام بها الفني لمدة ٣٠ يوماً من تاريخ الخدمة.', 
      en: 'The warranty covers any defects in the maintenance performed by the technician for 30 days from the service date.' 
    }
  }
];
