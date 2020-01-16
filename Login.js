// Login.js
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import amplitude from 'amplitude-js';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import * as Animatable from 'react-native-animatable';

import {Button, Input} from '@ui-kitten/components';

const Login = props => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    trackScreenView('screen-login');
    // async function firebaseInit() {
    //   await analytics().setCurrentScreen('screen-login', 'screen-login');
    // }
    amplitude.getInstance().init('fce09f2307caa48fe7625001887970e9');
  }, []);

  async function trackScreenView(screen) {
    // Set & override the MainActivity screen name
    await analytics().setCurrentScreen(screen, screen);
  }

  async function handleLogin() {
    console.log(email);
    if (email === '' || password === '') {
      setErrorMessage('Email or Password is Empty');
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        setErrorMessage(e.message.replace(/ *\[[^)]*\] */g, ''));
      }
    }
  }

  async function loginWithFacebook() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        //throw new Error('User cancelled request');
        await analytics().logEvent('login_cancell', {method: 'facebook'});
        alert('Login was cancelled');
        //console.log('user has cancelled' + result.isCancelled);
      } else if (result.isCancelled === false) {
        await analytics().logLogin({
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
  }

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="slideInDown"
        iterationCount="infinite"
        direction="alternate"
        style={{fontFamily: 'NanumSquareRoundEB'}}>
        Up and down you go
      </Animatable.Text>
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      <Input
        placeholder="Your Email"
        onChangeText={e => setEmail(e)}
        size="large"
        style={{borderRadius: 30}}
      />
      <Input
        placeholder="Your Password"
        onChangeText={e => setPassword(e)}
        size="large"
        style={{
          borderRadius: 30,
          fontFamily: 'NanumSquareRoundEB',
        }}
      />
      <Button
        onPress={handleLogin}
        status="info"
        size="large"
        style={{
          borderRadius: 30,
          width: '100%',
        }}>
        Sign In
      </Button>
      <Button
        onPress={loginWithFacebook}
        style={{
          borderRadius: 30,
        }}>
        Login with facebook
      </Button>
      <Text style={{fontFamily: 'NanumSquareRoundEB'}}>
        Didn’t have email account yet?
      </Text>
      <Button
        onPress={() => props.navigation.navigate('SignUp')}
        status="info"
        appearance="ghost">
        Email Sign Up
      </Button>
    </View>
  );
};

export default Login;

// bundle com.heebeancreative.whatthetodo
// sku WTD

// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: '',
//       errorMessage: null,
//       productList: [],
//       receipt: '',
//       availableItemsMessage: '',
//     };
//   }
//   //   componentDidMount = async () => {
//   //     console.log('login page');
//   //     await analytics().setCurrentScreen('screen-login', 'screen-login');
//   //   };

//   loginWithFacebook = async () => {
//     try {
//       const result = await LoginManager.logInWithPermissions([
//         'public_profile',
//         'email',
//       ]);

//       if (result.isCancelled) {
//         // handle this however suites the flow of your app
//         //throw new Error('User cancelled request');
//         await firebase
//           .analytics()
//           .logEvent('login_cancell', {method: 'facebook'});
//         alert('Login was cancelled');
//         //console.log('user has cancelled' + result.isCancelled);
//       } else if (result.isCancelled === false) {
//         await firebase.analytics().logLogin({
//           method: 'facebook',
//         });
//         amplitude.getInstance().logEvent('login');
//         console.log(
//           `Login success with permissions: ${result.grantedPermissions.toString()}`,
//         );

//         // get the access token
//         const data = await AccessToken.getCurrentAccessToken();

//         if (!data) {
//           // handle this however suites the flow of your app
//           throw new Error(
//             'Something went wrong obtaining the users access token',
//           );
//         }

//         // create a new firebase credential with the token
//         const credential = firebase.auth.FacebookAuthProvider.credential(
//           data.accessToken,
//         );

//         // login with credential
//         const firebaseUserCredential = await firebase
//           .auth()
//           .signInWithCredential(credential);

//         console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
//       } else {
//         alert('User Cancelled');
//       }
//     } catch (e) {
//       alert('ERROR' + e);
//     }
//   };

//   handleLogin = () => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(this.state.email, this.state.password)
//       .then(() =>
//         this.props.navigation.navigate(
//           'Main'.catch(error => this.setState({errorMessage: error.message})),
//         ),
//       );
//     console.log('handleLogin');
//   };

//   render() {
//     console.log(this);
//     return (

//     );
//   }
// }
const styles = StyleSheet.create({
  customfonts: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
});
