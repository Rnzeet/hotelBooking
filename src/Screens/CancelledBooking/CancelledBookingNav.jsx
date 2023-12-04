import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CancelledBookingScreen from '../CancelledBooking';
import CancelledDetailsScreen from '../CancelledDetails';


const Stack = createStackNavigator();
const CancelledBookingNav = () => {
    return (
      <Stack.Navigator initialRouteName="Cancelled Booking">
        <Stack.Screen name="Cancelled Booking" component={CancelledBookingScreen}   options={{ headerShown: false }} />
        <Stack.Screen name="Cancelled Details" component={CancelledDetailsScreen}   options={{ headerShown: true }}/>
      </Stack.Navigator>
    );
  };
  export default CancelledBookingNav;