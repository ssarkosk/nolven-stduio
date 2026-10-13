import React from 'react';
import { ShieldAlert, Award, FileCheck, Lock, Sparkles } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section id="ethical-charter" className="py-20 md:py-28 bg-[#0A0C11] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            Philosophy & Governance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            A More Personal Way to Experience Stories.
          </h2>
          <p className="mt-4 text-base text-slate-300/80 leading-relaxed">
            Stories have always been told around hearths in the voices of people we know. Our vision is to let audiences and creators experience authorized video narratives through a voice that feels deeply personal to them—grounded in absolute respect for artist rights and consent.
          </p>
        </div>

        {/* Ethical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-[#0E1017] border border-white/[0.07] rounded-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Cryptographic Consent
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                We will never permit the cloning or adaptation of any individual's voice without verifiable, cryptographic identity attestation. No public scraping. No third-party spoofing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-violet-300">
              ZERO-COMPROMISE VOICE GATE
            </div>
          </div>

          <div className="p-6 bg-[#0E1017] border border-white/[0.07] rounded-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Honoring Performers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                Acting is human artistry. Revoice is architected as an assistive creative tool for personal storytelling and authorized production, not an exploitative replacement for professional actors.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-sky-300">
              ARTIST-FIRST PRINCIPLE
            </div>
          </div>

          <div className="p-6 bg-[#0E1017] border border-white/[0.07] rounded-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Authorized Video Content
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                Our tools require proof of copyright or explicit distribution rights. We do not support stripping, remounting, or altering commercial theatrical releases without studio license.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-violet-300">
              COPYRIGHT COMPLIANCE
            </div>
          </div>

          <div className="p-6 bg-[#0E1017] border border-white/[0.07] rounded-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                C2PA Audio Provenance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                All future synthesized audio stems will embed cryptographic C2PA metadata and inaudible psychoacoustic watermarking to ensure total transparency and forensic tracking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-emerald-300">
              WATERMARKED INTEGRITY
            </div>
          </div>

        </div>

        {/* Founder Quotation */}
        <div className="mt-14 p-8 bg-[#0E1119] border border-white/[0.08] rounded-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <p className="text-base sm:text-lg text-slate-200 italic font-medium leading-relaxed">
              "The voice carries intimate emotional weight. We believe the future of generative media must be defined by consent, craftsmanship, and humility—building tools that respect creators rather than hollow out their work."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm font-semibold text-white">Nolven Studio</span>
              <span className="text-slate-500">·</span>
              <span className="text-xs font-mono text-violet-400">FOUNDING RESEARCH PRINCIPLES</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
