const yo = require('yo-yo')
const Gif = require('../components/Gif')
const styles = require('../styles')

const captionStyles = `
  text-transform: uppercase;
  font-size: 5vw;
  letter-spacing: .3vw;
`;

const optionStyles = `
  width: 100%;
  padding: 3vw;
  margin-top: 3vh;
  font-size: 7vw;
`;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = (actions, round) => {
  console.log(round, 'round');
  return yo`
    <div style="${styles.screen}">
      <div style=${captionStyles}>Name the gif</div>
      ${Gif(round.correctOption)}
      <div>
        ${round.options.map(option => yo`
          <button
            onclick=${() => actions.default('option select', option.id)}
            style="${optionStyles}"
          >
            ${capitalizeFirstLetter(option.label)}
          </button>
        `)}
      </div>
    </div>
  `;
}
