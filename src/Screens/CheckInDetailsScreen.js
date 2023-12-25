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
  Alert,
} from "react-native";
import axios from "axios";
import DatePickerComp from "../components/DateTimePicker";
import { FontAwesome } from "@expo/vector-icons";
import checkedInStatus from "../constants/constants";
import CheckInCard from "../components/CheckInCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationHead from "../components/NavigationHead";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import GuestCard from "../components/GuestCard";

const CheckInDetailsScreen = (items) => {
  const currDate = new Date().toISOString().slice(0, 10);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [checkIns, setCheckIns] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [lastDate, setLastDate] = useState();
  const data = items?.route?.params?.checkInDatas;
  const hotelCode = items?.route?.params?.hotelCode;

  const fetchData = async () => {
    const apiUrl = "https://api.ratebotai.com:8443/change_info_for_check_in";
    const Mockdata = {
      allowance: bookingData?.allowance,
      balance: bookingData?.balance,
      balance_amount: bookingData?.balance_amount,
      booking_from: bookingData?.booking_from,
      booking_id: bookingData?.booking_id,
      booking_status: "check_in",
      charge_till_now: bookingData?.charge_till_now,
      corporate: bookingData?.corporate,
      corporate_id: bookingData?.corporate_id,
      coupon_value: bookingData?.coupon_value,
      created_date: bookingData?.created_date,
      created_datetime: bookingData?.created_datetime,
      created_time: bookingData?.created_time,
      current_date: bookingData?.current_date,
      customer_id: bookingData?.customer_id,
      discount_type: bookingData?.discount_type,
      discount_type_value: bookingData?.discount_type_value,
      discount_value: bookingData?.discount_value,
      email: bookingData?.email,
      extra_charges: bookingData?.extra_charges,
      first_name: bookingData?.first_name,
      from_date: bookingData?.from_date,
      gross_amount: bookingData?.gross_amount,
      gross_amount_new: bookingData?.gross_amount_new,
      guest_data: bookingData?.guest_data,
      hotel_id: bookingData?.hotel_id,
      hotel_name: bookingData?.hotel_name,
      last_name: bookingData?.last_name,
      max_amount: bookingData?.max_amount,
      minimum_advance: bookingData?.minimum_advance,
      mobile_number: bookingData?.mobile_number,
      nights: bookingData?.nights,
      no_of_adults: bookingData?.no_of_adults,
      no_of_children: bookingData?.no_of_children,
      no_of_nights: bookingData?.no_of_nights,
      no_of_pax: bookingData?.no_of_pax,
      no_of_rooms: bookingData?.no_of_rooms,
      one_day_room_tariff: bookingData?.one_day_room_tariff,
      other_members: bookingData?.other_members,
      paid_amount: bookingData?.paid_amount,
      payment_details: bookingData?.payment_details,
      payment_list: bookingData?.payment_list,
      payment_modes: bookingData?.payment_modes,
      phone_number: bookingData?.phone_number,
      rate_amount: bookingData?.rate_amount,
      refund: bookingData?.refund,
      rete_plan_name: bookingData?.rete_plan_name,
      room_type_id: bookingData?.room_booking[0]?.room_type_id,
      room_booking: bookingData?.room_booking,
      service_amount: bookingData?.service_amount,
      service_charge: bookingData?.service_charge,
      tax_amount: bookingData?.tax_amount,
      tax_amount_new: bookingData?.tax_amount_new,
      tax_value: bookingData?.tax_value,
      time_string: bookingData?.time_string,
      to_date: bookingData?.to_date,
      total_discount: bookingData?.total_discount,
      total_room_tarif: bookingData?.total_room_tarif,
      total_sale_amount: bookingData?.total_sale_amount,
      total_services_amount: bookingData?.total_services_amount,
      total_without_tax: bookingData?.total_without_tax,
      travel_agent: bookingData?.travel_agent,
      travel_agent_id: bookingData?.travel_agent_id,
      update_date: bookingData?.update_date,
      update_time: bookingData?.update_time,
    };
    console.log(Mockdata, "mockkkk");
    try {
      const response = await axios.post(apiUrl, Mockdata);
      setCheckIns(response?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (checkIns?.status === 200 && checkIns?.data) {
      Alert.alert(
        "Alert",
        checkIns?.message,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      );
    }
  }, [checkIns]);

  const handleCheckIn = () => {
    fetchData();
  };

  const fetchDataa = async () => {
    const apiUrl = "https://api.ratebotai.com:8443/get_booking_data_pms";
    const postData = {
      booking_id: data?.booking_id,
    };
    try {
      const response = await axios.post(apiUrl, postData);
      setBookingData(response?.data);
    } catch (error) {
      alert("Error fetching roo:", error);
    }
  };

  useEffect(() => {
    if (data?.booking_id) {
      fetchDataa();
    }
  }, [data?.booking_id]);

  const fetchDataFromApi = async () => {
    try {
      const dataToSend = {
        hotel_code: hotelCode,
      };
      const response = await axios.post(
        "https://api.ratebotai.com:8443/check_night_audit_and_get_last_date	",
        dataToSend
      );
      setLastDate(response?.data?.data?.last_night_audit_last_date);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Ensure that fetchData is called only after hotelCode is fetched
      if (hotelCode) {
        fetchDataFromApi();
      }
    }, [hotelCode])
  );
const handleAddGuest=()=>{
  alert("Screen needs to be developed by contacting backend")
}
  console.log(data, bookingData, checkIns, "checkin");
  // const handleModify = () => {
  //   alert("hiiiiii33333");
  // };
  // last_night_audit_last_date
  const isNextDay = (date1, date2) => {
    const nextDay = new Date(date2);
    nextDay.setDate(nextDay.getDate() + 1);
    return date1 === nextDay.toISOString().slice(0, 10);
  };
  console.log(data, bookingData, "datatatatat");
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 10,
            fontWeight: "600",
          }}
        >
          ROOM(S)
        </Text>
        <View style={styles.card}>
          <CheckInCard checkInDatas={data} />
        </View>
        <View style={styles.card}>
          <Text style={{ marginTop: 10, marginBottom: 5, fontWeight: "600" }}>
            GUEST INFORMATION
          </Text>
          <View style={styles.line}></View>
          <GuestCard checkInDatas={bookingData} />
          {bookingData?.other_members?.length > 0 && (
            <GuestCard checkInDatas={bookingData?.other_members} />
          )}
        </View>
        {data?.from_date && lastDate && isNextDay(data.from_date, lastDate) ? (
          <TouchableOpacity onPress={handleAddGuest}>
            <View style={styles.containerGuest}>
              <FontAwesome name="plus" size={20} color="black" />
              <Text style={styles.buttonTextGuest}>Add Guest</Text>
            </View>
          </TouchableOpacity>):(null)}

        <View style={styles.card}>
          <View style={styles.balanceAmountpaid}>
            <Text>Room Charge</Text>
            <Text>{bookingData?.charge_till_now?.room_charges}</Text>
          </View>
          <View style={styles.balanceAmountpaid}>
            <Text>Discount Amount</Text>
            <Text>- {bookingData?.charge_till_now?.discount_amount}</Text>
          </View>
          <View style={styles.balanceAmountpaid}>
            <Text>Other Charge</Text>
            <Text>{bookingData?.charge_till_now?.other_charges}</Text>
          </View>
          <View style={styles.balanceAmountpaid}>
            <Text>Room Tax</Text>
            <Text>{bookingData?.charge_till_now?.room_tax_till_now}</Text>
          </View>
          <View style={styles.balanceAmountcharge}>
            <Text>Total Paid</Text>
            <Text>{data?.paid_amount}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.balanceAmount}>
            <Text>Balance Amount</Text>
            <Text>{data?.balance_amount}</Text>
          </View>
        </View>
        {data?.from_date && lastDate && isNextDay(data.from_date, lastDate) ? (
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
        ) : null}
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
  balanceAmountcharge: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingHorizontal: 10,
  },
  balanceAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingHorizontal: 10,
  },
  balanceAmountpaid: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 15,
    paddingHorizontal: 10,
  },
  line: {
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: "black", // Change the color of the line
  },
  bottomButtonsContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 10,
    backgroundColor: "#FFFDD0",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: "10%",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerGuest: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Set your desired background color
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal:"20%",
    marginVertical:0,
    marginBottom:10,
  },
  buttonTextGuest: {
    marginLeft: 5,
    color: 'black', // Set your desired text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});
