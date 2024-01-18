import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { firstLastCharater } from './SimpleCard';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';

const OtherGuestCard = ({ checkInDatas }) => {
  const [isModalVisible, setModalVisible] = useState(false);
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const close = () => {
    setModalVisible(false);
  }
const handleClick=()=>{
//   navigation.navigate("CheckInDetailsScreen" ,item={checkInDatas,hotelCode})
}
console.log(checkInDatas?.other_members,"hotelllllllll44343434l")
  return (
    <>
    <Text style={{marginTop:10 ,marginLeft:10,fontSize:16, backgroundColor:'#90EE90',
            padding:5,
            marginHorizontal:0,
            borderRadius:5}}>Other Members</Text>
    {checkInDatas?.other_members?.length >0 && checkInDatas?.other_members?.map((item, index) => (
        <TouchableOpacity key={index} onPress={handleClick}>
          <View style={styles.container}>
            <View style={styles.roomType}>
              {item.guest_data?.gender === 'Male' ? (
                <FontAwesome name="male" size={40} color="blue" />
              ) : (
                <FontAwesome name="female" size={40} color="pink" />
              )}
            </View>
            <View style={styles.detailsContainer}>
              <Text>{item?.first_name} {item?.last_name}</Text>
              <Text>{`${checkInDatas?.from_date} > ${checkInDatas?.to_date}`}</Text>
              <Text>{item.phone_number && `${item?.phone_number}`}</Text>
              <Text>{item.email && `${item?.email}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
      }
      </>
  )}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingRight:15,
    backgroundColor:"lightblue",
    marginTop:10,
    borderRadius:10,
    marginHorizontal:10
  },
//   FFF5EE
  roomType: {
    marginVertical:3,
    backgroundColor: 'white',
    color: '#fff',
    borderRadius: 10,
    padding: 5,
    width:"23%",
    // height:"80%",
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight:-20,
    borderRightWidth: 2,
    borderRightColor: 'white'
  },
  verticle: {
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  normalOption: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 28, // Adjust the margin as needed
  },
});

export default OtherGuestCard;