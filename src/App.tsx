import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, BookOpen, Music, Utensils, Info, LayoutDashboard, Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Toaster } from 'sonner';

// Import our new dynamic components
import { StoriesPage } from './pages/Stories';
import { MusicPage } from './pages/Music';
import { AdminDashboard } from './pages/Admin';
import FoodProgramPage from './pages/FoodPrograms';

type Page = 'home' | 'food' | 'stories' | 'songs' | 'about' | 'admin';

const Navigation = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'food', label: 'Nutrition', icon: Utensils },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'songs', label: 'Music', icon: Music },
    { id: 'admin', label: 'Admin', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <span className="text-xl font-black">LH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">Little Habesha</span>
              <span className="text-[10px] uppercase tracking-widest text-blue-600 font-bold mt-1">Platform</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as Page)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-sm font-bold ${
                  activePage === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-gray-50 rounded-xl">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as Page);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-base font-bold transition-all ${
                    activePage === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomePage = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative pt-12 md:pt-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none py-1.5 px-4 font-bold uppercase tracking-wider text-[10px]">
                v2.0 Now Dynamic
              </Badge>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time Content</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
              Modern <br />
              <span className="text-blue-600">Parenting</span> <br />
              Science
            </h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
              The first cultural and educational platform for the modern Habesha family. Access structured feeding guides and enchanting stories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-blue-100 transition-all active:scale-95"
                onClick={() => onNavigate('food')}
              >
                Start Feeding Guide
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-10 rounded-2xl text-lg border-2 border-gray-100 hover:border-blue-600 hover:text-blue-600 font-bold transition-all"
                onClick={() => onNavigate('stories')}
              >
                Browse Stories
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-blue-100 rounded-full blur-3xl opacity-30" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
               <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/260966a3-13c9-4a7f-8a53-f1376c6498f8/the-little-lion-story-bfb44423-1772694277772.webp"
                className="w-full h-full object-cover"
                alt="Happy baby"
               />
               <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                     <CheckCircle2 size={24} />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900">Content Synced</p>
                     <p className="text-xs text-gray-500">Latest update 2 minutes ago</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[ 
            { id: 'food', title: 'Nutrition Guides', desc: 'Step-by-step feeding frameworks for every developmental stage.', icon: Utensils, color: 'text-green-600', bgColor: 'bg-green-50' },
            { id: 'stories', title: 'Story Library', desc: 'A growing collection of stories that celebrate our heritage.', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { id: 'songs', title: 'Music & Lullabies', desc: 'Gentle melodies and educational songs for daily routines.', icon: Music, color: 'text-pink-600', bgColor: 'bg-pink-50' },
          ].map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -10 }}
              className="cursor-pointer group"
              onClick={() => onNavigate(card.id as Page)}
            >
              <div className="h-full bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${card.bgColor} rounded-bl-[5rem] transition-transform group-hover:scale-110 opacity-50`} />
                <div className={`w-16 h-16 ${card.bgColor} ${card.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-12 transition-transform`}>
                  <card.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium mb-8">{card.desc}</p>
                <div className="flex items-center text-sm font-black text-gray-900 group-hover:gap-2 transition-all">
                  EXPLORE <ArrowRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'food': return <FoodProgramPage />;
      case 'stories': return <StoriesPage />;
      case 'songs': return <MusicPage />;
      case 'admin': return <AdminDashboard />;
      default: return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentPage} Coming Soon</h2>
          <Button onClick={() => setCurrentPage('home')}>Return Home</Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation activePage={currentPage} setActivePage={setCurrentPage} />
      <main className="min-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="bg-white border-t border-gray-100 py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">
                LH
              </div>
              <span className="text-2xl font-bold text-gray-900">Little Habesha</span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">
              Empowering modern families with culturally relevant, scientifically-backed childhood development tools.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li><button onClick={() => setCurrentPage('food')} className="hover:text-blue-600">Nutrition</button></li>
              <li><button onClick={() => setCurrentPage('stories')} className="hover:text-blue-600">Stories</button></li>
              <li><button onClick={() => setCurrentPage('songs')} className="hover:text-blue-600">Music</button></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">System</h4>
            <ul className="space-y-4 text-gray-500 font-bold">
              <li><button onClick={() => setCurrentPage('admin')} className="hover:text-blue-600">Admin Dashboard</button></li>
              <li><button className="hover:text-blue-600">API Status</button></li>
              <li><button className="hover:text-blue-600">Documentation</button></li>
            </ul>
          </div>
          <div className="space-y-6">
             <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Community</h4>
             <div className="flex flex-col gap-4">
               <Input placeholder="Subscribe for updates" className="h-12 rounded-xl bg-gray-50 border-none font-bold" />
               <Button className="bg-gray-900 text-white font-bold h-12 rounded-xl">Join Newsletter</Button>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400 font-medium">&copy; {new Date().getFullYear()} Little Habesha. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-gray-400 font-medium">
            <button className="hover:text-gray-900">Privacy</button>
            <button className="hover:text-gray-900">Terms</button>
            <button className="hover:text-gray-900">Contact</button>
          </div>
        </div>
      </footer>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}