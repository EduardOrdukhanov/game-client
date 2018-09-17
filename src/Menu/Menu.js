import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import Eraser from '../assets/eraser.svg'
import Pencil from '../assets/edit.svg'
import { Icon } from '../../node_modules/@material-ui/core';



class Menu extends React.Component {
  constructor(props){
    super(props)
  }
  handleErase = e => {
    const { ctx } = this.props
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 50
  }

  handleDraw = e => {
    const { ctx } = this.props
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
  }
  render(){
    const { classes, ctx } = this.props
    return (
      <div className={classes.menuContainer}>
        <IconButton onClick={this.handleErase} className={classes.eraser} classes={{label: classes.iconButtonLabel}}>
          <img src={Eraser} alt='' className={classes.eraserSvg}/>
        </IconButton>
        <IconButton onClick={this.handleDraw} className={classes.pencil} classes={{label: classes.iconButtonLabel}}>
          <img src={Pencil} alt='' className={classes.pencilSvg}/>
        </IconButton>
      </div>
    )
  }
}

const styles = theme => {
  return {
    iconButtonLabel: {
      display: 'block'
    },
    menuContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    eraser: {
    },
    eraserSvg: {
      transform: 'scale(0.75,0.75)',
    },
    pencil: {

    },
    pencilSvg: {
      transform: 'scale(0.75,0.75)'
    }
  }
}

export default withStyles(styles)(Menu)