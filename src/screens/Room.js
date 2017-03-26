const yo = require('yo-yo')
const Players = require('../components/Players')
const Gif = require('../components/Gif')

const name = `
  text-transform: uppercase;
  font-size: 5vw;
  letter-spacing: .3vw;
`;

module.exports = (actions, props) => {
  return yo`
    <div>
      <div style=${name}>${props.roomId}</div>
      ${Gif(props.roomId.replace('-', ' '))}
      ${Players(props.players)}
      <button ${props.isReady ? '' : 'disabled'}>
        Start game
      </button>
    </div>
  `;
}
