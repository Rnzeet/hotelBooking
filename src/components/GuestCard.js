import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { firstLastCharater } from './SimpleCard';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';

const GuestCard = ({ checkInDatas }) => {
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
console.log(checkInDatas,"hotellllllllll")
  return (
    <TouchableOpacity onPress={handleClick}>
    <View style={styles.container}>
      <View style={styles.roomType}>
        {/* <Text>{firstLastCharater(checkInDatas?.room_booking_info?.room_title)}</Text> */}
        {/* {checkInDatas?.guest_data?.gender === 'Male' ? (
            <Avatar
              rounded
              size="medium"
              icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
              containerStyle={{ backgroundColor: 'blue' }}
            />
          ) : (
            <Avatar
              rounded
              size="medium"
              icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
              containerStyle={{ backgroundColor: 'pink' }}
            />
          )} */}
          {checkInDatas?.guest_data?.gender === 'Male' ? (
          <FontAwesome name="male" size={40} color="blue" />
        ) : (
          <FontAwesome name="female" size={40} color="pink" />
        )}
      </View>
      <View>
        <Text >{checkInDatas?.guest_data?.first_name} {checkInDatas?.guest_data?.last_name}</Text>
        <Text >{`${checkInDatas.from_date} > ${checkInDatas.to_date}`}</Text>
        <Text>{`${checkInDatas?.guest_data?.phone_number}`}</Text>
        <Text>{`${checkInDatas?.guest_data?.email}`}</Text>
      </View>
      <View>
        <View>
          {/* <Text>{`R X ${checkInDatas.room_booking[0].no_of_rooms} G X ${checkInDatas.room_booking[0].no_of_adults + checkInDatas.room_booking_info.no_of_children}`}</Text> */}
        </View>
      </View>
      {/* <TouchableOpacity onPress={toggleModal} style={styles.verticle}>
        <FontAwesome name="ellipsis-v" size={20} color="black" />
      </TouchableOpacity> */}
     
      {/* <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => {
            // Handle the Check-In action
            // You can navigate to the Check-In screen or perform any other action
            toggleModal();
          }} style={styles.greenOption}>
            <Text style={styles.optionText}>Check-In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            // Handle the Modify action
            // You can navigate to the Modify screen or perform any other action
            toggleModal();
          }} style={styles.yellowOption}>
            <Text style={styles.optionText}>Modify</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            // Handle the Cancel action
            // You can navigate to the Cancel screen or perform any other action
            toggleModal();
          }} style={styles.redOption}>
            <Text style={styles.optionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            // Handle the Cancel action
            // You can navigate to the Cancel screen or perform any other action
            toggleModal();
          }} style={styles.normalOption}>
            <Text style={styles.optionText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingRight:15,
    backgroundColor:"#f0f8ff",
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
  greenOption: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  yellowOption: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  redOption: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  normalOption: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default GuestCard;