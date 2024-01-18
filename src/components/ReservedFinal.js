import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SimpleCard from './SimpleCard';
import Modal from 'react-native-modal'; // Import the modal library
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


const ReservedDetailsEdit = ({item}) => {

   const navigations = useNavigation();
   const OnhandleHome = () => {
    const resetAndNavigateHome = () => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigations.dispatch(resetAction);
    };

    resetAndNavigateHome();
  };
  const fromDate = new Date(item.from_date);
const toDate = new Date(item.to_date);
const dateDifferenceInMilliseconds = toDate - fromDate;
const dateDifferenceInDays = dateDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
  console.log(item,"services")
  return (
    <View >
      <View style={styles.header2}>
        <View style={styles.check}>
          <View style={styles.count2}>
            <View style={{ alignItems: 'center', fontWeight: 'bold', color: "white", fontSize: 20 }}>
              <FontAwesome name="bell" size={20} color="white" />
            </View>
          </View>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 12, color: 'white' }}>#{item?.booking_id}</Text>
          <FontAwesome name="ellipsis-h" style={{ marginTop: 15, marginLeft: 5, color: "#FECD00" }} size={20} color="white" />
        </View>
        <View style={styles.check}>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 24, color: 'white' }}>₹ {item?.total_sale_amount}</Text>
        </View>
      </View>

      {/* <ScrollView style={styles.cards}>
        {rooms?.map((item, index) => (
          <View key={index} style={styles.card}>
            <SimpleCard
              item={item}
              id={bookingId}
              details={personDetails}
              dates={dates}
            />
          </View>
        ))}
      </ScrollView> */}
      <View style={styles.payCard}>
      <Text style={{ color: "white", fontWeight: 400, fontSize: 18 }}>
      {item?.first_name}        {item?.last_name}
        </Text>
        <Text style={{ color: "white", fontWeight: 400, fontSize: 18 }}>
          {item?.hotel_name}
        </Text>
        <Text style={{ color: "white", fontWeight: 400, fontSize: 18 }}>
          Status:Confirmed
        </Text>
        <Text style={{ color: "white", fontWeight: 400, fontSize: 18 }}>
        {`${fromDate.toLocaleDateString('en-US', { month: 'short' })} ${fromDate.getDate()} > ${toDate.toLocaleDateString('en-US', { month: 'short' })} ${toDate.getDate()}`} <Text style={{ fontSize: 16, fontStyle: 'italic' }}> {dateDifferenceInDays}(N)</Text>
        </Text>
        {/* <Text style={{ color: "white", fontWeight: 400, fontSize: 18 }}>
          Balance Amount
        </Text> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
          {/* <Text style={{ color: '#FECD00', fontSize: 26, fontWeight: 800 }}>
          ₹ {total - totalPaid}
          </Text> */}
        </View>
      </View>

      <View style={styles.totalPay}>
        <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5, marginLeft: 15, color: '#FECD00' }}>Total </Text>
        <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5, marginRight: 15, color: '#FECD00' }}>₹ {item?.total_sale_amount}</Text>
      </View>
      <ScrollView style={styles.cards}>
        </ScrollView>
  <View style={styles.preferenceBtn}>
            <TouchableOpacity onPress={OnhandleHome} style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
              <Text style={styles.btn}>
                {/* <FontAwesome name="pencil" size={16} color="#000" /> */}
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

export default ReservedDetailsEdit;

const styles = StyleSheet.create({
  header2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: '#ccc', // Color for the bottom border
    paddingHorizontal: 10,
    backgroundColor: '#027DB1',
  },
  count: {
    backgroundColor: '#FECD00',
    color: '#fff',
    borderRadius: 50,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: 'white',
  },
  count2: {
    backgroundColor: '#0186C1', // Background color for the header
    color: '#fff',
    borderRadius: 50,
    borderColor: '#fff',
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cards: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    maxHeight: '40%',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    marginVertical: 5,
  },
  payCard: {
    backgroundColor: 'gray',
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 2,
    marginVertical: 1,
    marginTop:20
  },
  totalPay: {
    backgroundColor: 'gray',
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 2,
  },
  btn: {
    backgroundColor: '#FECD00',
    padding: 10,
    borderRadius: 5,
    // elevation: 2,
    
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  payNowBtn: {
    backgroundColor: '#FECD00',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginTop: 10,
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
    alignItems: "center",
    marginTop: 10,
  },
  preferenceBtn: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    marginTop: 5,
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: "black", // Change the color of the line
  },
});
