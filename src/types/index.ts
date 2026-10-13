export interface DialogueSegment {
  id: string;
  speaker: string;
  text: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  emotionalTone: string;
  pauseAfterMs: number;
  pitchOffset: number; // semitones
  cadenceMatchScore: number; // 0-100%
  phonemes: string[];
  originalAudioCue: string;
}

export interface SampleScene {
  id: string;
  title: string;
  category: string;
  duration: number; // in seconds
  aspectRatio: string;
  imagePath: string;
  synopsis: string;
  dialogueSegments: DialogueSegment[];
  acousticEnvironment: string; // e.g. "Concrete Atrium / Wet Reverb"
}

export interface VoiceProfile {
  id: string;
  name: string;
  type: 'custom' | 'preset' | 'recorded';
  genderDescription: string;
  medianPitchHz: number;
  harmonicRatio: number;
  sampleDurationSec: number;
  timbreDescription: string;
  audioBlobUrl?: string;
  status: 'ready' | 'recording' | 'analyzing';
}

export type PlaybackMode = 'original' | 'revoiced' | 'ab-split';
