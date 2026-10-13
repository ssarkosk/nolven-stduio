import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenDemo: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090C]/85 backdrop-blur-md border-b border-white/[0.06] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500/80 group-hover:bg-violet-400 transition-colors shadow-[0_0_10px_rgba(139,92,246,0.5)]"></span>
          <span>Nolven Studio</span>
          <span className="text-xs font-normal text-slate-500 tracking-normal ml-1">Revoice</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400" aria-label="Main navigation">
          <button 
            onClick={() => scrollTo('interactive-workspace')} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Product Workspace
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollTo('capabilities')} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollTo('use-cases')} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Use Cases
          </button>
          <button 
            onClick={() => scrollTo('ethical-charter')} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Ethics & Vision
          </button>
          <button 
            onClick={() => scrollTo('faq')} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDemo}
            className="px-4 py-2 text-xs font-semibold text-white bg-violet-600/90 hover:bg-violet-500 rounded-lg transition-all duration-200 shadow-[0_0_20px_-3px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_-1px_rgba(139,92,246,0.6)] flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <span>Try the Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus-visible:outline-2 focus-visible:outline-violet-400"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E14] border-b border-white/[0.08] px-4 py-5 space-y-3">
          <button
            onClick={() => scrollTo('interactive-workspace')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Product Workspace
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('capabilities')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollTo('use-cases')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Use Cases
          </button>
          <button
            onClick={() => scrollTo('ethical-charter')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            Ethics & Vision
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            FAQ
          </button>
        </div>
      )}
    </header>
  );
};
