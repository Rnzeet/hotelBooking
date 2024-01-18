// IndependentNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RoomDetails from '../RoomDetails';
import StayDetails from '../StayDetails';
import CheckInFinal from '../CheckInFinal';

const Stack = createStackNavigator();

const CreateBooking = () => {
  return (
    <Stack.Navigator initialRouteName="Room Details">
      <Stack.Screen name="Room Details" component={RoomDetails} options={{headerShown:false}} />
      <Stack.Screen name="Guest Detail" component={StayDetails} options={{headerShown:true}}/>
      <Stack.Screen name="Reservation Detail" component={CheckInFinal} options={{headerShown:true}}/>

    </Stack.Navigator>
  );
};

export default CreateBooking;
