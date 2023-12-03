import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Setting from './Setting';
import Product from './Product';
import { FontAwesome5 } from '@expo/vector-icons';

const Bottom = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen
        name="DashBoard"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={"#0186C1"} />
          ),
          headerShown: false,
        }}
      />
      {/* <Bottom.Screen
        name="HouseKeeping"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="broom" size={size} color="#0186C1" />
          ),
          headerShown: false,
        }}
      /> */}
      <Bottom.Screen
        name="Profile"
        component={Product}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="building" size={size} color="#0186C1" />
          ),
          headerShown: false,
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigation;
