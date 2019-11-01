import React, {Fragment, useEffect} from 'react';

import Loading from './Loading';
import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

const App = createAnimatedSwitchNavigator(
  {
    Loading: {screen: Loading},
    SignUp: {screen: SignUp},
    Login: {screen: Login},
    Main: {screen: Main},
  },
  {
    initialRouteName: 'Loading',
  },
);
const AppContainer = createAppContainer(App);

<AppContainer
  ref={nav => {
    this.navigator = nav;
  }}
/>;

export default AppContainer;
