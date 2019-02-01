import React, { Component } from 'react';
import { Provider } from "react-redux";
import configureStore from "./store/store";
import SocketSagaTest from "./SocketSagaTest";

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <SocketSagaTest />
      </Provider>
    );
  }
}

export default Root;
