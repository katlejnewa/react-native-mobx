import React from 'react';
import { View, StyleSheet } from 'react-native';

import CloseButton from '../../components/MainPage/CloseButton';
import Select from '../../components/MainPage/Select';
import FormContainer from '../../../assets/svg/Union.svg';
import ButtonsGroup from '../../components/MainPage/ButtonsGroup';

const styles = StyleSheet.create({
  formContainer: {
    position: 'relative',
    width: 343,
    height: 217,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  selectRow: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    top: 80,
  },
});

const MainPage = () => (
  <View>
    <View style={styles.formContainer}>
      <CloseButton />
      <FormContainer />
      <View style={styles.selectRow}>
        <Select source="countries" />
        <Select source="currencies" />
      </View>
    </View>
    <ButtonsGroup />
  </View>
);

export default MainPage;
