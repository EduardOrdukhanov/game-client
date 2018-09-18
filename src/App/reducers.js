import types from './actions'
export const socketInstance = (state = null, action) => {
  switch(action.type){
    case types.INIT_SOCKET:
      return action.payload
    default:
      return state
  }
}