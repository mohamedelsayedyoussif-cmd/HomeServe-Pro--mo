
export type Language = 'ar' | 'en';

export interface Service {
  id: string;
  name: { ar: string; en: string };
  icon: string;
  description: { ar: string; en: string };
  price: { ar: string; en: string };
  eta: { ar: string; en: string };
  commonIssues: { ar: string[]; en: string[] };
}

export interface Testimonial {
  id: number;
  name: { ar: string; en: string };
  location: { ar: string; en: string };
  text: { ar: string; en: string };
  rating: number;
}

export interface FAQItem {
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}
