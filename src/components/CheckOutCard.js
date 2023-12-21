import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firstLastCharater } from './SimpleCard';


const CheckOutCard = ({ checkOutDatas }) => {
const navigation = useNavigation();
const [hotelCode, setHotelCode] = useState('');
AsyncStorage.getItem('userData')
.then((userDataString) => {
  if (userDataString) {
    // Convert the stored string back to an object (you can use JSON.parse)
    const userData = JSON.parse(userDataString);

  
    setHotelCode(userData.hotel_code)
    // console.log('User Data:', logoPath);
  } else {
    console.log('User data not found.');
  }
})
.catch((error) => {
  console.error('Error retrieving user data:', error);
});
const handleClick=()=>{
  navigation.navigate("CheckOutDetailsScreen" ,item={checkOutDatas,hotelCode})
}
console.log(checkOutDatas?.booking_status,"datas")
  return (
    <TouchableOpacity onPress={handleClick}>
    <View style={styles.container}>
      <View style={styles.roomType}>
        <Text>
          {firstLastCharater(checkOutDatas?.hotel_name)}
        </Text>
      </View>
      <View>
        <Text>
          {checkOutDatas?.guest_first_name}
        </Text>
        <Text>
          {`#${checkOutDatas?.guest_id}`}
        </Text>
        <Text>
          {`${checkOutDatas?.from_date} > ${checkOutDatas?.to_date}`}
        </Text>
      </View>
      <View >
        <View>
          <Text>{`₹ ${checkOutDatas?.total_sale_amount}`}
          </Text>
        </View>
        <View>
          <Text>
            {`N X ${checkOutDatas?.no_of_nights} G X ${checkOutDatas?.no_of_adults + checkOutDatas?.no_of_children}`}
          </Text>
        </View>
      </View>
      {/* <View style={styles.verticle}>
        <FontAwesome name="ellipsis-v" size={20} color="black" />
      </View> */}
    </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingRight:15,
  },
  roomType: {
    backgroundColor: '#FECD00',
    color: '#fff',
    borderRadius: 50,
    padding: 5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: 'white'
  },
  verticle:{
    width:5,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
  }
})
export default CheckOutCard