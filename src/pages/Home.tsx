import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Milk, 
  Soup, 
  Baby, 
  Gamepad2, 
  ChevronRight 
} from 'lucide-react';

const HERO_IMAGE_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/a6d844a3-978d-4ab5-97d7-c1d80708a45c/1772694568839_Gemini_Generated_Image_wgbwbpwgbwbpwgbw.png";

const navigationLinks = [
  {
    path: '/6-8-months',
    label: '6–8 Months Guide',
    icon: <Milk className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
    description: 'Starting solids & new textures'
  },
  {
    path: '/9-12-months',
    label: '9–12 Months Guide',
    icon: <Soup className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-600',
    description: 'Self-feeding & varied tastes'
  },
  {
    path: '/12-18-months',
    label: '12–18 Months Guide',
    icon: <Baby className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-600',
    description: 'Family meals & active growth'
  },
  {
    path: '/18-24-months',
    label: '18–24 Months Guide',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'bg-rose-100 text-rose-600',
    description: 'Independent eating & picky eaters'
  }
];

const Home = () => {
  return (
    <div className="px-4">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto py-12 md:py-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Pitcher Image Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-10 relative inline-block"
          >
            <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-20 rounded-full scale-110"></div>
            <img 
              src={HERO_IMAGE_URL} 
              alt="Healthy Kids Support"
              className="relative w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-[6px] border-white shadow-2xl ring-1 ring-slate-100"
            />
            <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg border border-slate-50">
               <Baby className="w-6 h-6 text-indigo-500" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Healthy, Happy & Smart Kids – <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Supporting Families
            </span> 
            <span className="block text-3xl md:text-4xl mt-2 font-semibold text-slate-700">from 6 Months to 2 Years</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Practical guidance for baby nutrition, parenting support, and early childhood development to ensure your little one thrives.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
          {navigationLinks.map((link, idx) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Link
                to={link.path}
                className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all text-left"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-2xl ${link.color} transition-transform group-hover:scale-110 shadow-inner`}>
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-none mb-1">{link.label}</h3>
                    <p className="text-sm text-slate-500 font-medium">{link.description}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits / Info Section */}
      <section className="max-w-4xl mx-auto py-12 mb-16">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl shadow-indigo-200">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Nutrition Matters Now</h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              The first 1,000 days of a child's life are critical for brain development, immunity, and lifelong health habits. Our guides help you navigate this journey with confidence.
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">Expert Advice</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">Safety Tips</span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">Meal Plans</span>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 opacity-10">
            <Baby className="w-80 h-80 rotate-12" />
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;