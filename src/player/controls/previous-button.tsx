import { Icon } from 'antd';
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
        <Icon
          type="step-backward"
          style={{fontSize: '3em'}}
        />
      </a>
    );
  }

}
