import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {setConnectivity} from '../../redux/reducers/Internet';

const ConnectivityProvider = ({children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setConnectivity(state.isConnected));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default ConnectivityProvider;
