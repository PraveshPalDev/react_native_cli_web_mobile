import React, {useEffect, useRef} from 'react';
import {Alert, BackHandler, Linking, Platform, AppState} from 'react-native';
import VersionCheck from 'react-native-version-check';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {appPlayStore_URL, appStore_URL} from '../../config/urls';
import {setConnectivity} from '../../redux/reducers/Internet';

const ForceUpdateWrapper = ({children}) => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  const checkUpdate = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();

      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update',
          'To continue using the app, please update to the latest version.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(
                  Platform.OS === 'ios' ? appStore_URL : appPlayStore_URL,
                );
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (err) {
      console.log('Error checking update:', err);
    }
  };

  useEffect(() => {
    checkUpdate();

    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(
        setConnectivity({
          isConnected: state.isConnected,
        }),
      );
    });

    // Set up AppState listener to detect when the app comes to the foreground
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        checkUpdate();
      }
      appState.current = nextAppState;
    };

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      unsubscribe();
      appStateSubscription.remove();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default ForceUpdateWrapper;
