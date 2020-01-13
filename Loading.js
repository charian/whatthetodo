import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

//import auth from '@react-native-firebase/auth';

const Loading = props => {
  useEffect(() => {
    console.log('Loading');
    console.log(firebase.auth());
    analytics().setCurrentScreen('screen-loading');
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'Main' : 'Login');
    });
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;

// export default class Loading extends React.Component {
//   componentDidMount = async () => {
//     console.log('loading page');
//     console.log(this.props);
//     await analytics().setCurrentScreen('screen-loading');
//     firebase.auth().onAuthStateChanged(user => {
//       this.props.navigation.navigate(user ? 'Main' : 'Login');
//     });
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Loading</Text>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
