import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckOutDetailsScreen from '../CheckOutDetailsScreen';
import CheckOutList from '../CheckOutList';


const Stack = createStackNavigator();
const CheckOutNav = () => {
    return (
      <Stack.Navigator initialRouteName="Check Out List">
      <Stack.Screen name="Check Out List" component={CheckOutList}   options={{ headerShown: false }} />
        <Stack.Screen name="CheckOutDetailsScreen" component={CheckOutDetailsScreen}   options={{ headerShown: true }} />
      </Stack.Navigator>
    );
  };
  export default CheckOutNav;