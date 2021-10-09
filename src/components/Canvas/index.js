import React from 'react'

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

  getDrawParams = () => this.props.params.drawList || []

  draw = () => {
    let hasNextDraw = true

    this.getDrawParams().forEach(
      ({ canvasBias, speed, drawMethod, roundCnt, ...paramsForDraw }, drawIndex) => {
        if (!paramsForDraw) return

        if (!this.$canvas) return
        const context = this.$canvas.getContext('2d')
        context.fillStyle = 'none'

        const time = (Date.now() - this.startAt) / 1000
        if (time * speed / (2 * Math.PI) > roundCnt) return hasNextDraw = false// complete

        const { R, r } = paramsForDraw
        const dataForDraw = getDataForDraw(paramsForDraw)
        dataForDraw.forEach((data, dataIndex) => {
          const { translate, color, initialDrawPoint } = data
          if (!this.lastDrawPointSeries[drawIndex]) this.lastDrawPointSeries[drawIndex] = []
          const lastDrawPoint = this.lastDrawPointSeries[drawIndex][dataIndex] || initialDrawPoint

          context.resetTransform()
          context.translate(...canvasBias)

          const drawPoint = getDrawPoint(R, r, data, speed, time)

          context.translate(...translate)

          if (drawMethod.type === 'line') {
            // lines
            context.lineWidth = drawMethod.weight
            context.beginPath()
            context.strokeStyle = color
            context.moveTo(...lastDrawPoint)
            context.lineTo(...drawPoint)
            context.stroke()
          } else if (drawMethod.type === 'point') {
            // dashes
            context.beginPath()
            context.fillStyle = color
            context.ellipse(...drawPoint, 1, 1, 0, 0, 2 * Math.PI)
            context.fill()
          }

          this.lastDrawPointSeries[drawIndex][dataIndex] = drawPoint
          if (dataIndex === dataForDraw.length - 1) context.closePath()
        })
      }
    )

    if (hasNextDraw) requestAnimationFrame(this.draw)
  }

  render() {
    const { width, height, bg } = this.props.params
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
