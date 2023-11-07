import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Home from "./Home";
import Login from "./Screens/Login";
import Main from "./Screens/Main";
import CheckInList from "./Screens/CheckInList";
import CheckOutList from "./Screens/CheckOutList";
import RoomDetails from "./Screens/RoomDetails";
import StayDetails from "./Screens/StayDetails";
import SingleDetailsEdit from "./components/SingleDetailsEdit";
import CreateBooking from "./Screens/Booking/CreateBooking";
const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            
            <Drawer.Screen
            name="Dashboard" component={Main}
            >

            </Drawer.Screen>
            <Drawer.Screen
                name="Check In List"
                component={CheckInList}
                options={{ headerShown: true }}
            />
            <Drawer.Screen
                name="Check Out List"
                component={CheckOutList}
                options={{ headerShown: true }}
            />
            <Drawer.Screen
                name="Create Booking"
                component={CreateBooking}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
            />
             
        </Drawer.Navigator>
    );
};

export default AppStack;
