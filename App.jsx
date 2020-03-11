import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StoreProvider } from './src/mainStore';
import MainPage from './src/containers/MainPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default function App() {
  return (
    <StoreProvider>
      <View style={styles.container}>
        <MainPage />
      </View>
    </StoreProvider>
  );
}
