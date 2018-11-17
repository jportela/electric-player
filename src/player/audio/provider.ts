
interface ITrack {
  element: HTMLAudioElement;
  track: MediaElementAudioSourceNode;
}

export default class AudioProvider {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }

  async loadAudioBuffer(buffer: ArrayBuffer) {
    return this.audioContext.decodeAudioData(buffer);
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
