import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

//import auth from '@react-native-firebase/auth';

export default class Loading extends React.Component {
  componentDidMount = async () => {
    console.log('loading page');
    await analytics().setCurrentScreen('screen-loading');
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUp');
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
});
