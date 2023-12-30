// AppStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckInNav from '../CheckIn/CheckInNav';
import CheckOutNav from '../CheckOut/CheckOutNav';
import BookingCalendar from "../../Screens/TapeChart";
import HomeScreen from '../../Botttom/HomeScreen';
import CheckInDetailsScreen from '../CheckInDetailsScreen';
const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CheckInDetailsScreen" component={CheckInDetailsScreen}   options={{ headerShown: true, tabBarVisible: false }} />

      {/* <Stack.Screen name="TapeChart" component={BookingCalendar} options={{headerShown:false}}/>
      <Stack.Screen name="Check In List" component={CheckInNav} options={{headerShown:false}}/>
      <Stack.Screen name="Check Out List" component={CheckOutNav} options={{headerShown:false}}/> */}
      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

export default HomeNav;
