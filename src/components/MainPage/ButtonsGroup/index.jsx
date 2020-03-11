import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../Button';

const styles = StyleSheet.create({
  container: {
    width: 343,
    height: 72,
    borderRadius: 76,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  lastButton: {
    marginLeft: 'auto',
    marginRight: 0,
  },
});

const ButtonsGroup = () => {
  const buttons = [
    { name: 'plus' },
    { name: 'user' },
    { name: 'clip' },
    { name: 'timer' },
    { name: 'microphone' },
    { name: 'raino', styles: styles.lastButton },
  ];
  return (
    <View style={styles.container}>
      {buttons.map((item) => (<Button name={item.name} styles={item.styles} key={item.name} />))}
    </View>
  );
};
export default ButtonsGroup;
