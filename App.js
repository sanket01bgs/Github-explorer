import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import rootReducer from './src/redux/reducers';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GitHub Explorer' }} />
              <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Repository Details' }} />
              <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}