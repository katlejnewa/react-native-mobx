import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';

import { baseURL } from './config';

async function fetchData(url, options) {
  const response = await fetch(baseURL + url, {
    method: options.method,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  return response.json();
}

async function getData(url) {
  return fetchData(url, { method: 'GET' });
}

const sources = {
  countries: '/countries',
  currencies: '/currencies',
};

const mappers = {
  countries: (item) => ({
    id: item._id,
    value: item.translations.en,
    currency: item.preferredCurrency.name,
  }),
  currencies: (item) => ({
    id: item._id,
    value: item.translations.en,
  }),
};

const keys = {
  currencies: 'currentCurrency',
  countries: 'currentCountry',
};

class MainStore {
  @observable
  data = {
    countries: [],
    currencies: [],
  };

  @observable
  currentCountry = null;

  @observable
  currentCurrency = null;

  @observable
  currencySetManual = null;

  getCountryDefaultCurrency(countryName) {
    if (this.data.countries.length === 0) {
      return null;
    }
    const countryIndex = this.data.countries.findIndex((country) => country.value === countryName);
    if (countryIndex === -1) {
      return null;
    }
    return this.data.countries[countryIndex].currency;
  }

  @action
  getCurrent(source) {
    return this[keys[source]];
  }

  @action
  getSourceArray(source) {
    return this.data[source] || [];
  }

  @action
  setCurrent(source, textValue, isManual) {
    const thisKey = keys[source];
    this[thisKey] = textValue;
    AsyncStorage.setItem(keys[source], textValue);

    if (source === 'currencies') {
      this.currentCurrency = textValue;
      this.currencySetManual = isManual;
    } else if (source === 'countries' && !this.currencySetManual) {
      this.currentCountry = textValue;
      const currentCurrency = this.getCountryDefaultCurrency(textValue);
      this.setCurrent('currencies', currentCurrency, false);
    }
  }

  @action
  async pullData(source) {
    try {
      const { items } = await getData(sources[source]);
      this.data[source] = [].concat([{ id: '', value: '', currency: '' }], items.map(mappers[source]));
    } catch (ex) {
      console.log(ex);
    }
  }
}

const storeInstance = new MainStore();
const StoreContext = React.createContext(storeInstance);

export const StoreProvider = ({ children }) => {
  const store = storeInstance;
  useEffect(() => {
    (async () => {
      const currentCountryP = AsyncStorage.getItem('currentCountry');
      const currentCurrencyP = AsyncStorage.getItem('currentCurrency');

      store.currentCurrency = await currentCurrencyP || store.currentCurrency;
      store.currentCountry = await currentCountryP || store.currentCountry;
    })();
  }, []);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
