import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import CloseButtonIcon from '../../../../assets/svg/CloseButtonIcon.svg';

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#F1F4F8',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 10,
  },
  icon: {
    width: 12,
    height: 12,
  },
});

const CloseButton = () => (
  <TouchableOpacity style={styles.container}>
    <CloseButtonIcon style={styles.icon} />
  </TouchableOpacity>
);
export default CloseButton;
