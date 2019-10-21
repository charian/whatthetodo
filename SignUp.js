// SignUp.js
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {Button, InputItem} from '@ant-design/react-native';
import styled from 'styled-components';
import basicTheme from './theme/basic';

export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleSignUp = () => {
    // TODO: Firebase stuff...
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(() => this.props.navigation.navigate('Main'))
    //   .catch(error => this.setState({errorMessage: error.message}));
    //console.log('handleSignUp' + this.state.email + this.state.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <StyledText>Sign Up</StyledText>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <InputItem
          clear
          value={this.state.email}
          onChange={email => this.setState({email})}
          placeholder="Input Login Email"
          type="email"
        />
        {/* <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        /> */}
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        {/* <basicTheme.StyledBtn onPress={this.handleSignUp} title="Sign Up">
          <basicTheme.StyledText>Sign Up</basicTheme.StyledText>
        </basicTheme.StyledBtn> */}
        <Button
          onPress={() => this.props.navigation.navigate('Login')}
          type="primary">
          Already have an account? Login
        </Button>
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
