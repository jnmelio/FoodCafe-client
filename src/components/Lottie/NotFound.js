import React, { Component } from 'react'
import LottieControl from './LottieControl'
import data from '../../animations/404.json'

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>Dev are lazy</h2>
        <LottieControl animation={data} width={1000} height={720}/>
      </div>
    )
  }
}

export default NotFound