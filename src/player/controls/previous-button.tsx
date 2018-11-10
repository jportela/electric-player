import IconButton from '@material-ui/core/IconButton';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import * as React from 'react';
import { PlayingStatus } from '../player-state';

export interface IPreviousButtonProps {
  playingStatus: PlayingStatus;
  onClick: () => void;
}

export default class PreviousButton extends React.Component<IPreviousButtonProps> {
  render() {

    const { onClick } = this.props;

    return (
      <IconButton onClick={onClick} color="primary">
        <SkipPrevious fontSize="large" />
      </IconButton>
    );
  }

}
