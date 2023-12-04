import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Main from "./Screens/Main";
import CheckInList from "./Screens/CheckInList";
import CheckOutList from "./Screens/CheckOutList";
import CreateBooking from "./Screens/Booking/CreateBooking";
import NightAudit from "./Screens/NightAudit";
import RoomAvailabilityScreen from "./Screens/HouseKeeping";
import CancelledBookingNav from "./Screens/CancelledBooking/CancelledBookingNav";
import DashboardScreen from "./components/ChartScreen";

const Drawer = createDrawerNavigator();
const AppStack = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>                
            <Drawer.Screen
            name="Home" component={Main}
            >
            </Drawer.Screen>
             <Drawer.Screen
               name="Dashboard"
                component={DashboardScreen}
               options={{ headerShown: false }}
                />
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
                name="Night Audit"
                component={NightAudit}
            />
            <Drawer.Screen
              name="House Keeping"
              component={RoomAvailabilityScreen}
             />
                <Drawer.Screen
               name="Cancelled Booking"
               component={CancelledBookingNav}
               options={{ headerShown: false }}
                />
        </Drawer.Navigator>
    );
};


export default AppStack;
