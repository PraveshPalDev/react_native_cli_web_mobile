import React from 'react';
import {Platform} from 'react-native';

const LottieWrapper = ({source, autoPlay = true, loop = true, style}) => {
  if (Platform.OS === 'web') {
    const Lottie = require('lottie-react').default;

    return (
      <Lottie
        animationData={source}
        autoplay={autoPlay}
        loop={loop}
        style={style}
      />
    );
  } else {
    const Lottie = require('lottie-react-native').default;

    return (
      <Lottie source={source} autoPlay={autoPlay} loop={loop} style={style} />
    );
  }
};

export default LottieWrapper;
