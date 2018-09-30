const types = {
  INIT_SOCKET: 'INIT_SOCKET'
}
export default types

export const initSocket = socket => {
  return {
    type: types.INIT_SOCKET,
    payload: socket
  }
}
