import IconButton from '@material-ui/core/IconButton';
import SkipNext from '@material-ui/icons/SkipNext';
import * as React from 'react';
import { PlayingStatus } from '../player-state';

export interface INextButtonProps {
  playingStatus: PlayingStatus;
  onClick: () => void;
}

export default class NextButton extends React.Component<INextButtonProps> {
  render() {

    const { onClick } = this.props;

    return (
      <IconButton onClick={onClick} color="primary">
        <SkipNext fontSize="large" />
      </IconButton>
    );
  }

}
