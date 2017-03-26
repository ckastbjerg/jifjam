const yo = require('yo-yo')
const plugplay = require('plugplay/client')
const playersPlugin = require('plugplay/plugins/players/client')()
const roomsPlugin = require('plugplay/plugins/rooms/client')()

const Lobby = require('./components/Lobby')
const Room = require('./components/Room')

const actions = plugplay({
  serverUrl: 'localhost:3000',
  plugins: [playersPlugin, roomsPlugin],
  onPropsUpdated: props => console.log(props) || yo.update(el, Game(props))
})

function Game (props = { rooms: [] }) {
  if (props.roomId) {
    return Room(actions, props)
  }
  return Lobby(actions, props.rooms)
}

const el = Game()
document.body.appendChild(el)
