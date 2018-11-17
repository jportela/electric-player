import { readFile } from 'fs';
import AudioProvider from './provider';

export interface ISongMetadata {
  year: number;
  title: string;
  artist: string;
  album: string;
}

export default class Song {
  private source: AudioBufferSourceNode;
  private buffer: AudioBuffer;
  private playStartTime: number;
  private lastTime: number = 0;

  constructor(private audioProvider: AudioProvider) {
  }

  async loadFile(filePath: string): Promise<void> {
    const content = await new Promise<Buffer>((resolve, reject) => {
      readFile(filePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
    this.buffer = await this.audioProvider.loadAudioBuffer(content.buffer);
  }

  refreshBuffer() {
    this.source = this.audioProvider.loadSource(this.buffer);
    this.audioProvider.connectSource(this.source);
  }

  play() {
    this.refreshBuffer();
    this.audioProvider.play();
    const seek = Math.max(0, this.lastTime);
    this.source.start(0, seek);
    this.playStartTime = this.audioProvider.currentTime;
  }

  pause() {
    this.source.stop(0);
    this.audioProvider.disconnectSource(this.source);
    this.source = null;
    this.lastTime += this.audioProvider.currentTime - this.playStartTime;
  }

  stop() {
    this.source.stop(0);
    this.audioProvider.disconnectSource(this.source);
    this.source = null;
    this.lastTime = 0;
  }

}
