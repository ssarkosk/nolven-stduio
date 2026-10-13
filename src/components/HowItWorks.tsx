import React from 'react';
import { Film, Mic, Cpu, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose an Authorized Video',
      subtitle: 'Verified Ownership or Permission',
      icon: Film,
      description:
        'Select footage you own, created, or have explicit legal permission to adapt. Nolven Revoice is built exclusively for authorized video content, independent creators, and licensed productions.',
      highlight: 'Strict rights verification & zero unlicensed media',
    },
    {
      step: '02',
      title: 'Provide Your Voice Sample',
      subtitle: 'Acoustic Calibration Capture',
      icon: Mic,
      description:
        'Record a 15–30 second neutral voice sample using your microphone, or upload a clean lossless audio file. The engine calibrates fundamental pitch, formant geometry, and vocal resonance.',
      highlight: 'Lossless audio mapping · Zero voice cloning without consent',
    },
    {
      step: '03',
      title: 'Analyze Scene Dynamics',
      subtitle: 'Phonemes, Timing & Delivery',
      icon: Cpu,
      description:
        'The system evaluates the original performance frame by frame: tracking syllable durations, natural pauses, breath intakes, and emotional inflection curves to lock timing.',
      highlight: 'Sub-frame synchronization & emotional cadence modeling',
    },
    {
      step: '04',
      title: 'Preview and Refine Delivery',
      subtitle: 'Acoustic Convolving & Stems',
      icon: SlidersHorizontal,
      description:
        'Audition the adapted voice track synchronized to the scene. Fine-tune cadence strictness, match room acoustic reflections, and export isolated dialogue stems when engine support is active.',
      highlight: 'Director-grade A/B auditioning & stem management',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#08090C] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            The Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            How Nolven Revoice Works
          </h2>
          <p className="mt-4 text-base text-slate-300/80 leading-relaxed">
            Recreating dialogue in a personal voice requires honoring every micro-pause, emotional accent, and physical breath of the original performance. Here is the four-step adaptation pipeline.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative p-6 sm:p-7 bg-[#0E1017] border border-white/[0.07] hover:border-violet-500/40 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-violet-400/80 group-hover:text-violet-300 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-100 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                <div className="pt-4 border-t border-white/[0.05] text-xs text-violet-300/90 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Note Strip */}
        <div className="mt-12 p-4 bg-[#0E1119] border border-white/[0.06] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0"></span>
            <span className="text-slate-300 font-medium">Consent-First Architecture:</span>
            <span>All voice profiles require verified cryptographic authorization before enrollment.</span>
          </div>
          <span className="text-slate-500 font-mono text-[11px]">
            ISO/IEC 27001 AUDITED PROCEDURES (PLANNED)
          </span>
        </div>

      </div>
    </section>
  );
};
