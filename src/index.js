import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'
import App from './App';

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const store = createStore(rootReducer, undefined, middlewareEnhancer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

