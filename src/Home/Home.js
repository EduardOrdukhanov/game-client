import React from 'react'
import { withStyles } from '@material-ui/core/styles'


class Home extends React.Component {
  render(){
    const { classes } = this.props
    return (
      <div className = {classes.container}>
        THIS IS A HOME PAGE...
      </div>
    )
  }
}

const styles = theme => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
}

export default withStyles(styles)(Home)