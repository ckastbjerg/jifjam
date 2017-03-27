const Moniker = require('moniker')
const plugplay = require('plugplay/server')
const playersPluginFactory = require('plugplay/plugins/players/server')
const roomsPluginFactory = require('plugplay/plugins/rooms/server')

var names = Moniker.generator([Moniker.noun])

function getFreshRound () {
  const options = [...Array(4)].map((_, id) => ({
    id,
    label: names.choose(),
    isAnswered: false,
    answeredBy: null
  }))
  const correctOptionId = Math.floor(Math.random() * 4)
  return {
    round: {
      options: options,
      correctOption: correctOptionId
    }
  }
}

const roomReducer = (state, action) => {
  if (!state.isReady) {
    return state.data
  }

  if (action.type === 'USER_ACTION' && action.payload.type === 'rematch') {
    return getFreshRound()
  }

  if (action.type === 'USER_ACTION' && action.payload.type === 'option select') {
    // FIXME: first one to find the right one, and you can only vote once
    // const nextBoard = [...state.data.board]
    // nextBoard[action.payload.data] = action.payload.playerId

    return getFreshRound()
  }

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

  if (roomId && room.data) {
    return {
      screen: 'round-selection',
      round: room.data.round,
      players: room.players,
      isReady: room.isReady,
      roomId
    }
  }

  if (roomId) {
    return {
      screen: 'room-selection',
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
