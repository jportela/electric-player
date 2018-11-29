export const PLAY_SONG_COMMAND = 'play-song';

export const STOP_COMMAND = 'stop';

export interface IStopResult {
  currentTime: number;
}

export interface IAudioController {
  playSong(id: string, seek?: number): Promise<void>;
  stop(): Promise<IStopResult>;
}
