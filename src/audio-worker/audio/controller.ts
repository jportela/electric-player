import SongCache, { ICachedSong } from './song-cache';

interface ITrack {
  element: HTMLAudioElement;
  track: MediaElementAudioSourceNode;
}

export default class AudioController {

  private currentSong: ICachedSong;
  private currentSource: AudioBufferSourceNode;

  constructor(
    private audioContext: AudioContext,
    private songCache: SongCache,
  ) {}

  playSong(id: string, seek?: number) {
    const song = this.songCache.getSong(id);
    if (!song) {
      return;
    }

    this.stopCurrentSong();

    const source = this.audioContext.createBufferSource();
    source.buffer = song.buffer;
    source.connect(this.audioContext.destination);

    this.currentSong = song;
    this.currentSource = source;

    this.play();

    source.start(0, Math.max(0, seek || 0));
  }

  stopCurrentSong() {
    if (this.currentSource) {
      this.currentSource.stop(0);
      this.currentSource.disconnect();
      this.currentSource = null;
      this.currentSong = null;
    }
  }

  loadSource(buffer: AudioBuffer) {
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    return source;
  }

  connectSource(source: AudioBufferSourceNode) {
    source.connect(this.audioContext.destination);
  }

  disconnectSource(source: AudioBufferSourceNode) {
    source.disconnect();
  }

  get currentTime() {
    return this.audioContext.currentTime;
  }

  play() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
