import React from 'react';
import { Mic, Clock, Sparkles, Sliders, Globe, Shield, Waves } from 'lucide-react';

export const ProductCapabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 md:py-28 bg-[#0A0C11] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            Engineering & Product Goals
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Cinematic Audio Capabilities
          </h2>
          <p className="mt-4 text-base text-slate-300/80 leading-relaxed">
            Revoice is architected around audio physics, emotional fidelity, and cinematic precision. Planned capabilities represent our ongoing research milestones.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Personal Voice Adaptation (Large 7 cols) */}
          <div className="md:col-span-7 p-7 sm:p-8 bg-[#0E1017] border border-white/[0.07] rounded-2xl flex flex-col justify-between group hover:border-violet-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                  CORE ARCHITECTURE
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Personal Voice Adaptation
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed max-w-xl">
                Acoustic identity is more than a pitch shift. Our modeling pipeline maps the user's vocal tract morphology, natural harmonic envelope, and chest resonance from a short calibration recording, reproducing dialogue while preserving their authentic timbre.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="font-mono text-slate-500">SAMPLE NEEDED</div>
                <div className="font-semibold text-white mt-1">15–30 Seconds</div>
              </div>
              <div>
                <div className="font-mono text-slate-500">FIDELITY TARGET</div>
                <div className="font-semibold text-white mt-1">48kHz Lossless</div>
              </div>
              <div>
                <div className="font-mono text-slate-500">CONSENT GATE</div>
                <div className="font-semibold text-violet-400 mt-1">Mandatory</div>
              </div>
            </div>
          </div>

          {/* Card 2: Dialogue Timing & Synchronization (5 cols) */}
          <div className="md:col-span-5 p-7 sm:p-8 bg-[#0E1017] border border-white/[0.07] rounded-2xl flex flex-col justify-between group hover:border-violet-500/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                  SUB-FRAME PRECISION
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Dialogue Timing & Scene Sync
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed">
                Lip-sync is unforgiving. Revoice locks syllable attacks, vowel holds, and dramatic silent beats to the on-screen actor's temporal boundaries down to fractions of a frame.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>TEMPORAL JITTER</span>
              <span className="text-sky-300 font-semibold">&lt; 8 milliseconds</span>
            </div>
          </div>

          {/* Card 3: Emotion-Aware Delivery [Development Goal] (5 cols) */}
          <div className="md:col-span-5 p-7 sm:p-8 bg-[#0E1017] border border-violet-500/20 rounded-2xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  DEVELOPMENT GOAL
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Emotion-Aware Delivery
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed">
                Flat synthetic speech ruins dramatic immersion. We are researching neural models capable of sensing whisper tension, vocal fry, sobbing cadences, and rising panic—mapping the emotional charge directly to the adapted voice.
              </p>
            </div>

            <div className="mt-6 p-3 bg-violet-950/30 rounded-xl border border-violet-500/20 text-xs text-violet-300">
              Status: Active research benchmark. Evaluated via blind director listening panels.
            </div>
          </div>

          {/* Card 4: Audio Preview & Acoustic Refinement (7 cols) with visual asset */}
          <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0E1017] group hover:border-violet-500/40 transition-colors">
            
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <img
                src="/src/assets/images/studio_acoustic_workstation_1791930268911.jpg"
                alt="Professional audio mastering workstation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-[#0E1017]/80 to-transparent" />
            </div>

            <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    STUDIO PIPELINE
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Acoustic Preview & Room Convolving
                </h3>
                <p className="text-sm text-slate-300/80 leading-relaxed max-w-lg">
                  Dialogue must inhabit its environment. Revoice is being designed to extract the room impulse response (RIR) from production audio—matching reverb, early reflections, and microphone proximity effect.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-violet-400" />
                  <span>Dolby Atmos & 5.1 Stem Compatibility Target</span>
                </span>
                <span className="font-mono text-slate-500">24-BIT / 96k READY</span>
              </div>
            </div>
          </div>

          {/* Card 5: Potential Multilingual Experiences [Exploratory Goal] (12 cols) */}
          <div className="md:col-span-12 p-6 sm:p-7 bg-[#0E1017] border border-white/[0.07] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Potential Multilingual Adaptation
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    EXPLORATORY GOAL
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/80 mt-1 max-w-3xl">
                  Exploring cross-lingual phoneme transfer where a user's vocal timbre can speak alternate languages while preserving the original dramatic pacing and emotional subtext, only where supported by licensing and consent.
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-500 shrink-0">
              PHASE 2 ROADMAP INITIATIVE
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
