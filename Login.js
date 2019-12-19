// Login.js
import React from 'react';
import {StyleSheet, Text, TextInput, View, Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import amplitude from 'amplitude-js';
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import styled, {ThemeProvider} from 'styled-components';
import basic from './theme/basic';
import light from './theme/light';
import * as Animatable from 'react-native-animatable';
import {Button} from '@ui-kitten/components';

amplitude.getInstance().init('fce09f2307caa48fe7625001887970e9');
// bundle com.heebeancreative.whatthetodo
// sku WTD

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      productList: [],
      receipt: '',
      availableItemsMessage: '',
    };
  }
  componentDidMount = async () => {
    console.log('login page');
    await analytics().setCurrentScreen('screen-login', 'screen-login');
    // try {
    //   const products = await RNIap.getProducts(itemSkus);
    //   this.setState({productList: products});
    //   console.log(this.state.productList);
    // } catch (err) {
    //   console.warn(err); // standardized err.code and err.message available
    // }
  };

  loginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        //throw new Error('User cancelled request');
        await firebase
          .analytics()
          .logEvent('login_cancell', {method: 'facebook'});
        alert('Login was cancelled');
        //console.log('user has cancelled' + result.isCancelled);
      } else if (result.isCancelled === false) {
        await firebase.analytics().logLogin({
          method: 'facebook',
        });
        amplitude.getInstance().logEvent('login');
        console.log(
          `Login success with permissions: ${result.grantedPermissions.toString()}`,
        );

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          // handle this however suites the flow of your app
          throw new Error(
            'Something went wrong obtaining the users access token',
          );
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken,
        );

        // login with credential
        const firebaseUserCredential = await firebase
          .auth()
          .signInWithCredential(credential);

        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
      } else {
        alert('User Cancelled');
      }
    } catch (e) {
      alert('ERROR' + e);
    }
  };

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() =>
        this.props.navigation.navigate(
          'Main'.catch(error => this.setState({errorMessage: error.message})),
        ),
      );
    console.log('handleLogin');
  };

  render() {
    console.log(this);
    return (
      <View style={styles.container}>
        <Animatable.Text
          animation="slideInDown"
          iterationCount="infinite"
          direction="alternate">
          Up and down you go
        </Animatable.Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <Button onPress={this.handleLogin} status="info">
          Login
        </Button>
        <Button onPress={this.loginWithFacebook}>Login with facebook</Button>

        <Button
          onPress={() => this.props.navigation.navigate('SignUp')}
          appearance="ghost">
          Don't have an account? Sign Up
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  customfonts: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
