import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import WrapperContainer from '../../components/common/WrapperContainer';

export default function Login() {
  return (
    <WrapperContainer>
      <Text>Login</Text>
      <Icon name="rocket" size={30} color="#900" />
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
