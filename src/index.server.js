const plugplay = require('plugplay/server')
const playersPluginFactory = require('plugplay/plugins/players/server')
const roomsPluginFactory = require('plugplay/plugins/rooms/server')

const roomReducer = (state, action) => {
  console.log(action);
  if (!state.isReady) {
    return state.data
  }

  return state.data
}

const playersPlugin = playersPluginFactory()
const roomsPlugin = roomsPluginFactory({
  minPlayers: 2,
  maxPlayers: 2,
  roomReducer
})

const mapStateToClientProps = (state, { playerId, roomId }) => {
  const room = state.rooms.byId[roomId]

  if (roomId && room.data) {
    return {
      winner: room.data.winner,
      players: room.players,
      isReady: room.isReady,
      roomId
    }
  }

  if (roomId) {
    return {
      players: room.players,
      isReady: room.isReady,
      roomId
    }
  }

  return {
    rooms: state.rooms.ids.map(roomId => state.rooms.byId[roomId])
  }
}

plugplay({
  mapStateToClientProps,
  plugins: [playersPlugin, roomsPlugin]
})
