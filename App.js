import React, {Fragment, useEffect} from 'react';

import Loading from './Loading';
import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import {ApplicationProvider} from '@ui-kitten/components';
import {mapping, light as theme} from '@eva-design/eva';
import {default as customMapping} from './custom-mapping.json';

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

export default () => (
  <ApplicationProvider
    mapping={mapping}
    theme={theme}
    customMapping={customMapping}>
    <AppContainer />
  </ApplicationProvider>
);
