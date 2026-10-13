/**
 * Client-Side Audio Engine for Nolven Revoice Prototype
 * 
 * Provides:
 * 1. Real microphone capture with browser MediaRecorder API
 * 2. Real-time audio waveform / frequency spectrum data extraction
 * 3. Web Audio API synthesized cadence playback for Original vs Revoiced comparison
 * 4. Honest simulation labeling (no fake backend claims)
 */

import { DialogueSegment, VoiceProfile } from '../types';

export class PrototypeAudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private isSynthesizing = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.initContext();
    return this.analyser;
  }

  public setMasterVolume(vol: number) {
    this.initContext();
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  /**
   * Synthesize honest audible cadence reference for a dialogue segment.
   * Uses multi-formant audio synthesis to demonstrate pitch & temporal envelope locking.
   */
  public playSegmentCadence(
    segment: DialogueSegment,
    profile: VoiceProfile | null,
    isRevoiceMode: boolean
  ) {
    this.stopPlayback();
    this.initContext();
    if (!this.ctx || !this.gainNode) return;

    this.isSynthesizing = true;
    const now = this.ctx.currentTime;
    const duration = Math.max(0.5, segment.endTime - segment.startTime);

    // Determine base pitch
    let basePitch = 140; // Hz default
    if (isRevoiceMode && profile) {
      basePitch = profile.medianPitchHz;
    } else {
      // Original character pitch variation
      basePitch = segment.speaker.includes('David') || segment.speaker.includes('Director') ? 120 : 185;
      basePitch += segment.pitchOffset * 10;
    }

    // Create 3 formant oscillators for human vocal tract simulation (F0, F1, F2)
    const oscF0 = this.ctx.createOscillator();
    const oscF1 = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();

    const segGain = this.ctx.createGain();
    const filterF1 = this.ctx.createBiquadFilter();

    // Formant filter (vowel cavity)
    filterF1.type = 'bandpass';
    filterF1.frequency.setValueAtTime(isRevoiceMode ? 650 : 500, now);
    filterF1.Q.setValueAtTime(3.5, now);

    oscF0.type = 'sawtooth';
    oscF0.frequency.setValueAtTime(basePitch, now);
    // Subtle intonation inflection curve matching dialogue sentence ending
    oscF0.frequency.linearRampToValueAtTime(basePitch * 1.08, now + duration * 0.4);
    oscF0.frequency.linearRampToValueAtTime(basePitch * 0.88, now + duration * 0.95);

    oscF1.type = 'sine';
    oscF1.frequency.setValueAtTime(basePitch * 2, now);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(basePitch * 0.5, now);

    // Natural speech amplitude envelope (attack, syllables modulation, release)
    segGain.gain.setValueAtTime(0.0001, now);
    segGain.gain.linearRampToValueAtTime(0.28, now + 0.12);

    // Syllabic rhythmic pulses
    const syllables = Math.max(3, Math.min(10, segment.phonemes.length * 2));
    const step = duration / syllables;
    for (let i = 1; i < syllables; i++) {
      const t = now + i * step;
      segGain.gain.exponentialRampToValueAtTime(0.08, t - 0.04);
      segGain.gain.exponentialRampToValueAtTime(0.25, t);
    }

    segGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Connect nodes
    oscF0.connect(filterF1);
    filterF1.connect(segGain);

    oscF1.connect(segGain);
    subOsc.connect(segGain);

    segGain.connect(this.gainNode);

    oscF0.start(now);
    oscF1.start(now);
    subOsc.start(now);

    oscF0.stop(now + duration + 0.05);
    oscF1.stop(now + duration + 0.05);
    subOsc.stop(now + duration + 0.05);

    this.activeOscillators = [oscF0, oscF1, subOsc];

    setTimeout(() => {
      this.isSynthesizing = false;
    }, duration * 1000 + 100);
  }

  public stopPlayback() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.activeOscillators = [];
    this.isSynthesizing = false;
  }

  /**
   * Live Microphone Recording
   */
  public async startMicrophoneRecording(): Promise<{ stream: MediaStream; audioContext: AudioContext }> {
    this.initContext();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Microphone access is not supported by your browser.');
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    this.recordedChunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4'
      : '';

    this.mediaRecorder = mimeType
      ? new MediaRecorder(stream, { mimeType })
      : new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.start(100);

    return {
      stream,
      audioContext: this.ctx!,
    };
  }

  public stopMicrophoneRecording(): Promise<{ blob: Blob; url: string; durationSec: number }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No active recording session.'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder?.mimeType || 'audio/webm',
        });
        const url = URL.createObjectURL(blob);
        resolve({
          blob,
          url,
          durationSec: Math.max(1, Math.round(this.recordedChunks.length * 0.1)),
        });
        this.recordedChunks = [];
      };

      this.mediaRecorder.stop();
      // stop stream tracks
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    });
  }

  /**
   * Helper to format SMPTE Timecode (hh:mm:ss:ff at 24fps)
   */
  public static formatTimecode(seconds: number): string {
    const totalFrames = Math.floor(seconds * 24);
    const ff = String(totalFrames % 24).padStart(2, '0');
    const ss = String(Math.floor(seconds) % 60).padStart(2, '0');
    const mm = String(Math.floor(seconds / 60) % 60).padStart(2, '0');
    const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
    return `${hh}:${mm}:${ss}:${ff}`;
  }
}

export const audioEngine = new PrototypeAudioEngine();
