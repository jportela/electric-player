import { ISongMetadata } from './song';

export interface ISongCache {
  loadFromFile(filePath: string, id?: string): Promise<ISongMetadata>;
  getSongMetadata(id: string): Promise<ISongMetadata>;
}

export const LOAD_FROM_FILE_COMMAND = 'load-from-file';
export const GET_SONG_METADATA = 'get-song-metadata';
