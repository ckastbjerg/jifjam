import React from 'react'
import styled from 'styled-components'

import Lobby from './screens/Lobby'
import Room from './screens/Room'
import Round from './screens/Round'
import End from './screens/End'

import { SCREEN_ROOM, SCREEN_ROUND, SCREEN_LOBBY, SCREEN_END } from './constants'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Game = ({ screen, ...rest }) =>
  <Wrapper>
    {screen === SCREEN_LOBBY &&
      <Lobby {...rest} />
    }
    {screen === SCREEN_ROOM &&
      <Room {...rest} />
    }
    {screen === SCREEN_ROUND &&
      <Round {...rest} />
    }
    {screen === SCREEN_END &&
      <End {...rest} />
    }
  </Wrapper>

export default Game
