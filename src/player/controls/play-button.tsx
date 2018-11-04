import { Icon } from 'antd';
import * as React from 'react';
import { PlayingStatus } from '../player-state';

export interface IPlayButtonProps {
  playingStatus: PlayingStatus;
  onClick: () => void;
}

export default class PlayButton extends React.Component<IPlayButtonProps> {

  getIcon = () => {
    const { playingStatus } = this.props;
    let iconType;
    if (playingStatus === 'playing') {
      iconType = 'pause';
    } else {
      iconType = 'caret-right';
    }
    return (
      <Icon
        type={iconType}
        style={{fontSize: '3em'}}
      />
      );
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
