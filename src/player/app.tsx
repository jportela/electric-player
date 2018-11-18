import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

import AudioProvider from './audio/provider';
import Song from './audio/song';
import PlayerControls from './controls/player';
import HeaderTitle from './header/title';
import { PlayingStatus } from './player-state';
import theme from './theme';

interface IAppState {
  playingStatus: PlayingStatus;
}

export default class App extends React.Component<any, IAppState> {

  private audioProvider: AudioProvider;
  private song: Song;

  constructor(props: any, state: IAppState) {
    super(props, state);
    this.state = {
      playingStatus: 'paused',
    };
    this.audioProvider = new AudioProvider();
    this.song = new Song(this.audioProvider);
    this.song.loadFile('/Users/jportela/Desktop/hotelcalifornia.mp3');
  }

  onPlayButtonClick = () => {
    if (this.state.playingStatus === 'playing') {
      this.song.pause();
      this.setState({
        playingStatus: 'paused',
      });
    } else {
      this.song.play();
      this.setState({
        playingStatus: 'playing',
      });
    }
  }

  onPreviousButtonClick = () => {
    if (this.state.playingStatus === 'playing') {
      this.song.stop();
      this.song.play();
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
