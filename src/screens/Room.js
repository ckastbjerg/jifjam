import React from 'react'
import { Screen, Button, Caption } from '../elements'

import Players from '../components/Players'
import Gif from '../components/Gif'

const Room = ({ actions, isReady, players, roomId }) =>
  <Screen>
    <Caption>{roomId}</Caption>
    <Gif searchQuery={roomId.replace('-', ' ')} />
    <Players players={players} />
    <Button disabled={!isReady} onTouchEnd={() => actions.default('new game')}>
      Start game
    </Button>
  </Screen>

export default Room
