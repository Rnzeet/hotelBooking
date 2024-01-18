import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import SingleDetailsEdit from '../components/SingleDetailsEdit'
import CheckInButton from '../components/Buttons/CheckInButton';
import { getTotalDays } from './RoomDetails';
import axios from 'axios';
import { userDataRetriever } from '../APIS/Context';
import ReservedDetailsEdit from '../components/ReservedFinal';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const CheckInFinal = ({ route, navigation }) => {
  // {
  //   "hotel_code": 100001,
  //   "tax_id": 0,
  //   "from_date": "2022-08-29",
  //   "to_date": "2022-08-30",
  //   "no_of_nights": 0,
  //   "no_of_pax": 0,
  //   "no_of_adults": 2,
  //   "no_of_children": 0,
  //   "total_sale_amount": 1.31,
  //   "discount_id": 0,
  //   "discount_value": 0,
  //   "discount_amount": 0,
  //   "discount_type": "",
  //   "coupon_id": 0,
  //   "coupon_value": 0,
  //   "coupon_type": "",
  //   "coupon_discount_amount": 0,
  //   "total_without_tax": 1.31,
  //   "tax_amount": 0,
  //   "total_services_amount": 0,
  //   "gross_amount": 1.6,
  //   "minimum_advance": 0,
  //   "paid_amount": 0,
  //   "balance_amount": 0,
  //   "customer_id": 0,
  //   "first_name": "Jeffery",
  //   "email": "test@example.com",
  //   "visit_type": "",
  //   "address": "123 Main st. Amsterdam",
  //   "phone_number": "555-9192",
  //   "mobile_number": "555-9192",
  //   "country": "NL",
  //   "transaction_status": "",
  //   "booking_status": "",
  //   "created_by": 0,
  //   "room_assinged_adult_info": [
  //   {
  //   "no_of_adults": "1",
  //   "no_of_child": 0,
  //   "no_of_rooms": 1,
  //   "room_id": 1
  //   }
    
  //   ],
  //   "room_booking": [
  //   {
  //   "room_id": 1,
  //   "no_of_pax": 0,
  //   "no_of_adults": "1",
  //   "no_of_children": 0,
  //   "no_of_rooms": 1,
  //   "total_sale_amount": "0.9",
  //   "discount_amount": 0,
  //   "coupon_amount": 0,
  //   "total_without_tax": "0.9",
  //   "tax_amount": "20.0",
  //   "gross_amount": "1.1"
  //   }
  //   ],
  //   "booking_service": []
  //   }
  // const { total, count, rooms, details, dates,bookingId } = route.params.dataToSend;
  const [payments, setPayments] = useState([]);
  const isFocused = useIsFocused();
  const updatePayments = (paymentDetails) => {
    setPayments([...payments, paymentDetails]);
  };
  
const [bookingData, setBookingData] = useState([]);
const fetchDataa = async () => {
  const apiUrl = "https://api.ratebotai.com:8443/get_booking_data_pms";
  const postData = {
    booking_id: route?.params?.booking_id,
  };
  try {
    const response = await axios.post(apiUrl, postData);
    setBookingData(response?.data);
  } catch (error) {
    alert("Error fetching room:", error);
  }
};
useEffect(() => {
  if (route?.params) {
    fetchDataa();
  }
}, [route?.params]);
// useFocusEffect(
//   React.useCallback(() => {
//     // Ensure that fetchData is called only after hotelCode is fetched
//     if (route?.params) {
//       fetchDataa();
//     }
//   }, [route,bookingData])
// );
console.log(bookingData,route,"booking")

  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom:50}}>
        {/* <SingleDetailsEdit
          total={total}
          count={count}
          rooms={rooms}
          details={details}
          dates={dates}
          bookingId={bookingId}
          updatePayments={updatePayments}
        /> */}
        <ReservedDetailsEdit
         item={bookingData}
        />
      </ScrollView>
      {/* <CheckInButton 
        handlePaymentPress={callCheckInAPI}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CheckInFinal;
