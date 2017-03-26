const yo = require('yo-yo')

const styles = `
    width: 100%;
`;

const titleStyles = `
    font-size: 6vw;
    margin-bottom: 3vh;
`;

const playerStyles = `
    border: 1px solid #222;
    padding: 5vw;
    font-size: 6vw;
`;

module.exports = players => yo`
  <div style="${styles}">
    <div style="${titleStyles}">Players in this room</div>
    ${players.map(player => yo`
      <div style="${playerStyles}">${player}</div>
    `)}
  </div>
`;
