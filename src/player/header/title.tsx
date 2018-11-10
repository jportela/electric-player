import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import styled from 'styled-components';

const Heading = styled(Typography)``;

export default function HeaderTitle() {
  return <Heading variant="h2" align="center" color="primary">
    Electric Player
  </Heading>;
}
