import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { firstLastCharater } from './SimpleCard';


const CheckInCard = ({ checkInDatas }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const close = () => {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.roomType}>
        <Text>{firstLastCharater(checkInDatas?.room_booking_info?.room_title)}</Text>
      </View>
      <View>
        <Text>{checkInDatas.guest_first_name}</Text>
        <Text>{`#${checkInDatas.booking_id}`}</Text>
        <Text>{`${checkInDatas.from_date} > ${checkInDatas.to_date}`}</Text>
      </View>
      <View>
        <View>
          <Text>{`₹ ${checkInDatas.total_sale_amount}`}</Text>
        </View>
        <View>
          <Text>{`R X ${checkInDatas.room_booking_info.no_of_rooms} G X ${checkInDatas.room_booking_info.no_of_adults + checkInDatas.room_booking_info.no_of_children}`}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={toggleModal} style={styles.verticle}>
        <FontAwesome name="ellipsis-v" size={20} color="black" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
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

export default CheckInCard;