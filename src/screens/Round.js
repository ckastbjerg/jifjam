const yo = require('yo-yo')
const Gif = require('../components/Gif')
const styles = require('../styles')

const captionStyles = `
  text-transform: uppercase;
  font-size: 5vw;
  letter-spacing: .3vw;
`;

const optionStyles = `
  position: relative;
  width: 100%;
  margin-top: 3vh;
`;

const optionLabelStyles = `
  position: absolute;
  top: -2vh;
  left: 0;
  background: #222;
  font-size: 4vw;
  padding: 3vw;
  color: var(--white);
`;

const optionButtonStyles = `
  width: 100%;
  padding: 3vw;
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
      <div style="width: 100%">
        ${round.options.map(option => yo`
          <div style="${optionStyles}">
            ${option.answeredBy &&
              yo`<div style="${optionLabelStyles}">${option.answeredBy}</div>`
            }
            <button
              ${option.isAnswered ? 'disabled' : ''}
              onclick=${() => actions.default('option select', option.id)}
              style="${optionButtonStyles}"
            >
              ${capitalizeFirstLetter(option.label)}
            </button>
          </div>
        `)}
      </div>
    </div>
  `;
}
