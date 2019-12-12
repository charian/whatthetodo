// SignUp.js
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  //   handleSignUp = () => {

  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(this.state.email, this.state.password)
  //       .then(() => this.props.navigation.navigate('Main'))
  //       .catch(error => console.log({error}));
  //     console.log('handleSignUp' + this.state.email + this.state.password);
  //   };

  register = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'));
    } catch (e) {
      console.warn(e.message.replace(/ *\[[^)]*\] */g, ''));
      this.setState({
        errorMessage: e.message.replace(/ *\[[^)]*\] */g, ''),
      });
      //   console.error(e.message);
      return;
    } finally {
      console.log('finally');
      return;
    }
  };

  componentDidMount = async () => {
    console.log('signup page');
    await analytics().setCurrentScreen('screen-signup', 'screen-signup');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          value={this.state.email}
          style={styles.textInput}
          onChangeText={email =>
            this.setState({email}, console.log(this.state.email))
          }
          placeholder="Input Login Email"
          type="email"
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password =>
            this.setState({password}, console.log(this.state.password))
          }
          value={this.state.password}
        />

        <StyledBtn onPress={this.register} title="Sign Up">
          <StyledText>Sign Up</StyledText>
        </StyledBtn>

        <StyledBtn
          onPress={() => this.props.navigation.navigate('Login')}
          type="primary">
          <StyledText>Already have an account? Login</StyledText>
        </StyledBtn>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});
