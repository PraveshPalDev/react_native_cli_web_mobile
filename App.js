import 'react-native-gesture-handler';
import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ConnectivityProvider from './src/components/basic-comp/ConnectivityProvider';
import NoInternetWrapper from './src/components/basic-comp/NoInternetComp';
import ForceUpdateWrapper from './src/components/basic-comp/ForceUpdateWrapper';
import FlashMessage from 'react-native-flash-message';
import fontFamily from './src/styles/fontFamily';
import {textScale} from './src/styles/responsiveSize';
import Routes from './src/navigation/Routes';

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <ConnectivityProvider>
          <NoInternetWrapper>
            <ForceUpdateWrapper>
              <Routes />
              <FlashMessage
                position={'top'}
                titleStyle={{
                  fontFamily: fontFamily.mornRegular,
                  fontSize: textScale(14),
                }}
              />
            </ForceUpdateWrapper>
          </NoInternetWrapper>
        </ConnectivityProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
