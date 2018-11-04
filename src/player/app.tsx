import { Box } from 'grommet';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import PlayerControls from './controls/player';
import HeaderTitle from './header/title';
import { PlayingStatus } from './player-state';
import theme from './theme';

interface IAppState {
  playingStatus: PlayingStatus;
}

export default class App extends React.Component<any, IAppState> {
  constructor(props: any, state: IAppState) {
    super(props, state);
    this.state = {
      playingStatus: 'paused',
    };
  }

  onPlayButtonClick = () => {
    if (this.state.playingStatus === 'playing') {
      this.setState({
        playingStatus: 'paused',
      });
    } else {
      this.setState({
        playingStatus: 'playing',
      });
    }
  }

  render() {
    return (
    <ThemeProvider theme={theme}>
      <Box align="center" gap="large">
        <HeaderTitle />
        <PlayerControls
          playingStatus={this.state.playingStatus}
          onPlayButtonClick={this.onPlayButtonClick}
        />
      </Box>
    </ThemeProvider>
    );
  }
}
