import React from 'react'
import styled from 'styled-components'

import Players from '../components/Players'
import Gif from '../components/Gif'
import { capitalizeFirstLetter } from '../utils'

import { Caption, Screen, fontFamilyBase } from '../elements';

const Options = styled.ul`
  display: flex;
  flex-direction: column;
`

const Option = styled.li`
  margin-top: 3vh;
  position: relative;
`

const Button = styled.button`
  border: 0;
  font-family: ${fontFamilyBase};
  font-size: 7vw;
  padding: 3vw;
  background: ${props => {
    if (props.correct === true) { return 'green' }
    if (props.correct === false) { return 'red' }
    return '#eee'
  }}
  color: ${props => {
    if (props.correct === true) { return 'white' }
    if (props.correct === false) { return 'white' }
    return '#222'
  }}
  width: 100%;
`

const Label = styled.div`
  width: 100%;
  left: 0;
  top: -2vh;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const LabelInner = styled.div`
  background: #222;
  color: white;
  font-size: 3.5vw;
  padding: 2vw;
`;

const NextRoundButton = styled.button`
  font-size: 5vw;
  padding: 3vw;
  background-color: #222;
  color: white;
  text-transform: uppercase;
  opacity: ${props => props.visible ? '1' : '0'};
`

const Round = ({ actions, round, players, scores }) => {
  const isAnswered = round.options.find(option => option.isAnsweredCorrectly)

  return (
    <Screen>
      <Caption>Name the gif</Caption>
      <Gif searchQuery={round.options.find(option => option.id === round.correctOption).label} />
      <NextRoundButton
        visible={isAnswered}
        onTouchEnd={() => actions.default('new round')}
      >
        Next gif
      </NextRoundButton>
      <Options>
        {round.options.sort((a, b) => a.id > b.id).map(option =>
          <Option key={`option-${option.id}`}>
            {option.answeredBy &&
              <Label>
                <LabelInner>
                  {players.find(player => player.id === option.answeredBy).name}&nbsp;:&nbsp;
                  {scores.find(score => score.playerId === option.answeredBy).score}
                </LabelInner>
              </Label>
            }
            <Button
              disabled={option.isAnswered}
              correct={option.isAnsweredCorrectly}
              onTouchEnd={() => (option.isAnswered || isAnswered)
                ? null : actions.default('option select', option.id)
              }
            >
              {capitalizeFirstLetter(option.label)}
            </Button>
          </Option>
        )}
      </Options>
    </Screen>
  )
}

export default Round
