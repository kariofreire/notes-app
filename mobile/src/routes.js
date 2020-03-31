import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

import logo from './assets/logo.png';

const AppStack = createStackNavigator();

const options = {
  headerTitle: () => <Image source={logo}/>,
  headerTitleAlign: 'center',
}

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={options}>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Add" component={AddTask} />
        <AppStack.Screen name="Edit" component={EditTask} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}