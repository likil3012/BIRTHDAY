// Romantic Audio Engine supporting both HTML5 Audio for the user's uploaded song
// and Web Audio API for interactive celebration sound effects (chimes, sparkles, candles)

class RomanticAudioEngine {
  private bgmAudio: HTMLAudioElement | null = null;
  private sfxCtx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isPlayingSong: boolean = false;

  constructor() {
    // Pre-initialize audio element with the user's uploaded song
    if (typeof window !== 'undefined') {
      this.bgmAudio = new Audio('/romantic_song.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.65;
      this.bgmAudio.preload = 'auto';
    }
  }

  private initSfxContext() {
    if (!this.sfxCtx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.sfxCtx = new AudioCtx();
    }
    if (this.sfxCtx && this.sfxCtx.state === 'suspended') {
      this.sfxCtx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Starts the uploaded song continuously on loop (called on Enter click)
  public playSong(): void {
    this.isMuted = false;
    this.initSfxContext();

    if (this.bgmAudio) {
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.7;
      this.bgmAudio
        .play()
        .then(() => {
          this.isPlayingSong = true;
        })
        .catch((err) => {
          console.warn('Audio play request was handled or deferred:', err);
        });
    }
  }

  public pauseSong(): void {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.isPlayingSong = false;
    }
  }

  // Toggle play / pause for the floating audio controller
  public toggleMute(): boolean {
    if (this.isMuted || !this.isPlayingSong) {
      this.playSong();
      this.playSparkleSound();
      return false; // Not muted
    } else {
      this.pauseSong();
      this.isMuted = true;
      return true; // Muted
    }
  }

  // SFX: Dreamy sparkle chime
  public playSparkleSound() {
    this.initSfxContext();
    if (!this.sfxCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    const now = this.sfxCtx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.sfxCtx) return;
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.025, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.65);
    });
  }

  // SFX: Birthday Wish made
  public playWishChime() {
    this.initSfxContext();
    if (!this.sfxCtx) return;

    const chords = [392.0, 493.88, 587.33, 783.99, 987.77, 1174.66];
    const now = this.sfxCtx.currentTime;

    chords.forEach((freq, i) => {
      if (!this.sfxCtx) return;
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.001, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.05, now + i * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + i * 0.07 + 2.8);

      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 3.0);
    });
  }

  // SFX: Soft candle blow out
  public playCandleBlowSound() {
    this.initSfxContext();
    if (!this.sfxCtx) return;

    const bufferSize = this.sfxCtx.sampleRate * 1.2;
    const buffer = this.sfxCtx.createBuffer(1, bufferSize, this.sfxCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.sfxCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.sfxCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(380, this.sfxCtx.currentTime);
    filter.Q.setValueAtTime(2.0, this.sfxCtx.currentTime);

    const gain = this.sfxCtx.createGain();
    const now = this.sfxCtx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxCtx.destination);

    noise.start(now);
    noise.stop(now + 1.2);
  }

  // SFX: Opening letter
  public playLetterOpenSound() {
    this.initSfxContext();
    if (!this.sfxCtx) return;

    const harpNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    const now = this.sfxCtx.currentTime;

    harpNotes.forEach((freq, idx) => {
      if (!this.sfxCtx) return;
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.035, now + idx * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.6);

      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.8);
    });
  }

  // SFX: Fireworks launch
  public playFireworkSound() {
    this.initSfxContext();
    if (!this.sfxCtx) return;

    const now = this.sfxCtx.currentTime;
    const osc = this.sfxCtx.createOscillator();
    const gain = this.sfxCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxCtx.destination);

    osc.start(now);
    osc.stop(now + 0.5);

    setTimeout(() => {
      this.playSparkleSound();
    }, 180);
  }
}

export const romanticAudio = new RomanticAudioEngine();
