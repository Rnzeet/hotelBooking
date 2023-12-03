import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { userDataRemover } from "./APIS/Context";

const CustomDrawer = (props) => {
  const [logoPath, setLogoPath] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [hotelCode, setHotelCode] = useState("");
  const logOut = async () => {

    try {
     const res = await userDataRemover();
     console.log(res)
     if(res){
      alert("Logout Successfully")
       props.navigation.navigate('login')
     }
     else{
       alert("Something went wrong")
       props.navigation.navigate('login')
     }
    } catch (error) {
      alert(error)
    }
 
   }

  // Retrieve the data from AsyncStorage
  AsyncStorage.getItem('userData')
    .then((userDataString) => {
      if (userDataString) {
        // Convert the stored string back to an object (you can use JSON.parse)
        const userData = JSON.parse(userDataString);

        setLogoPath(userData.logo_file)
        setHotelName(userData.hotel_name)
        setHotelCode(userData.hotel_code)
        // console.log('User Data:', logoPath);
      } else {
        console.log('User data not found.');
      }
    })
    .catch((error) => {
      console.error('Error retrieving user data:', error);
    });

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#9288F9",
          marginTop: -50,
          zIndex: 10,
        }}
      >
        <ImageBackground
          source={require("./assets/background.jpg")}
          style={{ padding: 20 }}
        >
          <View style={styles.userAvatar}>
          <Image
            alt="Not find"
            source={{ uri:logoPath }}
            style={{ height: '50%', width: '100%' }}
          />
          </View>
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {hotelName}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Hotel Code : {hotelCode}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        
        <TouchableOpacity style={{ paddingVertical: 15 }}
         onPress={() => {logOut()}}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});
