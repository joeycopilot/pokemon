import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.scss';
import Pokemon from './layouts/pokemon/pokemon'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Pokemon {...this.props} />
      </div>
    );
  }
}



export default connect(s => s)(App)
