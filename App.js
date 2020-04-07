/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import reducer from './src/reducers/reducers';
import RootContainer from './src/components/RootContainer';

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware, thunk, logger),
);

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <SafeAreaView>
          <View style={styles.app}>
            <RootContainer />
          </View>
        </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
});

export default App;
