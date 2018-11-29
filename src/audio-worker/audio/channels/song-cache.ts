import { ISongMetadata } from '../../../shared/audio/common/song';
import {
  GET_SONG_METADATA,
  ISongCache,
  LOAD_FROM_FILE_COMMAND,
} from '../../../shared/audio/common/song-cache';
import RpcServer from '../../../shared/ipc/node/rpc-server';
import SongCache from '../song-cache';

export default class SongCacheChannel implements ISongCache {
  constructor(
    private rpcServer: RpcServer,
    private songCache: SongCache,
  ) {}

  registerListeners() {
    this.rpcServer.registerCommand(LOAD_FROM_FILE_COMMAND, this.loadFromFile);
    this.rpcServer.registerCommand(GET_SONG_METADATA, this.getSongMetadata);
  }

  loadFromFile = async (filePath: string, id?: string): Promise<ISongMetadata> => {
    return this.songCache.loadSong(filePath, id);
  }

  getSongMetadata = async (id: string): Promise<ISongMetadata> => {
    return this.songCache.getSong(id);
  }
}
