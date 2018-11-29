import { readFile } from 'fs';

import { ISongMetadata } from '../../shared/audio/common/song';

export interface ICachedSong {
  id: string;
  filePath: string;
  buffer: AudioBuffer;
  metadata: ISongMetadata;
}

export default class SongCache {
  private cache: Map<string, ICachedSong> = new Map();

  constructor(
    private audioContext: AudioContext,
  ) {}

  async loadSong(filePath: string, id?: string): Promise<ISongMetadata> {
    const content = await new Promise<Buffer>((resolve, reject) => {
      readFile(filePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });

    const buffer = await this.audioContext.decodeAudioData(content.buffer);

    const metadata = {
      filePath,
      id: id ? id : filePath,
    };

    const song = {
      buffer,
      filePath,
      id: metadata.id,
      metadata,
    };

    this.cache.set(song.id, song);

    return metadata;
  }

  getSong(id: string): ICachedSong {
    return this.cache.get(id);
  }

}
