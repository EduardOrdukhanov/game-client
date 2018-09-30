import { combineReducers } from 'redux'
import { socketInstance } from '../App/reducers'
const defaultReducer = (state = {name: 'I am default state'}, action) => {
  return state
}


export default combineReducers({
  defaultReducer,
  socketInstance
})