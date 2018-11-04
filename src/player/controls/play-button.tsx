import { Box } from 'grommet';
import { PauseFill, PlayFill } from 'grommet-icons';
import * as React from 'react';
import { PlayingStatus } from '../player-state';

export interface IPlayButtonProps {
  playingStatus: PlayingStatus;
  onClick: () => void;
}

export default class PlayButton extends React.Component<IPlayButtonProps> {

  getIcon = () => {
    const { playingStatus } = this.props;
    if (playingStatus === 'playing') {
      return <PauseFill />;
    } else {
      return <PlayFill />;
    }
  }

  render() {

    const { onClick } = this.props;

    const icon = this.getIcon();

    return (
      <a onClick={onClick}>
        {icon}
      </a>
    );
  }

}
