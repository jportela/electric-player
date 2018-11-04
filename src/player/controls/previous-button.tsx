import { ChapterPrevious } from 'grommet-icons';
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
      <a onClick={onClick}>
        <ChapterPrevious
          size="large"
          color="control"
        />
      </a>
    );
  }

}
