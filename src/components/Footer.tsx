import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface FooterProps {
  onExploreConcept: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExploreConcept }) => {
  return (
    <footer className="bg-[#06070A] text-slate-400 border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Cinematic Closing Banner / Final Callout */}
      <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] text-center relative">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="text-xs font-mono text-violet-400 uppercase tracking-wider">
            Nolven Revoice
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance leading-tight">
            The Next Voice You Hear Could Be Yours.
          </h2>

          <p className="text-base sm:text-lg text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            Experience dialogue synchronization, cadence analysis, and acoustic calibration through our interactive prototype.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={onExploreConcept}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all duration-200 shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              <span>Explore the Concept</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span>Nolven Studio</span>
              <span className="text-xs font-normal text-slate-500 tracking-normal ml-1">Revoice</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-assisted personal voice adaptation for authorized video dialogue. Designed for creators, independent directors, and personal media preservation.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <a 
                href="mailto:founder@nolven.studio" 
                className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4"
              >
                founder@nolven.studio
              </a>
            </div>
          </div>

          {/* Product Nav (3 cols) */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-mono text-slate-500 uppercase tracking-wider mb-2">
              Exploration
            </div>
            <div>
              <a href="#interactive-workspace" className="hover:text-white transition-colors block py-1">
                Studio Workspace
              </a>
            </div>
            <div>
              <a href="#how-it-works" className="hover:text-white transition-colors block py-1">
                Four-Step Workflow
              </a>
            </div>
            <div>
              <a href="#capabilities" className="hover:text-white transition-colors block py-1">
                Acoustic Capabilities
              </a>
            </div>
            <div>
              <a href="#use-cases" className="hover:text-white transition-colors block py-1">
                Target Applications
              </a>
            </div>
          </div>

          {/* Ethics & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="font-mono text-slate-500 uppercase tracking-wider mb-2">
              Commitments
            </div>
            <div>
              <a href="#ethical-charter" className="hover:text-white transition-colors block py-1">
                Ethical Voice Consent Charter
              </a>
            </div>
            <div>
              <span className="text-slate-400 block py-1">
                C2PA Provenance & Watermarking Standard
              </span>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              Nolven Studio is an independent early-stage product research project. No affiliation with major studios or union performers.
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Nolven Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#ethical-charter" className="hover:text-slate-400 transition-colors">Voice Ethics</a>
          </div>
        </div>

      </div>

    </footer>
  );
};
