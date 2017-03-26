const yo = require('yo-yo')
const plugplay = require('plugplay/client')
const playersPlugin = require('plugplay/plugins/players/client')()
const roomsPlugin = require('plugplay/plugins/rooms/client')()

const Lobby = require('./screens/Lobby')
const Room = require('./screens/Room')
const Round = require('./screens/Round')

const actions = plugplay({
  serverUrl: 'localhost:3000',
  plugins: [playersPlugin, roomsPlugin],
  onPropsUpdated: props => console.log(props) || yo.update(el, Game(props))
})

function Game (props = { rooms: [] }) {
  if (props.round) {
    return Round(actions, props.round)
  } else if (props.roomId) {
    return Room(actions, props)
  }

  return Lobby(actions, props.rooms)
}

const el = Game()
document.body.appendChild(el)
