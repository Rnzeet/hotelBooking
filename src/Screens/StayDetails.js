import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import NavigationHead from '../components/NavigationHead';
import GuestDetails from '../components/GuestDetails';
import TwoSectionBtn from '../components/Buttons/TwoSectionBtn';
import { userDataRetriever } from '../APIS/Context';
import { getTotalDays } from './RoomDetails';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const StayDetails = ({ navigation, route }) => {
  const { total, count, rooms, dates } = route.params.dataToSend;
  const [roomTypeIds, setRoomTypeIds] = useState([]);
  const [roomIds, setRoomIds] = useState([]);
  const [hotelCode, setHotelCode] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [taxIds, setTaxIds] = useState([]);
  const [taxAmounts, setTaxAmounts] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [taxType, setTaxType] = useState([]);
  const [addOnsPrice, setAddOnsPrice] = useState();
  const [updatedAmount, setUpdatedAmount] = useState(total);
  const [personDetails, setPersonDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adult: 1,
    child: 0,
  });

  userDataRetriever().then((data) => {
    setHotelCode(data.hotel_code);
  });

  const setRoomTypeIdsFunc = () => {
    const roomTypeIds1 = [];
    const roomIds1 = [];

    rooms.forEach((rm) => {
      console.log(rm,"rm")
      if(rm.count > 0) {
        roomTypeIds1.push(rm.room.room_type_id);
        roomIds1.push(rm.room.id);
        console.log(rm,"rm.roomType")
        setServiceCharge(rm.roomType.service_charge);
        setTaxIds(rm.room.tax_ids);
        
      }


      setRoomTypeIds(roomTypeIds1);
      setRoomIds(roomIds1);
      console.log(roomIds,roomTypeIds,"roomIds,roomTypeIds")
      
    })
  
  }
   rooms.forEach((rm) => {
      if(rm.count > 0) {
        console.log(rm)
        console.log(rm.room);
      }
    }
  )
  const [selectedServices, setSelectedServices] = useState([]);

  // Function to update person details
   const updatePersonDetails = (details) => {
    setPersonDetails((prevDetails) => ({
      ...prevDetails,
      ...details,
    }));
  };

  // Function to update selected services
  const updateSelectedServices = (services) => {
    setSelectedServices((prevServices) => ({
      ...prevServices,
      ...services,
    })
    );
  };

  // Check if all required details are present
  const isDetailsComplete =
    personDetails.firstName?.trim() !== '' &&
    personDetails.lastName?.trim() !== '' &&
    personDetails.email?.trim() !== '' &&
    personDetails.phone?.trim() !== '';

  
    const callCheckInAPI = async () => {
      try {


        // Define the data you want to send to the API
        const dataToSend = {
          // Include the data you want to send here
          hotel_code: hotelCode,
          tax_id: 0,
          from_date:dates.checkInDate,
          to_date:dates.checkOutDate,
          no_of_nights: getTotalDays(dates.checkInDate,dates.checkOutDate),
          no_of_pax: personDetails.adult + personDetails.child,
          no_of_adults: personDetails.adult,
          no_of_children: personDetails.child,
          total_sale_amount: total+updatedAmount,
          discount_id: 0,
          discount_value: 0,
          discount_amount: 0,
          discount_type: "",
          coupon_id: 0,
          coupon_value: 0,
          coupon_type: "",
          coupon_discount_amount: 0,
          total_without_tax: total+serviceCharge,
          tax_amount: taxAmounts,
          total_services_amount: serviceCharge,
          gross_amount: total+serviceCharge+taxAmounts,
          minimum_advance: 0,
          paid_amount: 0,
          balance_amount: 0,
          customer_id: 0,
          first_name: personDetails.firstName,
          last_name: personDetails.lastName,
          email: personDetails.email,
          visit_type: "hotel",
          address: personDetails.address,
          phone_number: personDetails.phone,
          mobile_number: personDetails.phone,
          country: "NL",
          transaction_status: "pending",
          booking_status: "pending",
          created_by: 0,
          room_type_id: roomTypeIds[0],
          room_assinged_adult_info: [
            {
              no_of_adults: personDetails.adult,
              no_of_child: personDetails.child,
              no_of_rooms: count,
              room_id: roomIds[0]
            }
          ],
    
          room_booking:[
            {
              room_id: roomIds[0],
              no_of_pax: personDetails.adult + personDetails.child,
              no_of_adults: personDetails.adult,
              no_of_children: personDetails.child,
              no_of_rooms: count,
              total_sale_amount: total,
              discount_amount: 0,
              coupon_amount: 0,
              total_without_tax: total+serviceCharge,
              tax_amount: taxAmounts,
              gross_amount: total+serviceCharge+taxAmounts
            }]
          ,
          booking_service: selectedServices
    
        };  

        console.log('API Data:', dataToSend);


        // Make the API request
        const response = await axios.post('https://api.ratebotai.com:8443/check_in_from_hotel', dataToSend);
    
        // Handle the response data as needed
        // console.log('API Response:', response.data);
    
        if (response.data.status_message === 'success') {
          // alert('Hotel Reserved Successfully');
          setBookingId(response?.data?.data)
          Alert.alert("SuccessFully",'Hotel Reserved Successfully',
          [
            {
              text: "OK",
               onPress: () =>handleSave(response?.data?.data, response?.data?.data.booking_id),
            },
          ],)
          // Alert.alert("alert")
          // return {status:true,booking_id:response.data.data.booking_id};
          // return {status:true,booking_id:response.data.data.booking_id}
        } else {
          alert('Check In Failed');
          return {status:false,booking_id:null}
        }
      } catch (error) {
        console.error('API Error:', error);
        alert('Check In Failed');
        return {status:false,booking_id:null}
      }
    };  

    useEffect(() => {
      setRoomTypeIdsFunc();
    }, [rooms]);

useEffect(() => {
  if (selectedServices[0]?.length>0) {
  const totalPrice = selectedServices[0]?.reduce((total, service) => total + service?.price, 0);
  setAddOnsPrice(totalPrice )}
  else {
    setAddOnsPrice(0); // Set totalPrice to 0 when selectedServices is empty
  }
}, [selectedServices]);
const updateTotalAmount = (adult, child) => {
  const newAmount = rooms[0]?.roomType?.extra_bed_price * (adult - 1 + child);
  setUpdatedAmount(newAmount);
};
const [paymentData, setPaymentData] = useState();
const [payment, SetPayment] = useState();

const updatePaymentDetails = (details,value) => {
  setPaymentData((prevDetails) => ({
    ...prevDetails,
    ...details,value
  }));
};

const navigations = useNavigation();
const handleSave = async (booking,bookingId) => {
  const { amount, receipt, desc,value } = paymentData;
  console.log(booking,"booking")
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
      booking_id:booking?.booking_id,
      paid_amount:amount,
      gross_amount:booking?.gross_amount,
      receipt_no:receipt,
      mode:value,
      corporate_id:booking?.corporate_id,
      travel_agent_id:booking?.travel_agent_id,
      upi: value === 'Upi' ? amountByMode : 0,
      card: value === 'Card' ? amountByMode : 0,
      cash: value === 'Cash' ? amountByMode : 0,
      amount:amount,
      available_balance:0,
      description:desc,
      comment:"",
    };
    console.log(dataToSend,"senddd")

    if(amount){
    const response = await axios.post(
      "https://api.ratebotai.com:8443/insert_payment_data",
      dataToSend
    );

    SetPayment(response?.data);
    console.log(response?.data?.message,"payment")
    if (response?.data?.message) {
      // alert('Hotel Reserved Successfully');
      Alert.alert("Payment",response?.data?.message,
      [
        {
          text: "OK",
           onPress: () =>navigations.navigate("Reservation Detail",{ booking_id: bookingId }),
        },
      ],)
      // Alert.alert("alert")
      //  return {status:true,booking_id:response.data.data.booking_id};
    } else {
      alert('Payment Failed');
    }
  }else{
    navigations.navigate("Reservation Detail",{ booking_id: bookingId })
  }
    // Close the modal
  } catch (error) {
    console.error("Error saving payment:", error);
    // Handle the error appropriately, show an error message, etc.
    // You may also want to set an error state in your component
  } finally {
    // Hide loading spinner
    // setLoading(false);
  }
};

console.log(bookingId,"addddy")
console.log(rooms,"adddd")
// const handleContinue=()=>{
//   navigation.navigate(link, { dataToSend: { total, count, rooms, details, dates, bookingId } });
// }
  return (
    <View style={styles.container}>
      {/* Uncomment the following line if you have a NavigationHead component */}
      {/* <NavigationHead heading="Stay Details" onBackPress={handleBackPress} /> */}
      <ScrollView>
        <GuestDetails
          rooms={rooms}
          total={updatedAmount}
          personDetails={personDetails}
          selectedServices={selectedServices}
          onPersonDetailsChange={updatePersonDetails}
          onSelectedServicesChange={updateSelectedServices}
          checkInDate={dates.checkInDate}
          checkOutDate={dates.checkOutDate}
          updateTotalAmount={updateTotalAmount}
          onPaymentDataChange={updatePaymentDetails}
          paymentData={paymentData}
        />
      </ScrollView>

      <View >
        {isDetailsComplete ? (
      <View style={styles.container1}>
        <View style={styles.section1}>
          <View style={styles.count}>
            <Text style={{ fontWeight: 500 }}>{count}</Text>
          </View>
          <Text style={{ fontWeight: 500, fontSize: 22, color: '#fff' }}>{`₹ ${total+updatedAmount}`}</Text>
          <TouchableOpacity>
            <FontAwesome style={{ marginTop: 3, color: '#FECD00' }} name="ellipsis-h" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={callCheckInAPI}>
          <Text style={{ fontWeight: 'bold', marginLeft: 20, fontSize: 18 }}>Continue</Text>
          <FontAwesome style={{ marginTop: 5 }} name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </View>
        //  <TwoSectionBtn
            // total={total+updatedAmount}
         //   count={count}
          //  link="Reservation Detail"
            //navigation={navigation}
            //rooms={rooms}
          //  details={{
           //   personDetails,
           //   selectedServices,
           // }}
           // callCheckInAPI={callCheckInAPI}
          //  dates={dates}
         // />
          
        ) : (
          <TouchableOpacity
            style={styles.disabledButton}
            activeOpacity={0.7}
            disabled={!isDetailsComplete}
          >
            <Text style={styles.buttonText}>Complete Details to Proceed</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default StayDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  container1: {
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
