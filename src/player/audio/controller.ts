import {
  IAudioController,
  IStopResult,
  PLAY_SONG_COMMAND,
  STOP_COMMAND,
} from '../../shared/audio/common/controller';
import RpcClient from '../../shared/ipc/node/rpc-client';

export default class AudioControllerChannel implements IAudioController {
  constructor(
    private rpcClient: RpcClient,
  ) {}

  playSong = async (id: string, seek?: number): Promise<void> => {
    await this.rpcClient.execute(PLAY_SONG_COMMAND, id, seek);
  }

  stop = async (): Promise<IStopResult> => {
    const result = await this.rpcClient.execute(STOP_COMMAND) as IStopResult;
    return result;
  }
}
