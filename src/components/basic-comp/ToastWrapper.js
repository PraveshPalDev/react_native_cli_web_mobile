import React from 'react';
import {Platform} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Toaster} from 'react-hot-toast';
import fontFamily from '../../styles/fontFamily';
import {textScale} from '../../styles/responsiveSize';

const ToastWrapper = () => {
  if (Platform.OS === 'web') {
    return <Toaster position="top-center" />;
  }

  return (
    <FlashMessage
      position="top"
      titleStyle={{
        fontFamily: fontFamily.mornRegular,
        fontSize: textScale(14),
      }}
    />
  );
};

export default ToastWrapper;
