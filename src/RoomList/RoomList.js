import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { compose } from 'redux'

class RoomList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      rooms: null
    }
  }

  componentDidMount(){
    this.props.socketInstance.on('room_update', data => {
      this.setState({
        rooms: data
      })
    })
    this.props.socketInstance.emit('get_rooms')
  }

  renderRooms = () => {
    const { classes } = this.props
    if(this.state.rooms){
      return this.state.rooms.map((room, i) => (
        <Paper key={i} className={classes.roomItem}>
          {room}
        </Paper>
      ))
    }
  }

  render(){
    const { classes } = this.props
    return (
      <Paper className={classes.createRoomContainer}>
        <Typography variant='headline'>
          Room list
        </Typography>
        {this.renderRooms()}
      </Paper>
    )
  }
}

const styles = theme => {
  return {
    createRoomContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      margin: '20px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    roomItem: {
      margin: '2px'
    }
  }
}

const mapStateToProps = state => ({
  socketInstance: state.socketInstance
})

const mapDispatchToProps = dispatch => ({})

export default compose(
  withStyles(styles, {
    name: 'RoomList'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RoomList)