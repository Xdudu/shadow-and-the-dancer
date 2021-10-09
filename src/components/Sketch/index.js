import React from 'react'

import * as sketchParams from '../../sketch-params'
import Canvas from '../Canvas'

export default class Sketch extends React.Component {
  getParams = () => {
    const sketchName = this.props.match.params.sketchName.replace(/-./gm, str => str[1].toUpperCase())
    return sketchParams[sketchName] || {}
  }

  render () {
    const params = this.getParams()
    return <Canvas params={params} />
  }
}
