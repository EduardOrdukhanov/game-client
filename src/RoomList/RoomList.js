import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
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
      console.log(JSON.stringify(this.state.rooms))
      const rooms = this.state.rooms
      return Object.keys(rooms).map(key => (
        <Link to={`/canvas/${key}`} key={key} id={key}>
          <Paper className={classes.roomItem}>
            {rooms[key].name}
          </Paper>
        </Link>
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
      margin: '2px',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'grey'
      }
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