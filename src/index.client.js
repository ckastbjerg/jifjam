import React from 'react';
import ReactDOM from 'react-dom';

import plugplay from 'plugplay/client'
import playersPlugin from 'plugplay/plugins/players/client'
import roomsPlugin from 'plugplay/plugins/rooms/client'

import Game from './Game'

// const serverUrl = 'https://jifjam-ezmdbjmcwc.now.sh'
const serverUrl = 'localhost:3000'

const actions = plugplay({
  serverUrl,
  plugins: [playersPlugin(), roomsPlugin()],
  onPropsUpdated: props => render(props)
})

function render(props = { rooms: [] }) {
  const state = Object.assign({}, props, { actions: actions })
  ReactDOM.render(
    <Game {...state} />,
    document.getElementById('app')
  );
}

if (module.hot) {
    module.hot.accept();
}
