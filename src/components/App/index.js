import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import './index.css'

import Home from '../Home'
import Sketch from '../Sketch'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/:sketchName" component={Sketch} />
        </div>
      </Router>
    )
  }
}
