import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import DatePickerComp from '../components/DateTimePicker';
import { FontAwesome } from '@expo/vector-icons';
import checkedInStatus, { checkedOutStatus } from '../constants/constants';
import CheckInCard from '../components/CheckInCard';
import CheckOutCard from '../components/CheckOutCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOutList = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(false);
  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [hotelCode, setHotelCode] = useState('');

  // Retrieve the data from AsyncStorage
  AsyncStorage.getItem('userData')
    .then((userDataString) => {
      if (userDataString) {
        // Convert the stored string back to an object (you can use JSON.parse)
        const userData = JSON.parse(userDataString);

      
        setHotelCode(userData.hotel_code)
        // console.log('User Data:', logoPath);
      } else {
        console.log('User data not found.');
      }
    })
    .catch((error) => {
      console.error('Error retrieving user data:', error);
    });

  const fetchData = async () => {
    setRefreshing(true);
    

    const apiUrl = 'https://api.ratebotai.com:8443/get_check_out_orders';

    const postData = {
      from_date: selectedDate,
      to_date: currDate,
      hotel_code: hotelCode,
    };

    try {
      const response = await axios.post(apiUrl, postData);
      setCheckIns(response.data.data);
    } catch (error) {
      alert('Error fetching room types:', error);
    }

    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  const checked_outs = checkedOutStatus(checkIns);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DatePickerComp
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          style={{ color: '#fff', alignItems: 'center' }}
        />
        <FontAwesome name="angle-right" size={44} color="white" />
        <View style={styles.count}>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 20 }}>
            {checkIns?.length}
          </Text>
        </View>
      </View>
      <View style={styles.header2}>
        <View style={styles.check}>
          <View style={styles.count2}>
            <Text style={{ alignItems: 'center', fontWeight: 'bold', color: "white", fontSize: 20 }}>
              {checked_outs?.checkedOut}
            </Text>
          </View>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 12, color: 'white' }}>
            CHECKED-OUT
          </Text>
        </View>
        <View style={styles.check}>
          <View style={styles.count2}>
            <Text style={{ alignItems: 'center', fontWeight: 'bold', color: "white", fontSize: 20 }}>
              {checked_outs?.pending}
            </Text>
          </View>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 12, color: 'white' }}>
            PENDING
          </Text>
        </View>
      </View>
      <FlatList
        data={checkIns}
        keyExtractor={(item, idx) => "COUT" + idx.toString() + item?.guest_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <CheckOutCard checkInDatas={item} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default CheckOutList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#0186C1',
    paddingHorizontal: 10,
  },
  header2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    backgroundColor: '#0186C1',
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
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  }
});
