const yo = require('yo-yo')
const styles = require('../styles')
const Git = require('../components/Gif')

const titleStyles = `
  font-family: 'Londrina Outline', cursive;
  font-size: 30vw;
`

const emptyStyles = `
  font-size: 7vw;
  opacity: .25;
`

const roomsStyles = `
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const roomsItemStyles = `
  align-items: center;
  display: flex;
  font-size: 5vw;
  justify-content: space-between;
`;

const roomsItemButtonStyles = `
  font-size: 8vw;
  text-transform: uppercase;
  font-family: 'Londrina Outline', cursive;
`;

const listRooms = (actions, rooms) => yo`
  <ul style="${roomsStyles}">
    ${rooms.map(room => yo`
      <li style="${roomsItemStyles}">
        <div>${room.roomId} (${room.players.length} players)</div>
        <button
          style="${roomsItemButtonStyles}"
          onclick=${() => actions.rooms.join(room.roomId)}
        >
          Join
        </button>
      </li>`
    )}
  </ul>
`

module.exports = (actions, rooms) => yo`
  <div style="${styles.screen}"">
    <div
      class="animated rubberBand"
      style="${titleStyles}"
    >
      Jif Jam
    </div>
    ${rooms.length > 0 ? listRooms(actions, rooms) : yo`
      <div style="${emptyStyles}">No rooms created</div>`
    }
    <button
      style="${styles.button}"
      onclick=${actions.rooms.create}
    >
      Create new room
    </button>
  </div>
`
