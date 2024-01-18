import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReservedList from '../ReservationList';


const Stack = createStackNavigator();
const ReservedListNav = () => {
    return (
      <Stack.Navigator initialRouteName="Reserved List">
      <Stack.Screen name="Reserved List" component={ReservedList}   options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  };
  export default ReservedListNav;