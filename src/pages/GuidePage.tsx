import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertCircle, 
  Utensils, 
  Calendar, 
  ShieldCheck,
  Droplets,
  Clock,
  Apple
} from 'lucide-react';
import { GuideData } from '../data/guides';

interface GuidePageProps {
  data: GuideData;
}

const IconMap = {
  calendar: <Calendar className="w-5 h-5" />,
  utensils: <Utensils className="w-5 h-5" />,
  droplets: <Droplets className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  apple: <Apple className="w-5 h-5" />
};

const GuidePage: React.FC<GuidePageProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8 shadow-lg">
          <img 
            src={data.heroImage} 
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {data.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {data.introduction}
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                What This Stage Focuses On
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.focusAreas.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Feeding Structure</h2>
              <div className="space-y-4">
                {data.feedingStructure.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-slate-100 rounded-xl border border-slate-200/50">
                    <div className="p-2 bg-white rounded-lg text-indigo-600 shrink-0 h-fit">
                      {IconMap[item.iconKey] || <Calendar className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.label}</h4>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommended Food Types</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.foodTypes.map((cat, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-colors">
                    <h3 className="font-bold text-indigo-700 mb-3 border-b border-indigo-50 pb-2">{cat.category}</h3>
                    <ul className="space-y-2">
                      {cat.items.map((food, fidx) => (
                        <li key={fidx} className="text-slate-600 text-sm flex items-center gap-2">
                          <Utensils className="w-3.5 h-3.5 text-slate-400" />
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Quick Tips */}
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Safety First
              </h3>
              <ul className="space-y-3 text-sm text-indigo-800">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  Always supervise feeding.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  Avoid honey for babies under 1 year.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  Test temperature before serving.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  Wash hands before meal prep.
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Allergy Watch
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                When introducing new foods, wait 3-5 days before starting another one to monitor for any reactions. Common allergens include eggs, peanuts, and dairy.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuidePage;