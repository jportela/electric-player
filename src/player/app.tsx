import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

import { IAudioController } from '../shared/audio/common/controller';
import { ISongCache } from '../shared/audio/common/song-cache';
import Client from '../shared/ipc/node/client';
import RpcClient from '../shared/ipc/node/rpc-client';
import AudioControllerChannel from './audio/controller';
import SongCacheChannel from './audio/song-cache';
import PlayerControls from './controls/player';
import HeaderTitle from './header/title';
import { PlayingStatus } from './player-state';
import theme from './theme';

interface IAppState {
  playingStatus: PlayingStatus;
}

export default class App extends React.Component<any, IAppState> {

  private client: Client;
  private rpcClient: RpcClient;
  private audioController: IAudioController;
  private songCache: ISongCache;

  constructor(props: any, state: IAppState) {
    super(props, state);
    this.state = {
      playingStatus: 'paused',
    };
    this.client = new Client('audio-worker');
    this.rpcClient = new RpcClient(this.client);
    this.audioController = new AudioControllerChannel(this.rpcClient);
    this.songCache = new SongCacheChannel(this.rpcClient);

    this.client.connect().then(() => {
      this.songCache.loadFromFile('/Users/jportela/Desktop/hotelcalifornia.mp3', 'hotel');
    });
  }

  onPlayButtonClick = () => {
    if (this.state.playingStatus === 'playing') {
      this.audioController.stop();
      this.setState({
        playingStatus: 'paused',
      });
    } else {
      this.audioController.playSong('hotel');
      this.setState({
        playingStatus: 'playing',
      });
    }
  }

  onPreviousButtonClick = async () => {
    if (this.state.playingStatus === 'playing') {
      await this.audioController.stop();
      await this.audioController.playSong('hotel');
    }
  }

  render() {
    return (
    <MuiThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
      <HeaderTitle />
      <PlayerControls
        playingStatus={this.state.playingStatus}
        onPlayButtonClick={this.onPlayButtonClick}
        onPreviousButtonClick={this.onPreviousButtonClick}
      />
    </Grid>
  </MuiThemeProvider>);
  }
}
