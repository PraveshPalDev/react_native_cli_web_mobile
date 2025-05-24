import React from 'react';
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native';

export default function Button({onPress, title}) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#AAF')}>
      <View style={styles.button}>
        <Text style={styles.text}>{title} (Android)</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3DDC84',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
