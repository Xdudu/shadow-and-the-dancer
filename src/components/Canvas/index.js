import React from 'react'

import * as sketchParams from '../../sketch-params'

import { getDataForDraw, getDrawPoint } from './utils'
import './index.css'

export default class Canvas extends React.Component {
  $canvas = null

  lastDrawPointSeries = [] // for drawing lines

  setCanvasRef = el => this.$canvas = el
  setCanvasContainerRef = el => this.$canvasContainer = el

  componentDidMount() {
    this.resizeCanvas()
    setTimeout(this.startDraw, 500) // for better intial render
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.startDraw)
    window.cancelAnimationFrame(this.draw)
  }

  startDraw = () => {
    this.startAt = Date.now()
    window.requestAnimationFrame(this.draw)
  }

  resizeCanvas = () => {
    const containerWidth = this.$canvasContainer.clientWidth
    const containerHeight = this.$canvasContainer.clientHeight
    this.$canvas.style.width = Math.min(containerWidth, containerHeight) + 'px'
  }

  getParams = () => {
    const sketchName = this.props.match.params.sketchName.replace(/-./gm, str => str[1].toUpperCase())
    return sketchParams[sketchName] || {}
  }

  draw = () => {
    const { params: paramsForDraw, canvasBias, speed, drawMethod, roundCnt } = this.getParams()
    if (!paramsForDraw) return

    if (!this.$canvas) return
    const context = this.$canvas.getContext('2d')
    context.fillStyle = 'none'

    const time = (Date.now() - this.startAt) / 1000
    if (time * speed / (2 * Math.PI) > roundCnt) return // complete

    const { R, r } = paramsForDraw
    const dataForDraw = getDataForDraw(paramsForDraw)
    dataForDraw.forEach((data, dataIndex) => {
      const { translate, color, initialDrawPoint } = data
      const lastDrawPoint = this.lastDrawPointSeries[dataIndex] || initialDrawPoint

      context.resetTransform()
      context.translate(...canvasBias)

      const drawPoint = getDrawPoint(R, r, data, speed, time)

      context.translate(...translate)

      if (drawMethod === 'line') {
        // lines
        context.beginPath()
        context.strokeStyle = color
        context.moveTo(...lastDrawPoint)
        context.lineTo(...drawPoint)
        context.stroke()
      } else if (drawMethod === 'point') {
        // dashes
        context.beginPath()
        context.fillStyle = color
        context.ellipse(...drawPoint, 1, 1, 0, 0, 2 * Math.PI)
        context.fill()
      }

      this.lastDrawPointSeries[dataIndex] = drawPoint
    })
    requestAnimationFrame(this.draw)
  }

  render() {
    const { width, height, bg } = this.getParams()
    return (
      <div
        className="canvas-container"
        style={{ background: bg }}
        ref={this.setCanvasContainerRef}
      >
        <canvas
          className="canvas"
          ref={this.setCanvasRef}
          width={width}
          height={height}
        />
      </div>
    )
  }
}
