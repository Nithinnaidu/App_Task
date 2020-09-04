import React, { Component } from "react";
import AppContainer from './app/containers/AppContainer';
import DashboardView from './app/containers/dashboard/dashboard';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import peopleReducer from "./app/redux/reducers/peopleReducer";
import { Router, Scene } from 'react-native-router-flux';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(peopleReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="home" component={AppContainer} title="Home" initial={true} />
            <Scene key="about" component={DashboardView} title="About" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

