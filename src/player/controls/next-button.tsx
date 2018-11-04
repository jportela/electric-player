import { ChapterNext } from 'grommet-icons';
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
      <a onClick={onClick}>
        <ChapterNext />
      </a>
    );
  }

}
