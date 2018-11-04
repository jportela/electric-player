import IconButton from '@material-ui/core/IconButton';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
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
      return <Pause fontSize="large" />;
    } else {
      return <PlayArrow fontSize="large" />;
    }
  }

  render() {

    const { onClick } = this.props;

    const icon = this.getIcon();

    return (
      <IconButton onClick={onClick}>
        {icon}
      </IconButton>
    );
  }

}
