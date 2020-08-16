<script src="http://localhost:8097"></script>

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Container, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, Style } from './Theme.style';

import AppNavigator from './navigation/AppNavigator';
import { Root } from 'native-base';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux';
import { locationReducer, selectLocation } from './reducers/locationReducer';
import LocationsService from './services/LocationsService';
import { viewNavReducer } from './reducers/viewNavReducer';

const store = createStore(combineReducers({
  location: locationReducer,
  viewNav: viewNavReducer,
}))

const initApp = async () => {
  const selectedLocation = await LocationsService.getLocationById("oakville");
  store.dispatch(selectLocation(selectedLocation));
}
initApp();

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // useEffect(() => {
  //   const setInitialAppState = async () => {
  //     const selectedLocation = await LocationsService.getLocationById("oakville");
  //     props.dispatch(selectLocation(selectedLocation));
  //   }
  //   setInitialAppState();
  // }, [])

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <Provider store={store}>
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <Root>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </Root>
      </Provider>
    );
  }
}


export default App;

async function loadResourcesAsync() {
  await Promise.all([
    // Asset.loadAsync([
    //   require('./assets/images/robot-dev.png'),
    //   require('./assets/images/robot-prod.png'),
    // ]),
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'Graphik-Regular-App': require('./assets/fonts/Graphik-Regular-App.ttf'),
      'Graphik-Medium-App': require('./assets/fonts/Graphik-Medium-App.ttf'),
      'Graphik-Bold-App': require('./assets/fonts/Graphik-Bold-App.ttf'),
      'Graphik-Semibold-App': require('./assets/fonts/Graphik-Semibold-App.ttf'),
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}