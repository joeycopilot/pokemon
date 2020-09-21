import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.scss';
import Search from './layouts/search/search'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Search {...this.props} />
      </div>
    );
  }
}



export default connect(s => s)(App)
