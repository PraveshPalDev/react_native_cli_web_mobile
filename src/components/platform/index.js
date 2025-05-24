// src/components/index.js
import {Platform} from 'react-native';

let ButtonComp;

if (Platform.OS === 'android') {
  ButtonComp = require('./android/Button.android').default;
} else if (Platform.OS === 'ios') {
  ButtonComp = require('./ios/Button.ios').default;
} else {
  ButtonComp = require('./web/Button.web').default;
}

export {ButtonComp};
