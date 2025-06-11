import 'react-native-gesture-handler';
import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ConnectivityProvider from './src/components/basic-comp/ConnectivityProvider';
import NoInternetWrapper from './src/components/basic-comp/NoInternetComp';
import ForceUpdateWrapper from './src/components/basic-comp/ForceUpdateWrapper';
import Routes from './src/navigation/Routes';
import ToastWrapper from './src/components/basic-comp/ToastWrapper';

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <ConnectivityProvider>
          <NoInternetWrapper>
            <ForceUpdateWrapper>
              <Routes />
              <ToastWrapper />
            </ForceUpdateWrapper>
          </NoInternetWrapper>
        </ConnectivityProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
