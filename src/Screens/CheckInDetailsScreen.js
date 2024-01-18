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
  TextInput,
  Linking,
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
import Modal from "react-native-modal";
import OtherGuestCard from "../components/OtherGuestCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import * as FileSystem from 'expo-file-system';

const CheckInDetailsScreen = (items) => {
  const currDate = new Date().toISOString().slice(0, 10);
  const navigation = useNavigation();
  // const [selectedDate, setSelectedDate] = useState(currDate);
  const [isModalVisible, setModalVisible] = useState(false);
  const [checkIns, setCheckIns] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [lastDate, setLastDate] = useState();
  const [payment, SetPayment] = useState();
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
      booking_status: "check_out",
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
      to_date: currDate,
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


  const downloadPdf = async (url, fileName) => {
    // console.log('File downloaded successfully',url,fileName);
    try {
      const { uri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName + '.pdf');
      //  Alert.alert('File downloaded successfully', String(uri));
       Alert.alert(
        "Alert",
        'Click OPEN to Download Invoice',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open',
            onPress: async () => {
              Linking.openURL(url)
            }
          },
        ]
      );
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  
  const handleDownload = async (bookingId,customer_id) => {
    const apiUrl = `https://api.ratebotai.com:8443/invoice_pms?booking_id=${bookingId}&customer_id=${customer_id}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(response,data,"datatatatatatatat")
      if (data && data.file) {
        const { file, invoice_number } = data;
        downloadPdf(file, `invoice_${invoice_number}`,);
      } else {
        Alert.alert("Alert","Error Downloading",
        [
          {
            text: "OK",
             onPress: () =>navigation.navigate('Home'),
          },
        ],)
      }
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };



  useEffect(() => {
    if (checkIns?.status === 200 && checkIns?.data) {
      Alert.alert(
         checkIns?.message,
         "Click Ok to download Invoice...!!!!",
        [
          {
            text: "OK",
             onPress: () =>handleDownload(checkIns?.data?.booking_id,checkIns?.data?.customer_id),
          },
        ],
        { cancelable: false }
      );
    }
  }, [checkIns]);

  const handleCheckIn = () => {
    if (bookingData?.charge_till_now?.balance === 0) {
      Alert.alert(
        "Alert",
        "Do You Want to Check Out ?",
        [ {
          text: "Cancel",
          style: "cancel",
        },
          {
            text: "OK",
            onPress: () => fetchData(),
          },
        ],
        { cancelable: false }
      );
    } else
      Alert.alert(
        "Payment is Pending...!!!",
        "Do U Want to Continue. ?",
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: "OK",
             onPress: () => handleAddGuest(),
          },
        ],
        { cancelable: false }
      );
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

  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [gender, setGender] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const close = () => {
    setModalVisible(false);
    setFormData("");
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Cash");
  const [item, setItems] = useState([
    { label: "Cash", value: "Cash" },
    { label: "Card", value: "Card" },
    { label: "Upi", value: "Upi" },
  ]);
  const [formData, setFormData] = useState({
    amount:bookingData?.charge_till_now?.balance.toString(),
    receipt:'',
    desc:'',
    mode:value,
  });
  console.log(formData,value,"formdata")
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      amount: bookingData?.charge_till_now?.balance?.toString(),
    }));
  }, [bookingData]);
  // const handleInputChange = (key, value) => {
  //   setFormData({
  //     ...formData,
  //     [key]: value,
  //   });
  // };
  const handleInputChangeValue = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };


  const handleSave = async () => {
    const { amount, receipt, desc } = formData;
    let amountByMode = 0;
    switch (value) {
      case 'Cash':
        amountByMode = amount;
        break;
      case 'Card':
        amountByMode = amount; // Replace cardAmount with the actual value for card payment
        break;
      case 'Upi':
        amountByMode = amount; // Replace upiAmount with the actual value for UPI payment
        break;
      default:
        break;
    }
    try {
      const dataToSend = {
        booking_id: bookingData?.booking_id,
        paid_amount: formData.amount,
        gross_amount: bookingData?.gross_amount,
        receipt_no: formData.receipt,
        mode:value,
        corporate_id: bookingData?.corporate_id,
        travel_agent_id:bookingData?.travel_agent_id,
        upi: value === 'Upi' ? amountByMode : 0,
       card: value === 'Card' ? amountByMode : 0,
        cash: value === 'Cash' ? amountByMode : 0,
        amount:formData.amount,
        available_balance: 0,
        description:formData?.desc,
        comment: "",
      };
      console.log(dataToSend,"senddd")
  
      // Show loading spinner while waiting for the API response
      // You may need to manage loading state in your component
      // setLoading(true);
  
      const response = await axios.post(
        "https://api.ratebotai.com:8443/insert_payment_data",
        dataToSend
      );
  
      SetPayment(response?.data);
  
      // Close the modal
      toggleModal();
    } catch (error) {
      console.error("Error saving payment:", error);
      // Handle the error appropriately, show an error message, etc.
      // You may also want to set an error state in your component
    } finally {
      // Hide loading spinner
      // setLoading(false);
    }
  };
  const handleAddGuest = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    if (payment) {
      Alert.alert(
        "ALert",payment?.message,
        [
          {
            text: "OK",
             onPress: () => fetchDataa(),
          },
        ],
        { cancelable: false }
      );
    }
  }, [payment]);
  // const handleModify = () => {
  //   alert("hiiiiii33333");
  // };
  // last_night_audit_last_date
  const isNextDay = (date1, date2) => {
    const nextDay = new Date(date2);
    nextDay.setDate(nextDay.getDate() + 1);
    return date1 === nextDay.toISOString().slice(0, 10);
  };
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  // Function to handle date change in date picker
  // const handleDateChange = (event, selectedDate) => {
  //   if (selectedDate) {
  //     setSelectedDate(selectedDate);
  //     handleInputChange("date_of_birth", selectedDate.toISOString().slice(0, 10));
  //   }
  //   toggleDatePicker(); // Close the date picker
  // };
  console.log(payment,"dateee")
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 10,
            fontWeight: "500",
            fontSize:15,
            backgroundColor:'#90EE90',
            padding:5,
            marginHorizontal:10,
            borderRadius:5
          }}
        >
          ROOM(S)
        </Text>
        <View style={[styles.card, { backgroundColor:'lightblue',marginHorizontal:10 }]}>
          <CheckInCard checkInDatas={data} />
        </View>
        <View style={styles.card}>
          <Text style={{ marginTop: 10,fontSize:15, marginBottom: 5, fontWeight: "500", backgroundColor:'#90EE90',
            padding:5,
            marginHorizontal:0,
            borderRadius:5 }}>
            GUEST INFORMATION
          </Text>
          <View style={styles.line}></View>
          <GuestCard checkInDatas={bookingData} />
          {bookingData?.other_members?.length > 0 && (
            <OtherGuestCard checkInDatas={bookingData} />
          )}
        </View>

        {/* <TouchableOpacity onPress={handleAddGuest}>
          <View style={styles.containerGuest}>
            <FontAwesome name="plus" size={20} color="black" />
            <Text style={styles.buttonTextGuest}>Add Guest</Text>
          </View>
        </TouchableOpacity> */}

        {/* ================================================================================================== */}
        {/* {data?.from_date && lastDate && isNextDay(data.from_date, lastDate) ? (
        <TouchableOpacity onPress={handleAddGuest}>
            <View style={styles.containerGuest}>
              <FontAwesome name="plus" size={20} color="black" />
              <Text style={styles.buttonTextGuest}>Add Guest</Text>
            </View>
          </TouchableOpacity>
        ) : (
        <TouchableOpacity
            onPress={() =>
              Alert.alert("Alert", "Adding guest is not permitted as check in is not allowed")
            }
          >
        <View
              style={[
                styles.containerGuest,
                { backgroundColor: "gray" },
              ]}
            >
        <FontAwesome name="plus" size={20} color="white" />
        <Text style={[styles.buttonTextGuest, { color: "white" }]}>
                Add Guest
              </Text>
        </View>
        </TouchableOpacity>
        )} */}
        {/* =================================================================================== */}

        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Pending Payment
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={item}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Payment Method"
            />
            <TextInput
              style={[styles.input, { fontWeight: 'bold',fontSize:18,color:'black' }]}
              editable={false}
              placeholder="Amount"
              keyboardType="number-pad"
              value={`₹ ${bookingData?.charge_till_now?.balance?.toString() || ''}`}
              onChangeText={(text) => handleInputChangeValue("amount", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Receipt No"
              value={formData.receipt}
              onChangeText={(text) => handleInputChangeValue("receipt", text)}
            />
             <TextInput
              style={styles.input}
              placeholder="Description"
              value={formData.desc}
              onChangeText={(text) => handleInputChangeValue("desc", text)}
            />
            {/* <TouchableOpacity  style={styles.datePickerContainer} onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Date Of Birth"
          caretHidden={true}
          value={formData.date_of_birth || ""}
          onTouchStart={toggleDatePicker}
        />
        <FontAwesome name="calendar" size={20} color="gray" style={styles.calendarIcon} />
      </TouchableOpacity> */}
      {/* {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )} */}


            {/* <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Phone no."
              value={formData.phone_number}
              onChangeText={(text) => handleInputChange("phone_number", text)}
            /> */}
            {/* <TextInput
              style={styles.input}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => handleInputChange("address", text)}
            /> */}
            {/* <TextInput
              style={styles.input}
              placeholder="Id Type"
              value={formData.id_type}
              onChangeText={(text) => handleInputChange("id_type", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Id no."
              value={formData.id_number}
              onChangeText={(text) => handleInputChange("id_number", text)}
            /> */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => {
                  // Close the modal without saving
                  close();
                }}
                style={{
                  flex: 1,
                  backgroundColor: "red",
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <Text style={[styles.optionText, { textAlign: "center" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  flex: 1,
                  backgroundColor: "yellow",
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <Text style={[styles.optionText, { textAlign: "center" }]}>
                  Pay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={[styles.card, {backgroundColor:'lightgreen',marginHorizontal:10}]}>
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
            <Text style={{fontSize:15,fontWeight:"600"}}>Balance Amount</Text>
            <Text style={{fontSize:15,fontWeight:"600"}}>{bookingData?.charge_till_now?.balance}</Text>
          </View>
        </View>
        {bookingData?.booking_status === "check_in" ? (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCheckIn()}
            >
               <Text style={styles.buttonText}>Check Out</Text>
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
  picker: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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
    // backgroundColor:"lightblue"
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Set your desired background color
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    marginHorizontal: "20%",
    marginVertical: 0,
    marginBottom: 10,
  },
  buttonTextGuest: {
    marginLeft: 5,
    color: "black", // Set your desired text color
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 3,
  },
  pickerContainer: {
    height: 40, // Adjust as needed
    width: 200, // Adjust as needed
  },
  picker: {
    backgroundColor: "red", // Try removing or modifying this
  },
  labelStyle: {
    color: "red", // Add your text color
    fontSize: 16, // Add your font size
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
