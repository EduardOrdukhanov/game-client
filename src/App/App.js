import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import io from 'socket.io-client'
import Home from '../Home/Home'
import { initSocket } from './actions'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

class App extends Component {
  
  componentDidMount(){
    const { initSocket } = this.props
    let socket = io('http://localhost:8080')
    initSocket(socket)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.App}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/canvas/:id' render={ props => this.props.socketInstance && <Canvas {...props}/>}/>
        </Switch>
      </div>
    );
  }
}

const styles = theme => {
  return {
    App: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }
  }
}

const mapStateToProps = state => ({
  socketInstance: state.socketInstance
})

const mapDispatchToProps = dispatch => ({
  initSocket: socket => dispatch(initSocket(socket))
})

export default compose(
  withRouter,
  withStyles(styles, {
    name: 'App'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App)
