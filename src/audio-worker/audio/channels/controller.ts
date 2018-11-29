import {
  IAudioController,
  IStopResult,
  PLAY_SONG_COMMAND,
  STOP_COMMAND,
} from '../../../shared/audio/common/controller';
import RpcServer from '../../../shared/ipc/node/rpc-server';
import AudioController from '../controller';

export default class AudioControllerChannel implements IAudioController {
  constructor(
    private rpcServer: RpcServer,
    private controller: AudioController,
  ) {}

  registerListeners() {
    this.rpcServer.registerCommand(PLAY_SONG_COMMAND, this.playSong);
    this.rpcServer.registerCommand(STOP_COMMAND, this.stop);
  }

  playSong = async (id: string, seek?: number): Promise<void> => {
    console.log('playing song', id, seek);
    return this.controller.playSong(id, seek);
  }

  stop = async (): Promise<IStopResult> => {
    console.log('stop');
    this.controller.stopCurrentSong();
    return {
      currentTime: this.controller.currentTime,
    };
  }
}
