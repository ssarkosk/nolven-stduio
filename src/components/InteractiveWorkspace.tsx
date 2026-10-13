import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, Mic, MicOff, Upload, 
  Sliders, Info, Check, Shield, Film, Waves, Sparkles, 
  ChevronRight, VolumeX, AlertCircle, Headphones
} from 'lucide-react';
import { SAMPLE_SCENES, PRESET_VOICE_PROFILES } from '../data/mockScenes';
import { SampleScene, DialogueSegment, VoiceProfile, PlaybackMode } from '../types';
import { audioEngine, PrototypeAudioEngine } from '../utils/audioEngine';
import { WorkflowModal } from './WorkflowModal';

export const InteractiveWorkspace: React.FC = () => {
  // State
  const [scenes, setScenes] = useState<SampleScene[]>(SAMPLE_SCENES);
  const [selectedScene, setSelectedScene] = useState<SampleScene>(SAMPLE_SCENES[0]);
  const [selectedSegment, setSelectedSegment] = useState<DialogueSegment>(SAMPLE_SCENES[0].dialogueSegments[0]);
  
  // Voice profiles
  const [voiceProfiles, setVoiceProfiles] = useState<VoiceProfile[]>(PRESET_VOICE_PROFILES);
  const [activeProfile, setActiveProfile] = useState<VoiceProfile>(PRESET_VOICE_PROFILES[1]); // Marcus default
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('revoiced');
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(true);
  
  // Custom video file
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);

  // Microphone recording
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordingError, setRecordingError] = useState<string | null>(null);

  // Workflow Modal
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState<boolean>(false);

  // Segment interactive adjustment sliders
  const [cadenceStrictness, setCadenceStrictness] = useState<number>(98);
  const [pitchOffset, setPitchOffset] = useState<number>(selectedSegment.pitchOffset);
  const [breathRetention, setBreathRetention] = useState<number>(85);
  const [reverbWetness, setReverbWetness] = useState<number>(30);

  // Audio animation frame
  const animFrameRef = useRef<number | null>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  // Update pitch offset when selected segment changes
  useEffect(() => {
    setPitchOffset(selectedSegment.pitchOffset);
  }, [selectedSegment]);

  // Scene selection handler
  const handleSelectScene = (scene: SampleScene) => {
    audioEngine.stopPlayback();
    setIsPlaying(false);
    setCurrentTime(0);
    setSelectedScene(scene);
    setSelectedSegment(scene.dialogueSegments[0]);
  };

  // Playback timer loop
  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      const stepMs = 50;
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + stepMs / 1000;
          if (next >= selectedScene.duration) {
            if (loop) {
              return 0;
            } else {
              setIsPlaying(false);
              return selectedScene.duration;
            }
          }
          return next;
        });
      }, stepMs);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, selectedScene.duration, loop]);

  // Audio volume change
  useEffect(() => {
    audioEngine.setMasterVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // Identify active dialogue line at currentTime
  const activeDialogue = selectedScene.dialogueSegments.find(
    (seg) => currentTime >= seg.startTime && currentTime <= seg.endTime
  );

  // Handle Play / Pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audioEngine.stopPlayback();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // If at end, restart
      if (currentTime >= selectedScene.duration - 0.2) {
        setCurrentTime(0);
      }
      // If inside a segment or near one, audition cadence
      if (selectedSegment) {
        audioEngine.playSegmentCadence(
          selectedSegment,
          activeProfile,
          playbackMode === 'revoiced'
        );
      }
    }
  };

  // Handle Audition Single Segment
  const handleAuditionSegment = (seg: DialogueSegment) => {
    setSelectedSegment(seg);
    setCurrentTime(seg.startTime);
    audioEngine.playSegmentCadence(
      seg,
      activeProfile,
      playbackMode === 'revoiced'
    );
  };

  // Microphone recording handlers
  const startRecordingVoice = async () => {
    setRecordingError(null);
    try {
      await audioEngine.startMicrophoneRecording();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Microphone access denied';
      setRecordingError(errorMsg);
      setIsRecording(false);
    }
  };

  const stopRecordingVoice = async () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);
    try {
      const { url, durationSec } = await audioEngine.stopMicrophoneRecording();
      const newProfile: VoiceProfile = {
        id: `vp-user-${Date.now()}`,
        name: 'My Calibrated Voice',
        type: 'recorded',
        genderDescription: 'Custom Microphone Profile',
        medianPitchHz: 148,
        harmonicRatio: 0.89,
        sampleDurationSec: durationSec,
        timbreDescription: 'Direct browser capture. Normalized acoustic envelope.',
        audioBlobUrl: url,
        status: 'ready',
      };
      setVoiceProfiles((prev) => [newProfile, ...prev]);
      setActiveProfile(newProfile);
    } catch (err) {
      console.error(err);
    }
  };

  // Custom user video / audio upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      // Create user scene
      const customScene: SampleScene = {
        id: `scene-custom-${Date.now()}`,
        title: file.name.substring(0, 24),
        category: 'Authorized User Media',
        duration: 20.0,
        aspectRatio: '16:9',
        imagePath: '/src/assets/images/hero_cinematic_soundstage_1791930267494.jpg',
        synopsis: 'Locally loaded media file for timeline extraction and dialogue calibration.',
        acousticEnvironment: 'User Local Source · Pending Convolving',
        dialogueSegments: [
          {
            id: 'seg-custom-1',
            speaker: 'Lead Voice Track',
            text: 'Extracted primary dialogue region from user uploaded clip.',
            startTime: 2.0,
            endTime: 7.5,
            emotionalTone: 'Natural Conversational',
            pauseAfterMs: 1200,
            pitchOffset: 0.0,
            cadenceMatchScore: 98.0,
            phonemes: ['u-z-e-r', 'd-a-i-a-l-o-g', 's-e-g-m-e-n-t'],
            originalAudioCue: 'Extracted from user audio channel',
          },
        ],
      };
      setScenes((prev) => [customScene, ...prev]);
      setSelectedScene(customScene);
      setSelectedSegment(customScene.dialogueSegments[0]);
    }
  };

  // Audio file upload for voice sample
  const handleVoiceSampleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newProfile: VoiceProfile = {
        id: `vp-upload-${Date.now()}`,
        name: file.name.substring(0, 18),
        type: 'custom',
        genderDescription: 'Uploaded Lossless Master',
        medianPitchHz: 152,
        harmonicRatio: 0.91,
        sampleDurationSec: 20,
        timbreDescription: 'Imported audio stem. Clean vocal isolation profile.',
        audioBlobUrl: url,
        status: 'ready',
      };
      setVoiceProfiles((prev) => [newProfile, ...prev]);
      setActiveProfile(newProfile);
    }
  };

  return (
    <section 
      id="interactive-workspace" 
      className="py-16 md:py-24 bg-[#0A0C11] border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Workspace Title & Prototype Mode Notice */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-violet-400/80"></span>
              <span>PROTOTYPE WORKSPACE</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">SIMULATION ENGINE v0.4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Nolven Revoice Studio Workspace
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Audition dialogue timing, phoneme synchronization, and cadence adaptation across authorized video scenes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWorkflowModalOpen(true)}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-violet-400" />
              <span>Explore Workflow Blueprint</span>
            </button>
          </div>
        </div>

        {/* Prototype Transparency Banner */}
        <div className="mb-8 p-3.5 bg-[#12141F] border border-violet-500/20 rounded-xl flex items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-400 shrink-0 mt-1 sm:mt-0" />
            <div>
              <span className="font-semibold text-white">Interactive Prototype: </span>
              Demonstrates acoustic alignment, timing preservation, and cadence mapping using local browser synthesis. Full neural voice model training will connect to Nolven's authorized inference cluster in production.
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500 shrink-0 hidden md:block">
            NO FAKE BACKEND · LOCAL DEMO
          </div>
        </div>

        {/* Studio Workspace Container */}
        <div className="bg-[#0C0E14] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Top Bar: Scene Picker & Session Status */}
          <div className="px-5 py-3.5 bg-[#10131B] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
            
            {/* Scene Selector Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-mono text-[11px] mr-1">SCENE:</span>
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleSelectScene(scene)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedScene.id === scene.id
                      ? 'bg-violet-600/30 text-white border border-violet-500/40'
                      : 'text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  {scene.title}
                </button>
              ))}

              {/* Upload user media button */}
              <label className="px-3 py-1.5 rounded-md font-medium text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-dashed border-white/10 cursor-pointer flex items-center gap-1.5">
                <Upload className="w-3 h-3 text-slate-400" />
                <span>Load Local Clip</span>
                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Timecode & Sync Metric */}
            <div className="flex items-center gap-4 font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">TC:</span>
                <span className="text-white font-semibold tabular-nums">
                  {PrototypeAudioEngine.formatTimecode(currentTime)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">SYNC LOCK:</span>
                <span className="text-violet-400 font-semibold tabular-nums">
                  {selectedSegment.cadenceMatchScore}%
                </span>
              </div>
            </div>

          </div>

          {/* Main Workspace Split: Monitor (Left) & Controls (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/[0.06]">
            
            {/* Left 7 Cols: Cinematic Video Monitor & Subtitle Canvas */}
            <div className="lg:col-span-7 p-4 sm:p-6 bg-[#08090D] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              
              {/* Cinema Frame Screen */}
              <div className="relative aspect-[2.39/1] sm:aspect-video w-full bg-black rounded-xl overflow-hidden border border-white/10 shadow-lg">
                
                {customVideoUrl ? (
                  <video
                    ref={videoElementRef}
                    src={customVideoUrl}
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                ) : (
                  <img
                    src={selectedScene.imagePath}
                    alt={selectedScene.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Cinema Letterbox Matte effect */}
                <div className="absolute inset-0 border-[6px] sm:border-[8px] border-black/40 pointer-events-none" />

                {/* Live Subtitle Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                  {activeDialogue ? (
                    <div className="inline-block px-4 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-md text-sm sm:text-base font-semibold text-white drop-shadow-md animate-in fade-in duration-150">
                      <span className="text-violet-400 text-xs font-mono mr-2">
                        [{activeDialogue.speaker}]
                      </span>
                      "{activeDialogue.text}"
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-500 italic">
                      [Scene Atmosphere · {selectedScene.acousticEnvironment}]
                    </div>
                  )}
                </div>

                {/* Top-Right Playback Mode Watermark */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-[10px] font-mono border border-white/10 text-slate-300">
                  {playbackMode === 'revoiced' && 'NOLVEN REVOICE (ACTIVE)'}
                  {playbackMode === 'original' && 'ORIGINAL ADR STEM'}
                  {playbackMode === 'ab-split' && 'A/B SPLIT AUDITION'}
                </div>
              </div>

              {/* Monitor Transport Controls */}
              <div className="mt-4 pt-3 flex flex-col gap-3">
                
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-400 tabular-nums w-12 text-right">
                    {currentTime.toFixed(1)}s
                  </span>
                  
                  <div className="relative flex-1 flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={selectedScene.duration}
                      step={0.1}
                      value={currentTime}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setCurrentTime(val);
                        // If near segment, select it
                        const seg = selectedScene.dialogueSegments.find(
                          (s) => val >= s.startTime - 0.5 && val <= s.endTime + 0.5
                        );
                        if (seg) setSelectedSegment(seg);
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 tabular-nums w-12">
                    {selectedScene.duration.toFixed(1)}s
                  </span>
                </div>

                {/* Transport Buttons & Mode Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  
                  {/* Left: Play/Pause, Rewind, Loop */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlayPause}
                      className="w-9 h-9 rounded-lg bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md shadow-violet-600/30"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTime(0);
                        audioEngine.stopPlayback();
                        setIsPlaying(false);
                      }}
                      className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                      title="Rewind to start"
                      aria-label="Rewind to start"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setLoop(!loop)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        loop ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-500 bg-white/[0.02]'
                      }`}
                    >
                      LOOP
                    </button>
                  </div>

                  {/* Center: A/B Mode Toggle */}
                  <div className="flex items-center bg-[#131622] p-1 rounded-lg border border-white/[0.06] text-xs">
                    <button
                      onClick={() => setPlaybackMode('original')}
                      className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                        playbackMode === 'original'
                          ? 'bg-white/10 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Original Actor
                    </button>
                    <button
                      onClick={() => setPlaybackMode('revoiced')}
                      className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                        playbackMode === 'revoiced'
                          ? 'bg-violet-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Nolven Revoiced
                    </button>
                    <button
                      onClick={() => setPlaybackMode('ab-split')}
                      className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                        playbackMode === 'ab-split'
                          ? 'bg-sky-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      A/B Audition
                    </button>
                  </div>

                  {/* Right: Volume Slider */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-slate-400 hover:text-white"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                </div>
              </div>

            </div>

            {/* Right 5 Cols: Voice Profile Calibrator & Segment Inspector */}
            <div className="lg:col-span-5 p-4 sm:p-6 bg-[#0E1017] flex flex-col justify-between space-y-6">
              
              {/* Voice Calibration Box */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
                    <Mic className="w-3.5 h-3.5 text-violet-400" />
                    <span>Personal Voice Calibration</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    48kHz · Lossless
                  </span>
                </div>

                {/* Active Profile Card */}
                <div className="p-3 bg-[#131622] border border-white/[0.08] rounded-xl mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{activeProfile.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300">
                          {activeProfile.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{activeProfile.genderDescription}</p>
                    </div>

                    {/* Acoustic Metrics */}
                    <div className="text-right font-mono text-[11px]">
                      <div className="text-violet-300 tabular-nums">F0 ~ {activeProfile.medianPitchHz} Hz</div>
                      <div className="text-slate-500 tabular-nums">HNR {(activeProfile.harmonicRatio * 100).toFixed(0)}%</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed border-t border-white/[0.04] pt-2">
                    {activeProfile.timbreDescription}
                  </p>

                  {/* If user recorded audio, provide audio playback */}
                  {activeProfile.audioBlobUrl && (
                    <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="text-slate-400">Recorded Sample Audio:</span>
                      <audio controls src={activeProfile.audioBlobUrl} className="h-6 w-44" />
                    </div>
                  )}
                </div>

                {/* Profile Selector & Mic Action */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  
                  {/* Record Voice Button */}
                  {isRecording ? (
                    <button
                      onClick={stopRecordingVoice}
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 animate-pulse cursor-pointer shadow-lg shadow-red-600/30"
                    >
                      <MicOff className="w-3.5 h-3.5" />
                      <span>Stop ({recordingSeconds}s)</span>
                    </button>
                  ) : (
                    <button
                      onClick={startRecordingVoice}
                      className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Record Mic Sample</span>
                    </button>
                  )}

                  {/* Upload Voice Stem */}
                  <label className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>Upload Audio</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleVoiceSampleUpload}
                      className="hidden"
                    />
                  </label>

                </div>

                {recordingError && (
                  <div className="mt-2 p-2 bg-red-950/30 border border-red-500/20 rounded text-[11px] text-red-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{recordingError}</span>
                  </div>
                )}

                {/* Presets List */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-slate-500 mr-1">PRESETS:</span>
                  {voiceProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProfile(p)}
                      className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                        activeProfile.id === p.id
                          ? 'bg-violet-500/30 text-white border border-violet-500/50'
                          : 'text-slate-400 hover:text-white bg-white/[0.02]'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Segment Tuning Parameters */}
              <div className="border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-sky-400" />
                    <span>Segment Synchronization Engine</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    LOCK: {cadenceStrictness}%
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Cadence Strictness */}
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Cadence Lock Strictness</span>
                      <span className="font-mono text-violet-300">{cadenceStrictness}%</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={100}
                      value={cadenceStrictness}
                      onChange={(e) => setCadenceStrictness(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  {/* Pitch Shift Offset */}
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Intonation / Pitch Shift</span>
                      <span className="font-mono text-violet-300">
                        {pitchOffset > 0 ? `+${pitchOffset}` : pitchOffset} st
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-6}
                      max={6}
                      step={0.5}
                      value={pitchOffset}
                      onChange={(e) => setPitchOffset(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-violet-500"
                    />
                  </div>

                  {/* Breath & Pause Retention */}
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Breath & Pause Retention</span>
                      <span className="font-mono text-sky-300">{breathRetention}% ({selectedSegment.pauseAfterMs}ms lock)</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={breathRetention}
                      onChange={(e) => setBreathRetention(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-500"
                    />
                  </div>
                </div>

                {/* Audition Segment Button */}
                <button
                  onClick={() => handleAuditionSegment(selectedSegment)}
                  className="mt-4 w-full py-2.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 hover:text-white border border-violet-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Audition Active Segment Cadence</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Panel: DAW-Style Multi-Track Dialogue Timeline */}
          <div className="p-4 sm:p-6 bg-[#0B0D13]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-violet-400" />
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Dialogue Track Timeline & Micro-Cadence Segments
                </h3>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Click segment to inspect alignment
              </div>
            </div>

            {/* Timeline Ruler */}
            <div className="relative h-6 border-b border-white/[0.08] mb-2 flex items-center text-[10px] font-mono text-slate-500">
              {[0, 3, 6, 9, 12, 15, 18].map((sec) => (
                <div
                  key={sec}
                  className="absolute"
                  style={{ left: `${(sec / selectedScene.duration) * 100}%` }}
                >
                  <span>{sec}s</span>
                  <div className="w-px h-1.5 bg-slate-700 mt-0.5" />
                </div>
              ))}

              {/* Scrubber Playhead Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-violet-400 z-20 pointer-events-none transition-all duration-75"
                style={{ left: `${(currentTime / selectedScene.duration) * 100}%` }}
              >
                <div className="w-2.5 h-2.5 -ml-1 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              </div>
            </div>

            {/* Track 1: Original ADR Dialogue Track */}
            <div className="mb-2 p-2 bg-[#0E1119] rounded-lg border border-white/[0.04]">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  <span>TRACK 01: ORIGINAL ACTOR ADR</span>
                </span>
                <span className="text-slate-500">LIP-SYNC REFERENCE</span>
              </div>

              <div className="relative h-12 bg-[#08090E] rounded border border-white/[0.04] overflow-hidden">
                {selectedScene.dialogueSegments.map((seg) => {
                  const leftPercent = (seg.startTime / selectedScene.duration) * 100;
                  const widthPercent = ((seg.endTime - seg.startTime) / selectedScene.duration) * 100;
                  const isSelected = selectedSegment.id === seg.id;

                  return (
                    <div
                      key={seg.id}
                      onClick={() => handleAuditionSegment(seg)}
                      className={`absolute top-1 bottom-1 rounded px-2 py-1 cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-slate-700/80 border-slate-400 text-white shadow-md'
                          : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-700/60'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                      title={seg.text}
                    >
                      <div className="text-[10px] font-mono truncate font-medium">
                        {seg.speaker}
                      </div>
                      <div className="text-[9px] truncate opacity-80">
                        "{seg.text}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Track 2: Nolven Revoice Adapted Stem Track */}
            <div className="p-2 bg-[#0E1119] rounded-lg border border-violet-500/10">
              <div className="flex items-center justify-between text-[11px] font-mono text-violet-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                  <span>TRACK 02: NOLVEN REVOICE ADAPTATION</span>
                </span>
                <span className="text-slate-400">ACTIVE PROFILE: {activeProfile.name}</span>
              </div>

              <div className="relative h-12 bg-[#08090E] rounded border border-white/[0.04] overflow-hidden">
                {selectedScene.dialogueSegments.map((seg) => {
                  const leftPercent = (seg.startTime / selectedScene.duration) * 100;
                  const widthPercent = ((seg.endTime - seg.startTime) / selectedScene.duration) * 100;
                  const isSelected = selectedSegment.id === seg.id;

                  return (
                    <div
                      key={seg.id}
                      onClick={() => handleAuditionSegment(seg)}
                      className={`absolute top-1 bottom-1 rounded px-2 py-1 cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-violet-600/80 border-violet-300 text-white shadow-lg shadow-violet-600/30'
                          : 'bg-violet-950/50 border-violet-800/40 text-violet-200 hover:bg-violet-900/60'
                      }`}
                      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                      title={seg.text}
                    >
                      <div className="text-[10px] font-mono truncate font-semibold flex items-center justify-between">
                        <span>{seg.emotionalTone}</span>
                        <span className="text-[9px] opacity-75">{seg.cadenceMatchScore}%</span>
                      </div>
                      <div className="text-[9px] truncate opacity-90">
                        {seg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Selected Segment Inspector */}
            <div className="mt-4 p-4 bg-[#11141E] rounded-xl border border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-slate-500 font-mono text-[10px] mb-1">SELECTED SEGMENT LINE</div>
                <div className="font-semibold text-white text-sm">"{selectedSegment.text}"</div>
                <div className="text-slate-400 mt-1">Speaker: {selectedSegment.speaker}</div>
              </div>

              <div>
                <div className="text-slate-500 font-mono text-[10px] mb-1">CADENCE & EMOTIONAL PROFILE</div>
                <div className="text-violet-300 font-medium">{selectedSegment.emotionalTone}</div>
                <div className="text-slate-400 mt-1">{selectedSegment.originalAudioCue}</div>
              </div>

              <div>
                <div className="text-slate-500 font-mono text-[10px] mb-1">PHONEME TEMPORAL MAP</div>
                <div className="flex flex-wrap gap-1">
                  {selectedSegment.phonemes.map((ph, idx) => (
                    <span key={idx} className="font-mono text-[10px] px-1.5 py-0.5 bg-white/[0.05] rounded text-slate-300">
                      /{ph}/
                    </span>
                  ))}
                </div>
                <div className="text-slate-500 text-[10px] font-mono mt-1">
                  Pause locked: {selectedSegment.pauseAfterMs}ms
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Workflow Explainer Modal */}
      <WorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        onStartDemo={() => {
          handleAuditionSegment(selectedScene.dialogueSegments[0]);
        }}
      />
    </section>
  );
};
