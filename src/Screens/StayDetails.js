import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import NavigationHead from '../components/NavigationHead';
import GuestDetails from '../components/GuestDetails';
import TwoSectionBtn from '../components/Buttons/TwoSectionBtn';
import { userDataRetriever } from '../APIS/Context';
import { getTotalDays } from './RoomDetails';
import axios from 'axios';

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
          total_sale_amount: total,
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
        console.log('API Response:', response.data);
    
        if (response.data.status_message === 'success') {
          alert('Check In Successful');
          return {status:true,booking_id:response.data.data.booking_id};
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
console.log(addOnsPrice,"adddd")
  return (
    <View style={styles.container}>
      {/* Uncomment the following line if you have a NavigationHead component */}
      {/* <NavigationHead heading="Stay Details" onBackPress={handleBackPress} /> */}
      <ScrollView>
        <GuestDetails
          rooms={rooms}
          total={total}
          personDetails={personDetails}
          selectedServices={selectedServices}
          onPersonDetailsChange={updatePersonDetails}
          onSelectedServicesChange={updateSelectedServices}
          checkInDate={dates.checkInDate}
          checkOutDate={dates.checkOutDate}
        />
      </ScrollView>

      <View >
        {isDetailsComplete ? (
          <TwoSectionBtn
            total={total+addOnsPrice}
            count={count}
            link="Single Edit"
            navigation={navigation}
            rooms={rooms}
            details={{
              personDetails,
              selectedServices,
            }}
            callCheckInAPI={callCheckInAPI}
            dates={dates}
          />
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
});
