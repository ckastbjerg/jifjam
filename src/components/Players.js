import React from 'react'
import styled from 'styled-components'
import { fontFamilyBase } from '../elements'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  flex-direction: column;
`

const Heading = styled.h4`
  font-size: 3vw;
  text-transform: uppercase
  font-family: ${fontFamilyBase}
  padding: 1.5vw;
  background-color: white;
  border: 1px solid #333;
  display: flex;
  justify-content: space-between;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
`

const Item = styled.li`
  font-size: 6vw;
  font-family: ${fontFamilyBase}
  padding: 3vw;
  background-color: white;
  border: 1px solid #333;
  border-top: 0;
  display: flex;
  justify-content: space-between;
`

const Players = ({ players, scores }) =>
  <Wrapper>
    <Heading>
      <span>Players</span>
      {scores &&
        <span>scores</span>
      }
    </Heading>
    <List>
      {players.map(player =>
        <Item key={`player-${player.id}`}>
          <span>{player.name}</span>
          {scores &&
            <span>{scores.find(score => score.playerId === player.id).score}</span>
          }
        </Item>
      )}
    </List>
  </Wrapper>

export default Players
