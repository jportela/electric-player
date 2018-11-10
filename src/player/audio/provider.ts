
interface ITrack {
  element: HTMLAudioElement;
  track: MediaElementAudioSourceNode;
}

export default class AudioProvider {
  private domNodes: Map<string, ITrack>;
  private domContainer: string = 'audio-container';
  private audioContext: AudioContext;

  constructor() {
    this.domNodes = new Map<string, ITrack>();
    this.audioContext = new AudioContext();
  }

  addNode(key: string, filePath: string) {
    const audioElement = document.createElement('audio');
    audioElement.src = filePath;
    audioElement.setAttribute('type', 'audio/mpg');
    const container = document.getElementById(this.domContainer);
    container.appendChild(audioElement);
    if (this.domNodes.has(key)) {
      const oldElement = this.domNodes.get(key);
      container.removeChild(oldElement.element);
    }

    const track = this.audioContext.createMediaElementSource(audioElement);

    track.connect(this.audioContext.destination);

    this.domNodes.set(key, {
      element: audioElement,
      track,
    });
  }

  play(key: string) {
    // check if context is in suspended state (autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const audioElement = this.domNodes.get(key);

    audioElement.element.play();
  }

  pause(key: string) {

    const audioElement = this.domNodes.get(key);

    audioElement.element.pause();
  }
}
