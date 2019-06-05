import React, { Component } from 'react';
import './App.scss';
import Carousel from './carousel/carousel';

class App extends Component {
  render() {
    return (
      <div className="app" role="main">
        <div className="app-header">
          <h1 tabIndex="0">Carousel Test</h1>
        </div>
       <div className="carousel-wrapper"><Carousel /></div>
      </div>
    );
  }
}

export default App;
