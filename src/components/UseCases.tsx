import React from 'react';
import { Film, Clapperboard, Globe2, HeartHandshake, ArrowRight } from 'lucide-react';

interface UseCasesProps {
  onSelectCase: () => void;
}

export const UseCases: React.FC<UseCasesProps> = ({ onSelectCase }) => {
  const cases = [
    {
      id: 'indie-film',
      title: 'Independent Filmmaking & Scratch ADR',
      icon: Clapperboard,
      tag: 'CREATIVE PRODUCTION',
      summary:
        'Indie directors and writers can audition dialogue rewrites, test pacing, and produce temporary scratch ADR in the intended vocal register without scheduling expensive studio booth sessions.',
      benefit: 'Accelerates editing cuts and early director pitch reels.',
      sceneCue: 'Testing alternate character cadences before picture lock.',
    },
    {
      id: 'personal-remix',
      title: 'Personal Video Remixes & Creator Memories',
      icon: Film,
      tag: 'PERSONAL CREATION',
      summary:
        'Transform home videos, licensed short films, and self-produced YouTube narratives by voicing the characters yourself, creating entertaining, humorous, or deeply personal retellings.',
      benefit: 'Expressive personal storytelling for authorized creator media.',
      sceneCue: 'Re-voicing travel logs, skits, and personal video journals.',
    },
    {
      id: 'authorized-dub',
      title: 'Authorized Dubbing & Localization',
      icon: Globe2,
      tag: 'ETHICAL LOCALIZATION',
      summary:
        'Content creators and global educators can release authorized foreign-language versions of their own material where their voice and cadence remain identifiable across territories.',
      benefit: 'Retains creator vocal identity across translated formats.',
      sceneCue: 'Educational webinars, documentary narration, and masterclasses.',
    },
    {
      id: 'accessible-media',
      title: 'Accessible & Personalized Media Experiences',
      icon: HeartHandshake,
      tag: 'ASSISTIVE TECHNOLOGY',
      summary:
        'Enabling family members, caregivers, and individuals with speech impairments to narrate educational books, family media, and accessible video narratives in a familiar, comforting voice.',
      benefit: 'Brings emotional warmth to assistive reading and narration.',
      sceneCue: 'Children’s storybook narration in a deployed parent’s voice.',
    },
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-[#08090C] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            Target Applications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Where Personal Voice Transforms Video
          </h2>
          <p className="mt-4 text-base text-slate-300/80 leading-relaxed">
            By pairing timing-locked delivery with explicit voice consent, Nolven Revoice unlocks new creative avenues for independent creators, storytellers, and authorized media producers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="p-7 sm:p-8 bg-[#0E1017] border border-white/[0.07] hover:border-violet-500/40 rounded-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/[0.03]">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-sm text-slate-300/85 leading-relaxed mb-6">
                    {c.summary}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.05] space-y-2">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400/80"></span>
                    <span className="text-slate-300 font-medium">Outcome:</span>
                    <span>{c.benefit}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Scenario: {c.sceneCue}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Partnerships */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Independent technology research prototype. Nolven Studio does not claim endorsements or partnerships with major Hollywood studios or SAG-AFTRA performers.
        </div>

      </div>
    </section>
  );
};
