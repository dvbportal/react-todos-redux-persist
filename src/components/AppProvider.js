import React from 'react'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from '../reducers'
import { createLogger } from 'redux-logger';

import { persistStore, autoRehydrate } from 'redux-persist'

const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(createLogger({ collapsed: true })),
    autoRehydrate(),
  ),
);

export default class AppProvider extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
