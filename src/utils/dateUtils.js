import {Alert} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';

export const getDeviceId = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  return deviceId;
};

export const convertFileToBase64 = async fileUrl => {
  try {
    if (!fileUrl) {
      throw new Error('File URL is invalid or empty.');
    }

    const fileUri = fileUrl.replace('file://', '');
    const base64String = await RNFS.readFile(fileUri, 'base64');
    return base64String;
  } catch (error) {
    console.error('Error converting file to Base64:', error);
    throw error;
  }
};

export const authenticateWithBiometrics = async () => {
  try {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (!available) {
      Alert.alert(
        'Biometrics not available',
        'This device does not have biometric authentication enabled.',
      );
      return false;
    }

    if (biometryType === BiometryTypes.TouchID) {
    } else if (biometryType === BiometryTypes.FaceID) {
    } else if (biometryType === BiometryTypes.Biometrics) {
    }

    const {success, error} = await rnBiometrics.simplePrompt({
      promptMessage: 'Authenticate to continue',
    });

    console.log('success =>', success);

    if (success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
