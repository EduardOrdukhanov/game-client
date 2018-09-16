import React, { Component } from 'react';
import Canvas from './Canvas/Canvas'
import { withStyles } from '@material-ui/core/styles'

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.App}>
        <Canvas/>
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
