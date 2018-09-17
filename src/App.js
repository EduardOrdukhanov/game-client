import React, { Component } from 'react';
import Canvas from './Canvas/Canvas'
import { withStyles } from '@material-ui/core/styles'
import io from 'socket.io-client'
import Home from './Home/Home'
import { Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  
  componentWillMount(){
    //this.socket = io('http://localhost:8080')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.App}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/canvas' component={Canvas}/>
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
      justifyContent: 'center'
    }
  }
}

export default withStyles(styles)(App)
