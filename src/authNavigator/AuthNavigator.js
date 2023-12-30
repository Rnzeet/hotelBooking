// IndependentNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import AppStack from '../AppStack';
import CheckOutNav from '../Screens/CheckOut/CheckOutNav';
import Main from '../Screens/Main';
import CheckInNav from '../Screens/CheckIn/CheckInNav';
import HomeNav from '../Screens/HomeNav/HomeNav';
import CheckInDetailsScreen from '../Screens/CheckInDetailsScreen';
import CheckOutDetailsScreen from '../Screens/CheckOutDetailsScreen';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LogIn} options={{headerShown:false}} />
      <Stack.Screen name="signUp" component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="appStack" component={AppStack} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={HomeNav} options={{headerShown:false}}/>
      <Stack.Screen name="CheckInDetailsScreen" component={CheckInDetailsScreen} options={{headerShown:true}}/>
      <Stack.Screen name="CheckOutDetailsScreen" component={CheckOutDetailsScreen}   options={{ headerShown: true }} />


    </Stack.Navigator>
  );
};

export default AuthNavigator;
