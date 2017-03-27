import React from 'react'
import styled from 'styled-components'
import { Screen, Button } from '../elements'

const Logo = styled.h1`
  font-family: 'Londrina Outline', cursive;
  font-size: 30vw;
`

const Room = ({ roomId, players, onJoinRoom }) =>
  <li>
    <div>{roomId} (${players.length} players)</div>
    <button onTouchEnd={() => onJoinRoom(roomId)}>Join</button>
  </li>

const Lobby = ({ actions, rooms }) =>
  <Screen>
    <Logo>Jif Jam</Logo>
    {rooms.length === 0 &&
      <div>No rooms created</div>
    }
    {rooms.length > 0 &&
      <ul>
        {rooms.map(room =>
          <Room onJoinRoom={actions.rooms.join} {...room} />
        )}
      </ul>
    }
    <Button onTouchEnd={actions.rooms.create}>
      Create new room
    </Button>
  </Screen>

export default Lobby
