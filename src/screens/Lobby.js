const yo = require('yo-yo')

const listRooms = rooms => yo`
  <ul>
    ${rooms.map(room => yo`
      <li>
        ${room.roomId} (${room.players.length} players)
        <button onclick=${() => actions.rooms.join(room.roomId)}>Join</button>
      </li>`
    )}
  </ul>
`

module.exports = (actions, rooms) => {
  return yo`<div class="Lobby">
    <h1>Jif Jam</h1>
    ${rooms.length > 0 ? listRooms(rooms) : 'No rooms created'}
    <button onclick=${actions.rooms.create}>Create new room</button>
  </div>`
}
