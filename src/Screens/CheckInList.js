import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import DatePickerComp from '../components/DateTimePicker';
import { FontAwesome } from '@expo/vector-icons';
import checkedInStatus from '../constants/constants';
import CheckInCard from '../components/CheckInCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationHead from '../components/NavigationHead';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CheckInList = () => {
  const navigation = useNavigation();
  const [checkIns, setCheckIns] = useState([]);
  const [status, setStatus] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [hotelCode, setHotelCode] = useState('');

  const fetchHotelCode = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setHotelCode(userData.hotel_code);
      } else {
        console.log('User data not found.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const fetchData = async () => {
    setRefreshing(true);

    const apiUrl = 'https://api.ratebotai.com:8443/get_check_in_orders';
    const postData = {
      from_date: selectedDate,
      to_date: selectedDate,
      hotel_code: hotelCode,
    };
console.log(postData,"dataaa")
    try {
      const response = await axios.post(apiUrl, postData);
      const filteredCheckIns = response.data.data.filter(
        (booking) => booking.booking_status ==='check_in'
      );
      setCheckIns(filteredCheckIns);
      setStatus(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    fetchHotelCode();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Ensure that fetchData is called only after hotelCode is fetched
      if (hotelCode) {
        fetchData();
      }
    }, [selectedDate, hotelCode])
  );

  const onRefresh = () => {
    fetchData();
  };

  const checked_ins = checkedInStatus(checkIns);

  const handleBackPress = () => {
    navigation.navigate('Home');
  };
  const filteredCheckIns = status.filter(
    (booking) => booking?.booking_status === 'check_in'
  );
  const filteredPending= status.filter(
    (booking) => booking?.booking_status === 'pending'
  );

  return (
    <View style={styles.container}>
       {/* <NavigationHead
      heading="Check In"
      onBackPress={handleBackPress}  
    /> */}
      <View style={styles.header}>
        <DatePickerComp
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          style={{ color: '#fff', alignItems: 'center' }}
        />
        <FontAwesome name="angle-right" size={44} color="white" />
        <View style={styles.count}>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 20 }}>
            {checkIns.length}
          </Text>
        </View>
      </View>
      <View style={styles.header2}>
        <View style={styles.check}>
          <View style={styles.count2}>
            <Text style={{ alignItems: 'center', fontWeight: 'bold', color: 'white', fontSize: 20 }}>
              {filteredCheckIns?.length}  
            </Text>
          </View>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 12, color: 'white' }}>
            CHECK-IN
          </Text>
        </View>
        <View style={styles.check}>
          <View style={styles.count2}>
            <Text style={{ alignItems: 'center', fontWeight: 'bold', color: 'white', fontSize: 20 }}>
              {filteredPending?.length}
            </Text>
          </View>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 12, color: 'white' }}>
            CONFIRMED
          </Text>
        </View>
      </View>
      { checkIns?.length===0 ?<View style={{marginTop:50,justifyContent:'center',alignItems:'center'}}>
      <Text  style={{fontSize:20}}>
            No data Available
        </Text>
      </View>:("")}
      <FlatList
        data={checkIns}
        keyExtractor={(item) => item.booking_id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor:'lightblue',marginHorizontal:10 }]}>
            <CheckInCard checkInDatas={item} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default CheckInList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'lightblue',
    // marginTop:30,
    padding: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical:-25,
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
    paddingVertical:-25,
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
    backgroundColor: 'lightblue',
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
  },
});
