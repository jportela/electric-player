import * as React from 'react';

import { PlayingStatus } from '../player-state';
import NextButton from './next-button';
import PlayButton from './play-button';
import PreviousButton from './previous-button';

export interface IPlayerControlsProps {
  playingStatus: PlayingStatus;
  onPlayButtonClick: () => void;
}

export default class PlayerControls extends React.Component<IPlayerControlsProps> {

  render() {
    return (
    <div>
      <PreviousButton
        playingStatus={this.props.playingStatus}
        onClick={() => {}} />
      <PlayButton
        playingStatus={this.props.playingStatus}
        onClick={this.props.onPlayButtonClick} />
      <NextButton
        playingStatus={this.props.playingStatus}
        onClick={() => {}} />
      </div>
    );
  }
}
