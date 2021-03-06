import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store'

const store = createStore(rootReducer)

const Root = () => {
  return (
    <Provider store = {store}>
      <App/>
    </Provider>
  )
}

export default Root