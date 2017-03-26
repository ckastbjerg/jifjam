const Moniker = require('moniker')
const plugplay = require('plugplay/server')
const playersPluginFactory = require('plugplay/plugins/players/server')
const roomsPluginFactory = require('plugplay/plugins/rooms/server')

var names = Moniker.generator([Moniker.noun])

const getFreshRound = () => {
  return {
    round: {
      options: [
        {
          id: 0,
          label: names.choose(),
          isAnswered: true,
          answeredBy: 123456789
        },
        {
          id: 1,
          label: names.choose()
        },
        {
          id: 2,
          label: names.choose()
        },
        {
          id: 3,
          label: names.choose()
        }
      ],
      correctOption: Math.floor(Math.random() * 4)
    }
  }
}

const roomReducer = (state, action) => {
  if (!state.isReady) {
    return state.data
  }

  if (!state.data || (action.type === 'USER_ACTION' && action.payload.type === 'rematch')) {
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
