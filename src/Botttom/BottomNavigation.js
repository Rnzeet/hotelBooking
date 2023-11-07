import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen';
import Setting from './Setting';
import Product from './Product';
import { FontAwesome } from '@expo/vector-icons';

const Bottom = createBottomTabNavigator();
const BottomNavigation = () => {
    
    return (
        <Bottom.Navigator>
            <Bottom.Screen
                name="DashBoard"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color,size}) => {
                        <FontAwesome name="home" size={size} color={"black"} />
                    },
                    headerShown: false
                }} />
            <Bottom.Screen
                name="Settings"
                component={Setting}
                options={{
                    tabBarIcon: () => {
                        <FontAwesome name="setting" size={24} color="black" />
                    },
                    headerShown: false
                }}
            />
            <Bottom.Screen
                name="Product"
                component={Product}
                options={{
                    tabBarIcon: () => {
                        <FontAwesome name="building" size={24} color="black" />
                    },
                    headerShown: false
                }}
            />

        </Bottom.Navigator>
    )
}

export default BottomNavigation