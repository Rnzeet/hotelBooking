import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Alert
} from "react-native";
import axios from "axios";
import DatePickerComp from "../components/DateTimePicker";
import { FontAwesome } from "@expo/vector-icons";
import checkedInStatus from "../constants/constants";
import CheckInCard from "../components/CheckInCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationHead from "../components/NavigationHead";
import { useNavigation } from "@react-navigation/native";

const CheckInDetailsScreen = (items) => {
  const currDate = new Date().toISOString().slice(0, 10);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [checkIns, setCheckIns] = useState([]);
  const data = items?.route?.params?.checkInDatas;
  const hotelCode = items?.route?.params?.hotelCode;

    const fetchData = async () => {
      const apiUrl = 'https://api.ratebotai.com:8443/check_in_from_hotel'; 
      const Mockdata= {
        hotel_code:hotelCode,
        // tax_id:0,
        from_date:data?.from_date,
        to_date:data?.to_date,
        no_of_nights:data?.no_of_nights,
        no_of_pax: data?.no_of_packs,
        no_of_adults:data?.no_of_adults,
        no_of_children:data?.no_of_children,
        total_sale_amount:data?.total_sale_amount,
        discount_id:data?.discount_id,
        discount_value:data?.discount_value,
        // discount_amount:data?.room_booking_info?.discount_amount,
        discount_type:data?.discount_type,
        coupon_id:data?.coupon_id,
        coupon_value:data?.coupon_value,
        coupon_type:data?.coupon_type,
        // coupon_discount_amount:data?.room_booking_info?.coupon_amount,
        total_without_tax:data?.total_without_tax,
        tax_amount:data?.tax_amount,
        total_services_amount:data?.total_services_amount,
        gross_amount:data?.gross_amount,
        minimum_advance:data?.minimum_advance,
        paid_amount:data?.paid_amount,
        balance_amount: data?.balance_amount,
        customer_id:data?.guest_id,
        first_name:data?.guest_first_name,
        email: data?.email,
        visit_type: data?.visit_type,
        address:data?.address,
        phone_number:data?.phone_number,
        mobile_number:data?.mobile_number,
        country:data?.country,
        transaction_status:data?.transaction_status,
        booking_status:data?.booking_status,
        // created_by: 0,
        room_type_id:data?.room_booking_info?.room_type_id,
        room_assinged_adult_info: [
        {
        no_of_adults:data?.room_booking_info?.no_of_adults,
        no_of_child:data?.room_booking_info?.no_of_children,
        no_of_rooms: data?.room_booking_info?.no_of_rooms,
        room_id:data?.room_booking_info?.room_id
        }
        
        ],
        room_booking: [
        {
        room_id : data?.room_booking_info?.room_id,
        no_of_pax:data?.room_booking_info?.no_of_pax,
        no_of_adults:data?.room_booking_info?.no_of_adults,
        no_of_children: data?.room_booking_info?.no_of_children,
        no_of_rooms: data?.room_booking_info?.no_of_rooms,
        total_sale_amount:data?.room_booking_info?.total_sale_amount,
        discount_amount:data?.room_booking_info?.discount_amount,
         coupon_amount: data?.room_booking_info?.coupon_amount,
         total_without_tax:data?.room_booking_info?.total_without_tax,
         tax_amount:data?.room_booking_info?.tax_amount,
         gross_amount:data?.room_booking_info?.gross_amount
        }
        ],
          booking_service:[]
        }		
           
      try {
        const response = await axios.post(apiUrl, Mockdata);
        setCheckIns(response?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(()=>{
      if(checkIns?.status===200 && checkIns?.data){
        Alert.alert(
          'Alert',
          checkIns?.message,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ],
          { cancelable: false }
        );}
      },[checkIns])
  const handleCheckIn = () => {
    fetchData();
 
  };
console.log(checkIns?.status,data,"checkin")
  // const handleModify = () => {
  //   alert("hiiiiii33333");
  // };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.card}>
          <CheckInCard checkInDatas={data} />
        </View>
        <View style={styles.card}>
          <Text style={{ marginTop: 10, marginBottom: 5 }}>
            GUEST INFORMATION
          </Text>
          <View style={styles.line}></View>
          <Text style={{ marginTop: 10 }}>
            {data?.guest_first_name} {data?.last_name}
          </Text>
          <Text style={{ marginTop: 5 }}>{data?.email}</Text>
          <Text style={{ marginTop: 5 }}>{data?.mobile_number}</Text>
          <Text style={{ marginTop: 10 }}>{data?.country}</Text>
      
          <Text style={{ marginTop: 10 }}>
            {data?.hotel_name} ({data?.room_booking_info?.room_title})
          </Text>
          <Text style={{ marginTop: 5 }}>No of Adults : {data?.no_of_adults}</Text>
          <Text style={{ marginTop: 5 }}>No of Children : {data?.no_of_children}</Text>
          <Text style={{ marginTop: 5 }}>No of Rooms : {data?.room_booking_info?.no_of_rooms}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.balanceAmount}>
            <Text>Total Paid</Text>
            <Text>{data?.paid_amount}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.balanceAmount}>
            <Text>Balance Amount</Text>
            <Text>{data?.balance_amount}</Text>
          </View>
        </View>
        
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCheckIn()}
          >
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => handleModify()}
          >
            <Text style={styles.buttonText}>Modify</Text>
          </TouchableOpacity> */}
        </View>
      </View> 
    </ScrollView>
  );
};

export default CheckInDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  balanceAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingHorizontal: 10,
  },
  line: {
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: "black", // Change the color of the line
  },
  bottomButtonsContainer: {
    marginTop:25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 10,
    backgroundColor:"#FFFDD0",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal:"10%",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
