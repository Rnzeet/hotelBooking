import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Home from "./Home";
import Login from "./Screens/Login";
import Main from "./Screens/Main";
const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen
            name="Main" component={Main}
            >

            </Drawer.Screen>
            <Drawer.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="login"
                component={Login}
                options={{ headerShown: true }}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;
