import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import {Provider} from 'react-redux';
import store from './store/Store';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <div>
       <Provider store={store}>
        <Router/>
       </Provider>
       </div>

    );
  }
}

export default App;
