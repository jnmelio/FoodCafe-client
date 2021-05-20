import React, { Component } from 'react'
import LottieControl from './LottieControl'
import data from '../../animations/404.json'
import { Switch, Route, withRouter, Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="four">Oops this page is not ready yet. Please use the link below to go back to the Home page</h1>
        <Link to="/" className="linkFour">Click here</Link>
        <LottieControl animation={data} width={1000} height={720}/>
      </div>
    )
  }
}

export default NotFound