const yo = require('yo-yo')
const Gif = require('../components/Gif')

const captiomStyles = `
  text-transform: uppercase;
  font-size: 5vw;
  letter-spacing: .3vw;
`;

module.exports = (actions, props) => {
  return yo`
    <div>
      <div style=${captiomStyles}>Name the search query</div>
      ${Gif(props.roomId.replace('-', ' '))}
      ${Players(props.players)}
      <button ${props.isReady ? '' : 'disabled'}>
        Start game
      </button>
    </div>
  `;
}
