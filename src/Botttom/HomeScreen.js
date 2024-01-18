import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookingCalendar from "../Screens/TapeChart";
import CheckInList from '../Screens/CheckInList';
import CheckOutList from '../Screens/CheckOutList';
import ReservedList from '../Screens/ReservationList';
const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
 

  return (
    <Tab.Navigator        screenOptions={{
       tabBarStyle: { backgroundColor: 'lightblue' },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'black',
      tabBarLabelStyle: { fontSize:12, fontWeight: 'bold' },
    }}
>
    {/* <Tab.Screen name="Calendar" component={BookingCalendar} /> */}
      <Tab.Screen name="Reserved" component={ReservedList}   />
      <Tab.Screen name="Checked-In" component={CheckInList}   />
      <Tab.Screen name="Checked-Out" component={CheckOutList} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

