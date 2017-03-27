const Moniker = require('moniker')
const plugplay = require('plugplay/server')
const playersPluginFactory = require('plugplay/plugins/players/server')
const roomsPluginFactory = require('plugplay/plugins/rooms/server')

var names = Moniker.generator([Moniker.noun])

function getFreshRound() {
  const options = [...Array(4)].map((_, id) => ({
    id,
    label: names.choose(),
    isAnswered: false,
    answeredBy: null
  }))
  const correctOptionId = Math.floor(Math.random() * 4)
  return {
    options: options,
    correctOption: correctOptionId
  }
}

const roomReducer = (state, action) => {
  if (action.type === 'USER_ACTION' && action.payload.type === 'new game') {
    const round = getFreshRound()
    const scores = state.players.map(playerId => {
      return { playerId, score: 0 }
    })

    return Object.assign({}, state.data, { scores, round, isGameOver: false })
  }

  if (action.type === 'USER_ACTION' && action.payload.type === 'new round') {
    const round = getFreshRound()
    return Object.assign({}, state.data, { round })
  }

  if (action.type === 'USER_ACTION' && action.payload.type === 'option select') {
    const round = state.data.round
    console.log(round)
    const options = round.options
    const optionId = action.payload.data
    const playerId = action.payload.playerId
    const isAnsweredCorrectly = round.correctOption === optionId
    const option = options.find(option => option.id === optionId)
    const newOptions = options.filter(option => option.id !== optionId)
    const newOption = Object.assign({}, option, {
      answeredBy: playerId,
      isAnswered: true,
      isAnsweredCorrectly,
    })
    newOptions.push(newOption)

    const scores = state.data.scores || []
    const newScores = scores.filter(score => score.playerId !== playerId)
    const playerScore = scores.find(score => score.playerId === playerId)
    playerScore.score = isAnsweredCorrectly
      ? playerScore.score + 1
      : (playerScore.score === 0 ? 0 : playerScore.score - 1)
    newScores.push(playerScore)

    const newState = Object.assign({}, state.data, {
      round: Object.assign({}, round, {
        options: newOptions,
      }),
      scores: newScores,
      isGameOver: playerScore.score === 5,
    })

    console.log(newState)

    return newState
  }

  return state.data
}

const playersPlugin = playersPluginFactory()

const roomsPlugin = roomsPluginFactory({
  minPlayers: 1,
  maxPlayers: 4,
  roomReducer
})

const mapStateToClientProps = (state, { playerId, roomId }) => {
  const room = state.rooms.byId[roomId]

  if (roomId && room.data && room.data.isGameOver) {
    const players = room.players.map(id => {
      return {
        id: id,
        name: state.players.byId[id].name,
      }
    })

    return {
      screen: 'end',
      players,
      scores: room.data.scores,
    }
  }

  if (roomId && room.data && room.data.round) {
    const players = room.players.map(id => {
      return {
        id: id,
        name: state.players.byId[id].name,
      }
    })

    return {
      screen: 'round',
      round: room.data.round,
      players,
      scores: room.data.scores,
      isReady: room.isReady,
      roomId
    }
  }

  if (roomId) {
    const players = room.players.map(id => {
      return {
        id: id,
        name: state.players.byId[id].name,
      }
    })

    return {
      screen: 'room',
      players,
      isReady: room.isReady,
      roomId
    }
  }

  return {
    screen: 'lobby',
    rooms: state.rooms.ids.map(roomId => state.rooms.byId[roomId])
  }
}

plugplay({
  mapStateToClientProps,
  plugins: [playersPlugin, roomsPlugin]
})
