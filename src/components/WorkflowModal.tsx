import React from 'react';
import { X, ShieldCheck, Mic2, Cpu, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDemo: () => void;
}

export const WorkflowModal: React.FC<WorkflowModalProps> = ({ isOpen, onClose, onStartDemo }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Consent & Rights Attestation',
      icon: ShieldCheck,
      description:
        'Upload only authorized footage—videos you created, own, or have explicit licensing permissions to adapt. Nolven enforces cryptographic voice consent signatures to prevent non-consensual deepfakes.',
      details: ['User-owned or licensed media check', 'Voice identity consent authorization', 'Zero scraping of public celebrity voices'],
    },
    {
      num: '02',
      title: 'Voice Sample Calibration',
      icon: Mic2,
      description:
        'Provide a 15–30 second lossless audio recording of your natural speaking voice. The calibration engine extracts median pitch (F0), formant dispersion (F1/F2), and dynamic articulation curves.',
      details: ['Lossless 48kHz audio capture', 'Acoustic feature space mapping', 'No retention of raw biometric files on public servers'],
    },
    {
      num: '03',
      title: 'Dialogue Timing & Pause Alignment',
      icon: Cpu,
      description:
        'The scene dialogue is broken into micro-segments. Sub-frame phoneme boundaries, breath cues, and emotional cadence curves are locked to match the on-screen performance exactly.',
      details: ['Sub-frame lip-sync temporal lock', 'Preserves intentional dramatic pauses', 'Emotional pitch modulation extraction'],
    },
    {
      num: '04',
      title: 'Stem Preview & Acoustic Convolving',
      icon: SlidersHorizontal,
      description:
        'Audition adapted dialogue tracks against the original room acoustics. Adjust cadence strictness, reverb wetness, and breath retention before exporting studio-ready stems.',
      details: ['Room impulse response (RIR) convolution', 'Exportable standard WAV/OMF dialogue stems', 'Full A/B comparison for director sign-off'],
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workflow-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0E1017] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-1">
              Architecture & Product Blueprint
            </div>
            <h2 id="workflow-modal-title" className="text-xl sm:text-2xl font-bold text-white">
              The Nolven Revoice Workflow
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors focus-visible:outline-2 focus-visible:outline-violet-400"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="my-5 p-4 bg-violet-950/20 border border-violet-500/20 rounded-xl text-xs sm:text-sm text-slate-300 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0 mt-1.5" />
          <div>
            <span className="font-semibold text-white">Transparent Development Note: </span>
            This interactive walkthrough illustrates our planned end-to-end production pipeline. The browser prototype currently simulates acoustic mapping and timing alignment locally. Full neural voice synthesis will connect to Nolven's dedicated processing cluster as our models graduate from internal trials.
          </div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-6 pt-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 sm:p-5 bg-[#121520] border border-white/[0.06] rounded-xl hover:border-violet-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400 font-mono text-sm font-semibold">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">{step.num}</span>
                      <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400/80 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartDemo();
            }}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors shadow-lg shadow-violet-600/20 cursor-pointer"
          >
            Audition in Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
