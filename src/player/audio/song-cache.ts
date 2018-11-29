import { ISongMetadata } from '../../shared/audio/common/song';
import {
  GET_SONG_METADATA,
  ISongCache,
  LOAD_FROM_FILE_COMMAND,
} from '../../shared/audio/common/song-cache';
import RpcClient from '../../shared/ipc/node/rpc-client';

export default class SongCacheChannel implements ISongCache {
  constructor(
    private rpcClient: RpcClient,
  ) {}

  loadFromFile = async (filePath: string, id?: string): Promise<ISongMetadata> => {
    const result = await this.rpcClient.execute(LOAD_FROM_FILE_COMMAND, filePath, id) as ISongMetadata;
    return result;
  }

  getSongMetadata = async (id: string): Promise<ISongMetadata> => {
    const result = await this.rpcClient.execute(GET_SONG_METADATA, id) as ISongMetadata;
    return result;
  }
}
