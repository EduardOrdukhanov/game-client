import React from 'react'
import App from './App/App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore'

const store = configureStore()

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