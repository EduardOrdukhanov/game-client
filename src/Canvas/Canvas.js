import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu from '../Menu/Menu'

class Canvas extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mouseDown: false,
      clientX: 0,
      clientY: 0
    }
  }

  componentDidMount(){
    this.ctx = this.refs.canvas.getContext('2d')
    this.ctx.font = "30px Arial"
    this.ctx.fillStyle = "#FF0000"
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.translate(0.5, 0.5)
    //this.ctx.strokeText("Hello World", 10, 50);
  }

  handleMouseMove = e => {
    const {x, y} = this.getXY(e)
    this.setState({
      clientX: Math.abs(Math.floor(x)),
      clientY: Math.abs(Math.floor(y))
    })
    if(this.state.mouseDown){
      //this.ctx.fillRect(e.pageX - this.refs.canvas.getBoundingClientRect().left,e.pageY - this.refs.canvas.getBoundingClientRect().top,1,1)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
  }

  handleMouseDown = e => {
    const {x, y} = this.getXY(e)
    this.setState({
      mouseDown: true
    }, () => {
      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
    })
    console.log(`captured mouse down`)
  }

  handleMouseUp = e => {
    this.setState({
      mouseDown: false
    })
    console.log(`captured mouse up`)
  }

  handleMouseOut = e => {
    this.setState({
      mouseDown: false
    })
    console.log(`captured mouse out`)
  }

  getXY(e){
    return {
      x: e.clientX - this.refs.canvas.getBoundingClientRect().left,
      y: e.clientY - this.refs.canvas.getBoundingClientRect().top
    }
  }

  setStyle(color, size){
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = size
  }

  render(){
    const { classes } = this.props
    return (
      <div className={classes.canvasContainer}>
        <div>
          {`X = ${this.state.clientX}`}<br/>{`Y = ${this.state.clientY}`}
        </div>
        <Menu ctx={this.ctx}/>
        <canvas 
          ref='canvas' 
          width='1000'
          height='1000'
          className={classes.canvas} 
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseOut={this.handleMouseOut}
        >
        </canvas>
      </div>
    )
  }
}

const styles = theme => {
  return {
    canvasContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    },
    canvas:{
      border: '1px solid black',
      height: '1000px',
      width: '1000px'
    }
  }
}

export default withStyles(styles)(Canvas)