import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Menu from '../Menu/Menu'

import { connect } from 'react-redux'
import { compose } from 'redux'


//Useful code
/*
var canvas = document.createElement('canvas');
canvas.width = desiredWidth;
canvas.height = desiredHeight;
canvas.getContext('2d').drawImage(originalCanvas,x,y,w,h,0,0,desiredWidth, desiredHeight);
result = canvas.toDataURL()
*/

class Canvas extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mouseDown: false,
      clientX: 0,
      clientY: 0,
      broadcasts: [],
      canvasData: ''
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
    /*
    this.props.socketInstance.on('from_server', data => {
      console.log(data.payload)
      this.drawImage(data.payload)
    })
    */
    this.props.socketInstance.on('broadcast', data => {
      this.setState({
        broadcasts: this.state.broadcasts.concat([data])
      })
    })
  }

  drawImage = payload => {
    let ctx = this.ctx
    let clear = this.clearCanvas
    let imageObj = new Image()
    imageObj.onload = function() {
      clear()
      ctx.drawImage(this, 0, 0)
    }
    imageObj.src = payload;
  }

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
  }

  drawLine = e => {
    const { x, y } = this.getXY(e)
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }

  setXY = (coordinates) => {
    this.setState({
      clientX: Math.abs(Math.floor(coordinates.x)),
      clientY: Math.abs(Math.floor(coordinates.y))
    })
  }

  handleMouseMove = e => {
    const coordinates = this.getXY(e)
    this.setXY(coordinates)
    if(this.state.mouseDown){
      this.drawLine(e)
      /*
      this.props.socketInstance.emit('to_server', {
        payload: this.refs.canvas.toDataURL()
      })
      */
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
        <div className={classes.serverChat}>
          {this.state.broadcasts.map((message, i) => (
            <div key={i} style={{color: message.type === 'connect' ? 'green' : message.type === 'disconnect' ? 'red' : 'black'}}>
              {message.payload}
            </div>
          ))}
        </div>
        <div>
          {`X = ${this.state.clientX}`}<br/>{`Y = ${this.state.clientY}`}
        </div>
        <Menu ctx={this.ctx}/>
        <canvas 
          ref='canvas' 
          width='1000'
          height='1200'
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
      //height: '1000px',
      //width: '1000px'
    },
    serverChat: {
      border: '1px solid black',
      padding: '5px',
      overflowY: 'auto',
      maxHeight: '100px'
    }
  }
}

const mapStateToProps = state => ({
  socketInstance: state.socketInstance
})

const mapDispatchToProps = dispatch => ({})

export default compose(
  withStyles(styles, {
    name: 'Canvas'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Canvas)