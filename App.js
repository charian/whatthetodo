import React from 'react';

import Loading from './Loading';
import SignUp from './SignUp';
import Login from './Login';
import Main from './Main';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import {ApplicationProvider} from '@ui-kitten/components';
import {mapping, light as lightTheme} from '@eva-design/eva';

import {default as customMapping} from './custom-mapping.json';
import {default as appTheme} from './theme/custom-theme.json'; // <-- Import app theme

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
const theme = {...lightTheme, ...appTheme};
export default () => (
  <ApplicationProvider
    mapping={mapping}
    theme={theme}
    customMapping={customMapping}>
    <AppContainer
    //   ref={nav => {
    //     this.navigator = nav;
    //   }}
    />
  </ApplicationProvider>
);
