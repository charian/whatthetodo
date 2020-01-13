import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styled} from '@ui-kitten/components';

class CircleButton extends React.Component {
  static styledComponentName = 'CircleButton'; // <-- This is important!

  render() {
    const {themedStyle, style, ...restProps} = this.props;

    return <TouchableOpacity style={[themedStyle, style]} {...restProps} />;
  }
}

export default styled(CircleButton);
