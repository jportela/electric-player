import { Icon } from 'antd';
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
        <Icon
          type="step-forward"
          style={{fontSize: '3em'}}
        />
      </a>
    );
  }

}
