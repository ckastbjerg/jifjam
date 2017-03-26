const Moniker = require('moniker')
const plugplay = require('plugplay/server')
const playersPluginFactory = require('plugplay/plugins/players/server')
const roomsPluginFactory = require('plugplay/plugins/rooms/server')
const roundPlugin = require('./server/round-plugin')

var names = Moniker.generator([Moniker.noun])

const roomReducer = (state, action) => {
  return state.data
}

const playersPlugin = playersPluginFactory()

const roomsPlugin = roomsPluginFactory({
  minPlayers: 2,
  maxPlayers: 4,
  roomReducer
})

const mapStateToClientProps = (state, { playerId, roomId }) => {
  const room = state.rooms.byId[roomId]

  const round = state['round-plugin']

  if (roomId) {
    return {
      screen: 'round',
      round,
      players: room.players,
      isReady: room.isReady,
      roomId
    }
  }

  return {
    screen: 'room-selection',
    rooms: state.rooms.ids.map(roomId => state.rooms.byId[roomId])
  }
}

plugplay({
  mapStateToClientProps,
  plugins: [playersPlugin, roomsPlugin, roundPlugin]
})
