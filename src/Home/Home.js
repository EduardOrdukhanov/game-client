import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CreateRoom from '../CreateRoom/CreateRoom'
import RoomList from '../RoomList/RoomList'
import { connect } from 'react-redux'
import { compose } from 'redux'

class Home extends React.Component {
  render(){
    const { classes } = this.props
    return (
      <div className = {classes.container}>
        <div className = {classes.centerWrapper}>
          {
            this.props.socketInstance &&
              <React.Fragment>
                <CreateRoom/>
                <RoomList/>
              </React.Fragment>
          }
        </div>
      </div>
    )
  }
}

const styles = theme => {
  return {
    container: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerWrapper: {
      width: '200px'
    }
  }
}


const mapStateToProps = state => ({
  socketInstance: state.socketInstance
})

const mapDispatchToProps = dispatch => ({})

export default compose(
  withStyles(styles, {
    name: 'Home'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)