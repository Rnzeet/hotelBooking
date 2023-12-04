import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePickerComp from '../components/DateTimePicker';
import { FontAwesome } from '@expo/vector-icons';
import CancelledCard from "../components/CancelledCard";
import NavigationHead from "../components/NavigationHead";
import { useNavigation } from "@react-navigation/native";
const CancelledBookingScreen = () => {
  const navigation = useNavigation();
  const [cancelledData, setCancelledData] = useState([]);
  const [hotelCode, setHotelCode] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(currDate);


    AsyncStorage.getItem('userData')
    .then((userDataString) => {
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setHotelCode(userData.hotel_code)
      } else {
        console.log('User data not found.');
      }
    })
    .catch((error) => {
      console.error('Error retrieving user data:', error);
    });
const fetchDataFromApi = async () => {
  setRefreshing(true);
  const apiUrl ='https://api.ratebotai.com:8443/get_cancelled_orders';
  const postData = {
    from_date: selectedDate,
    to_date: currDate,
    hotel_code: hotelCode,
  };
  try {
    const response = await axios.post(apiUrl, postData);
      setCancelledData(response.data.data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  setRefreshing(false);
};    
useEffect(() => {
  if (selectedDate) {
    fetchDataFromApi();
  }
}, [selectedDate]);

const onRefresh = () => {
  fetchDataFromApi();
};
useEffect(() => {
    fetchDataFromApi();
}, []);
const handleBackPress = () => {
  navigation.navigate("Dashboard");
};

  return (
    <View style={styles.container}>
   <NavigationHead
      heading="Cancelled Booking"
      onBackPress={handleBackPress}
    />
      <View style={styles.header}>
     <DatePickerComp
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          style={{ color: '#fff', alignItems: 'center' }}
        />
          <FontAwesome name="angle-right" size={44} color="white" />
        <View style={styles.count}>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 20 }}>
            {cancelledData.length}
          </Text>
        </View>
        </View>
      <FlatList
        data={cancelledData}
        keyExtractor={(item) => item?.guest_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <CancelledCard cancelledData={item} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
     
    {/* </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#0186C1',
    paddingHorizontal: 10,
    marginBottom:10
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
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
});

export default CancelledBookingScreen;
