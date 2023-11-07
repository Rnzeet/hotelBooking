// IndependentNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import AppStack from '../AppStack';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LogIn} options={{headerShown:false}} />
      <Stack.Screen name="signUp" component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="appStack" component={AppStack} options={{headerShown:false}}/>

    </Stack.Navigator>
  );
};

export default AuthNavigator;
