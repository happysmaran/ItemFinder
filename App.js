import * as React from 'react';
import { Text, View } from 'react-native';
import AssignItemScreen from './screens/AssignItemScreen';
import FindItemScreen from './screens/FindItemScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
  
        <AppContainer/>
    
    );
  }
}

const AppNavigator = createSwitchNavigator({
  AssignItemScreen:AssignItemScreen,
  FindItemScreen:FindItemScreen,
});

const AppContainer=createAppContainer(AppNavigator);
