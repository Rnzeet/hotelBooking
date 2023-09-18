import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen';
import Setting from './Setting';
import Product from './Product';
const Bottom = createBottomTabNavigator();
const BottomNavigation = () => {
    return (
        <Bottom.Navigator>
            <Bottom.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }} />
            <Bottom.Screen
                name="Settings"
                component={Setting}
                options={{ headerShown: false }}
            />
            <Bottom.Screen
                name="Product"
                component={Product}
                options={{ headerShown: false }}
            />

        </Bottom.Navigator>
    )
}

export default BottomNavigation