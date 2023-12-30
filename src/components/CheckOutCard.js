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

const fromDate = new Date(checkOutDatas.from_date);
const toDate = new Date(checkOutDatas.to_date);
const dateDifferenceInMilliseconds = toDate - fromDate;
const dateDifferenceInDays = dateDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

console.log(checkOutDatas, "days");
  return (
    <TouchableOpacity onPress={handleClick}>
    <View style={styles.container}>
    <View>
      <View style={styles.roomType}>
        <Text style={{fontSize:18}}>
          {firstLastCharater(checkOutDatas?.hotel_name)}
        </Text>
      </View>
      <View style={{backgroundColor:"orange",marginTop:3,borderRadius:7}}>
      <Text style={{marginLeft:10}}>
          {`#${checkOutDatas?.guest_id}`}
        </Text>
        </View>
        </View>
      <View>
        <Text style={{fontSize:16}}>
          {checkOutDatas?.guest_first_name}
        </Text>
        <Text style={{backgroundColor:"orange",marginVertical:5,borderRadius:7,marginRight:60}}>
          {`${checkOutDatas?.room_booking_info?.room_title}`}
        </Text>

        <Text style={{fontSize:16}}>
          {`${checkOutDatas?.from_date} > ${checkOutDatas?.to_date}`}
        </Text>
      </View>
      <View >
        <View>
          <Text style={{fontSize:16}}>{`₹ ${checkOutDatas?.total_sale_amount}`}
          </Text>
        </View>
        <View>
          <Text style={{fontSize:16,marginVertical:4}}>
            {`N X ${checkOutDatas?.no_of_nights} G X ${checkOutDatas?.no_of_adults + checkOutDatas?.no_of_children}`}
          </Text>
        </View>
        <View>
          <Text style={{textAlign:'right',fontSize:16}}>
            {dateDifferenceInDays}(N)
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