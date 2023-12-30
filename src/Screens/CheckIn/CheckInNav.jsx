import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CheckInDetailsScreen from '../CheckInDetailsScreen';
import CheckInList from '../CheckInList';


const Stack = createStackNavigator();
const CheckInNav = () => {
    return (
      <Stack.Navigator initialRouteName="Check In List">
      <Stack.Screen name="Check In List" component={CheckInList}   options={{ headerShown: false }} />
        <Stack.Screen name="CheckInDetailsScreen" component={CheckInDetailsScreen}   options={{ headerShown: true, tabBarVisible: false }} />
      </Stack.Navigator>
    );
  };
  export default CheckInNav;