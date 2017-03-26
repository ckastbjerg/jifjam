/**
 * isAnswered: true,
 * answeredBy: 123456789
 */
const Moniker = require('moniker')

var names = Moniker.generator([Moniker.noun])

const getFreshRound = () => {
  const options = [...Array(4)].map((_, id) => ({
    id,
    label: names.choose()
  }))
  const correctOptionId = Math.floor(Math.random() * 4)
  const correctOptionLabel = options[correctOptionId].label

  // const req = `http://api.giphy.com/v1/stickers/search?q=${searchText}&api_key=dc6zaTOxFJmzC`;
  // return fetch(req).then(response => response.json()).then(res => {
  //     return res.data[index].images.fixed_height.url;
  // });

  return {
    options: options,
    correctOption: {
      id: correctOptionId,
      image: 'https://media.giphy.com/media/3o7abzPdXjhsuX04z6/giphy.gif',
      label: correctOptionLabel
    }
  }
}

const actionTypeLoading = 'ROUND-DATA/LOADING'
const actionTypeLoaded = 'ROUND-DATA/LOADED'

const middleware = store => next => action => {
  // FIXME: this needs to work on a room level...
  // const state = store.getState()
  next(action)

  if (action.type === 'USER_ACTION' && (action.payload.type === 'rematch' || action.payload.type === 'option select')) {
    store.dispatch({
      type: actionTypeLoading,
      payload: {} // FIXME: wierd limitation...
    })

    setTimeout(() => {
      const round = getFreshRound()
      store.dispatch({
        type: actionTypeLoaded,
        round,
        payload: {} // FIXME: wierd limitation...
      })
    }, 1000)
  }
}

const initialState = {
  isLoading: true
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypeLoading) {
    return {
      isLoading: true
    }
  } else if (action.type === actionTypeLoaded) {
    return Object.assign({ isLoading: false }, action.round)
  }

  return state
}

module.exports = {
  name: 'round-plugin',
  middleware,
  reducer,
  addClientOptions: (state, props) => (props)  // FIXME: move to framework
}
