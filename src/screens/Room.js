const yo = require('yo-yo')
const Players = require('../components/Players')
const Gif = require('../components/Gif')
const styles = require('../styles')

const name = `
  text-transform: uppercase;
  font-size: 5vw;
  letter-spacing: .3vw;
`;

module.exports = (actions, props) => yo`
  <div style="${styles.screen}">
    <div style=${name}>${props.roomId}</div>
    ${Gif(props.roomId.replace('-', ' '))}
    ${Players(props.players)}
    <button
      onclick=${() => actions.default('rematch')}
      style="${styles.button}" ${props.isReady ? '' : 'disabled'}
    >
      Start game
    </button>
  </div>
`
