import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const TwoSectionBtn = ({ callCheckInAPI, total, count, link, navigation, rooms, details, dates }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const togglePreferenceModal = () => {
    setIsVisible(!isVisible);
  };
console.log(callCheckInAPI, total, count, link, navigation, rooms, details, dates ,"dataauua")
  const handleContinue = async () => {
    if (total === 0) {
      // Show an alert if total is 0
      alert('Select an Hotel Room First');
      return;
    }
    if (link !== '' && total !=0) {
      if (link === 'Reservation Detail') {
        try {
          const response = await callCheckInAPI();
          console.log(response.booking_id, 'response.status')
          if (response.status===true) {
            setBookingId(response.booking_id);
            console.log(response.booking_id, 'response.status',bookingId,"booking id")

            navigation.navigate(link, { dataToSend: { total, count, rooms, details, dates, bookingId } });

          }
        } catch (error) {
          console.error('Check-in API Error:', error);
          // Handle API error here
        }
      }
      else {
        navigation.navigate(link, { dataToSend: { total, count, rooms, details, dates, bookingId } });
      }
    } else {
           togglePreferenceModal();
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.section1}>
          <View style={styles.count}>
            <Text style={{ fontWeight: 500 }}>{count}</Text>
          </View>
          <Text style={{ fontWeight: 500, fontSize: 22, color: '#fff' }}>{`₹ ${total}`}</Text>
          <TouchableOpacity>
            <FontAwesome style={{ marginTop: 3, color: '#FECD00' }} name="ellipsis-h" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleContinue}>
          <Text style={{ fontWeight: 'bold', marginLeft: 20, fontSize: 18 }}>Continue</Text>
          <FontAwesome style={{ marginTop: 5 }} name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Fill all required fields</Text>
          <TouchableOpacity style={styles.closeModalBtn} onPress={togglePreferenceModal}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRightColor: '#fff',
    marginTop: -50,
    zIndex: 10,
  },
  btn: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FECD00',
    padding: 10,
    borderRadius: 1,
    width: 150,
    height: 50,
    alignItems: 'center',
  },
  count: {
    backgroundColor: '#F2f3f5',
    color: '#000',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: 'white',
  },
  section1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRightColor: '#fff',
    marginLeft: 20,
    gap: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeModalBtn: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default TwoSectionBtn;
