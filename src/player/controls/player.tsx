import Grid from '@material-ui/core/Grid';
import * as React from 'react';

import { PlayingStatus } from '../player-state';
import NextButton from './next-button';
import PlayButton from './play-button';
import PreviousButton from './previous-button';

export interface IPlayerControlsProps {
  playingStatus: PlayingStatus;
  onPlayButtonClick: () => void;
  onPreviousButtonClick: () => void;
}

export default class PlayerControls extends React.Component<IPlayerControlsProps> {

  render() {
    return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <PreviousButton
        playingStatus={this.props.playingStatus}
        onClick={this.props.onPreviousButtonClick} />
      <PlayButton
        playingStatus={this.props.playingStatus}
        onClick={this.props.onPlayButtonClick} />
      <NextButton
        playingStatus={this.props.playingStatus}
        onClick={() => {}} />
      </Grid>
    );
  }
}
