import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'CURRENT STATUS',
      question: 'Is Nolven Revoice already a fully functional production product?',
      answer:
        'No. Nolven Revoice is currently an early-stage research prototype and technology demonstration. The interactive workspace on this website demonstrates our dialogue segmentation, timing alignment, and acoustic modeling principles directly in your browser. A production-grade neural conversion engine running on dedicated compute infrastructure is in active engineering development.',
    },
    {
      category: 'VOICE SAMPLES',
      question: 'What kind of voice sample is required, and how long does it take?',
      answer:
        'When fully supported, the engine will require approximately 15 to 30 seconds of clean, uncompressed speech recorded in a quiet environment. We recommend reading a standard calibration phoneme text at conversational volume. The engine calibrates pitch range, vowel formants, and resonance curves.',
    },
    {
      category: 'PERMISSIONS & RIGHTS',
      question: 'Can I upload any movie or copyrighted film dialogue?',
      answer:
        'No. Nolven Studio strictly requires that users upload videos they own, created, or possess explicit legal authorization to adapt. We do not permit uploading unauthorized commercial theatrical films, television broadcasts, or third-party videos without rights clearance.',
    },
    {
      category: 'ETHICS & CONSENT',
      question: 'How do you prevent non-consensual voice cloning or deepfakes?',
      answer:
        'We enforce strict cryptographic identity verification and active voice consent attestations prior to profile generation. Our platform will not process requests attempting to emulate public figures, celebrities, or individuals who have not explicitly authorized their voice biometrics.',
    },
    {
      category: 'PRIVACY & DATA',
      question: 'Are my audio recordings or videos uploaded to public servers?',
      answer:
        'In this web prototype, all audio recording and synthesis happens locally inside your browser using the HTML5 MediaRecorder and Web Audio APIs; no audio or video is stored or transmitted. In our upcoming cloud engine, audio data will be encrypted in transit and at rest, processed in isolated secure enclaves, and deleted upon stem delivery unless explicitly archived by the user.',
    },
    {
      category: 'PERFORMANCE',
      question: 'How does the system preserve emotional delivery and pauses?',
      answer:
        'Rather than executing generic text-to-speech, Nolven Revoice decomposes the original performance into micro-cadence vectors—capturing vocal fry, emotional tension, syllable elongation, breath intakes, and precise silence durations—and forces the adapted voice to conform to these exact temporal boundaries.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#08090C] border-b border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">
            Transparency & Clarity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Answered Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Honest answers regarding our technology status, data privacy standards, and creative philosophy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#0E1017] border border-white/[0.07] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-violet-400 tracking-wider block mb-1">
                      {faq.category}
                    </span>
                    <span className="text-base font-semibold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-violet-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-300/85 leading-relaxed border-t border-white/[0.04] pt-4 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
