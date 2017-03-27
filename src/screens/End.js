import React from 'react'
import { Screen, Button, Caption } from '../elements'

import Players from '../components/Players'
import Gif from '../components/Gif'

const Room = ({ actions, ...rest }) =>
  <Screen>
    <Caption>Game over</Caption>
    <Gif searchQuery="game over" />
    <Players {...rest} />
    <Button onTouchEnd={() => actions.default('new game')}>
      New game
    </Button>
  </Screen>

export default Room
