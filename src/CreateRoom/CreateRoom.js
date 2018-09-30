import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { compose } from 'redux'

class CreateRoom extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      room: ''
    }
  }
  
  handleChange = room => event => {
    this.setState({
      [room]: event.target.value
    })
  }

  handleSubmit = e => {
    this.props.socketInstance.emit('create_room', this.state.room)
  }

  render(){
    const { classes } = this.props
    return (
      <Paper className={classes.createRoomContainer}>
        <TextField
          id="room"
          label="Room name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('room')}
          margin="normal"
        />
        {this.props.socketInstance ?
        <Button onClick={this.handleSubmit} color='primary' variant='contained'> 
          Create room
        </Button>
        :
        <Button disabled>
          Create room
        </Button>
        }
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
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
}

const mapStateToProps = state => ({
  socketInstance: state.socketInstance
})

const mapDispatchToProps = dispatch => ({})

export default compose(
  withStyles(styles, {
    name: 'CreateRoom'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreateRoom)