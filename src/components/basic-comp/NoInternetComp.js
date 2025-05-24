import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../../styles/responsiveSize';
import LottieView from 'lottie-react-native';
import colors from '../../styles/colors';
import BottomSheetComp from '../common/BottomSheetComp';

const NoInternetWrapper = ({children}) => {
  const [isOffline, setIsOffline] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = [height * 0.3, height * 0.75];

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        setIsOffline(true);
      } else if (state.isConnected === true) {
        setIsOffline(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOffline) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOffline]);

  return (
    <View style={styles.container}>
      {children}

      <BottomSheetComp ref={bottomSheetRef} snapPointsProp={snapPoints}>
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <LottieView
              source={require('../../assets/animation/NoInternetImage/NoInternet2.json')}
              autoPlay
              loop
              style={styles.imageStyles}
            />

            <View style={styles.content}>
              <Text style={styles.text}>No Internet Connection</Text>
              <Text style={styles.subText}>
                Please check your network settings
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetComp>
    </View>
  );
};

export default NoInternetWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
  },

  imageStyles: {
    width: width / 1,
    height: height / 2.2,
  },
  illustrationContainer: {
    marginVertical: moderateScale(15),
  },

  text: {
    fontSize: textScale(22),
    fontWeight: 'bold',
    color: colors.purple,
    fontStyle: 'italic',
  },
  subText: {
    fontSize: textScale(16),
    color: colors.black,
    marginTop: moderateScale(5),
    fontStyle: 'italic',
  },
});
