import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Download, 
  Loader2, 
  ChevronRight,
  Apple,
  Utensils,
  Droplets,
  Calendar,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentService, FoodProgram } from '../services/contentService';

const IconMap = {
  '6-8m': <Utensils size={24} />,
  '9-12m': <Apple size={24} />,
  '12-18m': <Droplets size={24} />,
  '18-24m+': <Calendar size={24} />
};

const FoodProgramPage = () => {
  const [programs, setPrograms] = useState<FoodProgram[]>([]);
  const [activeTab, setActiveTab] = useState('6-8m');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const data = await ContentService.getFoodPrograms();
        setPrograms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const current = programs.find(p => p.age_group === activeTab) || programs[0];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="text-gray-500 font-bold">Fetching feeding frameworks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">Nutrition & Growth</h1>
        <p className="text-gray-500 text-lg font-medium">Select an age group to view scientific feeding structures tailored for development.</p>
      </div>

      <div className="flex justify-center mb-16">
        <div className="bg-gray-100/50 p-2 rounded-3xl flex flex-wrap justify-center gap-2 border border-gray-100 shadow-inner">
          {['6-8m', '9-12m', '12-18m', '18-24m+'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all ${
                activeTab === tab 
                  ? 'bg-white shadow-xl text-green-600 scale-105' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
                  {IconMap[activeTab as keyof typeof IconMap]}
                </div>
                <div>
                  <Badge className="bg-green-50 text-green-600 border-none font-black text-[10px] uppercase mb-1">
                    Phase {activeTab === '6-8m' ? 'I' : activeTab === '9-12m' ? 'II' : 'III'}
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900">{current.title}</h2>
                </div>
              </div>
              
              <p className="text-xl text-gray-500 leading-relaxed font-medium">
                {current.framework}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[ 
                  { icon: Clock, label: 'Routine Focus', desc: 'Consistent timings' },
                  { icon: ShieldCheck, label: 'Safety Check', desc: 'Texture appropriate' },
                  { icon: Droplets, label: 'Hydration', desc: 'Milk & Water' },
                  { icon: CheckCircle2, label: 'Success', desc: 'Balanced intake' }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-green-100 transition-colors">
                    <item.icon className="text-green-500 mt-1" size={20} />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-16 rounded-2xl gap-3 w-full md:w-fit px-10 font-bold text-lg shadow-2xl shadow-blue-100">
                  <Download size={22} /> Download PDF Guide
                </Button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-10 bg-green-100/40 rounded-full blur-[100px] group-hover:bg-green-200/40 transition-colors duration-1000" />
              <div className="relative">
                <img 
                  src={current.image_url} 
                  alt={current.title} 
                  className="rounded-[3rem] w-full aspect-square object-cover shadow-2xl ring-8 ring-white"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 animate-bounce-slow">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                       <CheckCircle2 size={20} />
                     </div>
                     <span className="font-bold text-gray-900">Verified Guide</span>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodProgramPage;