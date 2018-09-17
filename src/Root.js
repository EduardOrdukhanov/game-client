import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './store'

const store = createStore(rootReducer)

const Root = () => {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  )
}

export default Root