import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Baby, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const MENU_IMAGE_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/a6d844a3-978d-4ab5-97d7-c1d80708a45c/1772694568839_Gemini_Generated_Image_wgbwbpwgbwbpwgbw.png";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 h-18 flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 font-bold text-xl text-indigo-600 transition-transform active:scale-95">
            <div className="relative">
              <img 
                src={MENU_IMAGE_URL} 
                alt="Logo" 
                className="w-10 h-10 object-cover rounded-full border-2 border-indigo-100 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <Baby className="w-3 h-3 text-indigo-500" />
              </div>
            </div>
            <span className="tracking-tight">SmartKids</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            {!isHome && (
              <Link 
                to="/" 
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Home
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="pb-20">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={MENU_IMAGE_URL} 
              alt="Logo" 
              className="w-12 h-12 object-cover rounded-full grayscale opacity-50"
            />
          </div>
          <p className="text-slate-600 text-sm font-medium italic">
            "Nurturing the next generation with love and science."
          </p>
          <div className="h-px w-12 bg-slate-200 mx-auto my-6"></div>
          <p className="text-slate-500 text-sm">
            \u00a9 {new Date().getFullYear()} Healthy, Happy & Smart Kids. Supporting your family's journey.
          </p>
          <p className="text-slate-400 text-[10px] mt-3 uppercase tracking-widest font-bold">
            Disclaimer: Consult with your pediatrician before making significant changes to your child's diet.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;