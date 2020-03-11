import React, { memo, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { observer, useObserver } from 'mobx-react-lite';

import SelectIcon from '../../../../assets/svg/SelectIcon.svg';
import { useStore } from '../../../mainStore.jsx';

const styles = StyleSheet.create({
  container: {
    width: 137,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F4F8',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    width: 12,
    height: 7,
  },
  title: {
    fontSize: 16,
    color: '#505B76',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  value: {
    fontSize: 16,
    color: '#505B76',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  list: {
    height: 111,
    position: 'absolute',
    zIndex: 1,
    top: 25,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 137,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F4F8',
  },

});
const Item = ({ value, selectItem }) => (
  <TouchableOpacity style={styles.item} onPress={selectItem}>
    <Text style={styles.value}>{value}</Text>
  </TouchableOpacity>
);

const Select = observer((props) => {
  const { source } = props;
  const store = useStore();

  const {
    currentCountry, currentCurrency,
  } = store;

  const data = store.getSourceArray(source);
  let currentValue;
  if (source === 'currencies') {
    currentValue = currentCurrency;
  } else {
    currentValue = currentCountry;
  }

  useEffect(() => {
    (async () => {
      await store.pullData(source);
    })();
  }, []);
  const [visibleList, setVisibleList] = useState(false);
  const showFlatList = () => {
    const mode = !visibleList;
    setVisibleList(mode);
  };
  const selectItem = (value) => {
    store.setCurrent(source, value);
    setVisibleList(false);
  };
  return useObserver(() => (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentValue}
      </Text>
      <TouchableOpacity style={styles.icon} onPress={showFlatList}>
        <SelectIcon style={styles.icon} />
      </TouchableOpacity>
      {visibleList && (
      <FlatList
        style={styles.list}
        scrollEventThrottle={16}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Item
            value={item.value}
            key={item.id}
            selectItem={() => selectItem(item.value)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      )}
    </View>
  ));
});

Select.propTypes = {
  source: PropTypes.string,
};
Select.defaultProps = {
  source: '',
};
Item.propTypes = {
  value: PropTypes.string,
  selectItem: PropTypes.func,
};
Item.defaultProps = {
  value: '',
  selectItem() {},
};
export default memo(Select);
