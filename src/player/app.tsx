import { Layout } from 'antd';
import * as React from 'react';

import PlayerControls from './controls/player';
import HeaderTitle from './header/title';
import { PlayingStatus } from './player-state';

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
    <Layout>
      <Layout.Header>
        <HeaderTitle />
      </Layout.Header>
      <Layout.Content>
        <PlayerControls
          playingStatus={this.state.playingStatus}
          onPlayButtonClick={this.onPlayButtonClick}
        />
      </Layout.Content>
    </Layout>
    );
  }
}
