import React from 'react';
import { ArrowRight, Play, Mic, Sliders, Volume2 } from 'lucide-react';

interface HeroProps {
  onExploreDemo: () => void;
  onExploreHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreDemo, onExploreHowItWorks }) => {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-white/[0.05]">
      {/* Ambient background studio lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-sky-600/8 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Clean unboxed editorial kicker (anti-pill) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-violet-400/90">
              <span>Nolven Studio</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Early-Stage Voice Experience</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Your Voice.<br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Every Scene.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-xl">
              Reimagine video dialogue in your own voice, with a focus on emotional delivery, timing, and synchronization.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreDemo}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all duration-200 shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] flex items-center gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <span>Experience the Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreHowItWorks}
                className="px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-white/40"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* Subtle proof & transparency footnote */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span>Interactive prototype with browser audio modeling. No fake backend generation.</span>
            </div>
          </div>

          {/* Right Column: Cinematic Studio Soundstage Focal Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0E1015] shadow-2xl shadow-black/80 group">
              
              {/* Studio Screen Header Bar */}
              <div className="px-4 py-2.5 bg-[#12141C] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400/80"></span>
                  <span className="tracking-wide">SOUNDSTAGE PREVIEW</span>
                </div>
                <div className="tabular-nums text-slate-400">
                  TC 00:01:24:18
                </div>
              </div>

              {/* Cinematic Visual Asset */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src="/src/assets/images/hero_cinematic_soundstage_1791930267494.jpg"
                  alt="Nolven soundstage ADR mixing console with cinematic dialogue monitor"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Overlay Dialogue Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#0B0D12]/90 backdrop-blur-md rounded-lg border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-violet-300 mb-1">
                    <span>DIALOGUE TRACK · TAKE 03</span>
                    <span className="text-slate-400">SYNC LOCK: 98.4%</span>
                  </div>
                  <p className="text-xs text-white/95 italic font-medium leading-snug">
                    "We never spoke about what happened before the signal broke."
                  </p>
                  
                  {/* Subtle waveform equalizer simulation */}
                  <div className="mt-2 flex items-center gap-1 h-3" aria-hidden="true">
                    {[40, 70, 95, 60, 30, 85, 100, 75, 45, 90, 60, 30, 70, 85, 50, 65, 40, 90, 75, 30].map((height, i) => (
                      <span 
                        key={i} 
                        className="flex-1 bg-violet-500/60 rounded-full transition-all duration-300" 
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="px-4 py-2.5 bg-[#0B0D12] border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-violet-400" />
                  <span>Personal Voice Sample</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" />
                  <span>Emotional Inflection Lock</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
