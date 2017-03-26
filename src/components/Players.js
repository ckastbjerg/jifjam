const yo = require('yo-yo')

const styles = `
    width: 100%;
`;

const titleStyles = `
    font-size: 7vw;
    margin-bottom: 3vh;
`;

const playerStyles = `
    background-color: white;
    border-bottom: 1px solid;
    padding: 5vw;
`;

module.exports = players => yo`
  <div style="${styles}">
    <div style="${titleStyles}">Players</div>
    ${players.map(player => yo`
      <div style="${playerStyles}">${player}</div>
    `)}
  </div>
`;
