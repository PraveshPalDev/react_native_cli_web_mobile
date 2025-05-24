import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {getData, storeData} from './helperFunctions';
import axios from 'axios';
import {apiGet} from './apiClient';
import {GET_ACCESS_TOKEN} from '../config/urls';

export const requestUserPermission = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    } else {
      console.log('ios notification permission denied');
      return false;
    }
  } else {
    try {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android notification permission granted');
        return true;
      } else if (status === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Android notification permission denied');
        return false;
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Android notification permission set to never ask again');
        return false;
      }
    } catch (error) {
      console.error('Error requesting Android notification permission:', error);
      return false;
    }
  }
};

export const storeFCMToken = async () => {
  const fcmToken = await getData('fcmToken');
  if (!fcmToken) {
    const fcmToken = await messaging().getToken();
    storeData('fcmToken', fcmToken).then(value => {
      console.log('New generated fcm token ==>', fcmToken);
    });
  } else {
    console.log('already generated fcm token ==>', fcmToken);
    return fcmToken;
  }
};

export const initializePushNotifications = async () => {
  await requestUserPermission();
  await storeFCMToken();
};

export async function onDisplayNotification(data) {
  await notifee.requestPermission();

  const randomId = `channel_${Math.random().toString(36).substring(2, 10)}`;
  const randomName = `Channel_${Date.now()}`;

  const channelId = await notifee.createChannel({
    id: randomId,
    name: randomName,
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
    },
    ios: {
      channelId,
    },
    data: data?.data,
  });
}

export const sendPushNotificationHandler = async data => {
  const url =
    'https://fcm.googleapis.com/v1/projects/icancaretest/messages:send';
  const accessToken = await getData('accessToken');
  const token = await getData('fcmToken');

  const message = {
    token: token,
    notification: {
      body: data?.body,
      title: data?.title,
    },
  };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, {message}, {headers});
    console.log('Push notification sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
};

export const getPushAccessToken = async () => {
  const accessToken = await apiGet(`${GET_ACCESS_TOKEN}`);
  storeData('accessToken', accessToken?.token);
  return accessToken;
};
