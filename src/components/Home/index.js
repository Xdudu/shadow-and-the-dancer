import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'


export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <header className="header">Shadow and the Dancer</header>
        <Link className="sketch-link" to="/breathe">#1</Link>
        <Link className="sketch-link" to="/dark-net">#2</Link>
        <Link className="sketch-link" to="/rose-hand">#3</Link>
        <Link className="sketch-link" to="/sun-grows">#4</Link>
        <Link className="sketch-link" to="/jelly-fish">#5</Link>
        <Link className="sketch-link" to="/variation">#6</Link>
        {/* <Link className="sketch-link" to="/eeeee">#eeeee</Link> */}
      </div>
    )
  }
}
