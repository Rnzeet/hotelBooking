import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5,FontAwesome } from '@expo/vector-icons';
import DatePickerComp from '../components/DateTimePicker';
import { userDataRemover } from '../APIS/Context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());
  const [refreshing, setRefreshing] = React.useState(false);
  const [hotelCode, setHotelCode] = useState('');
  const [checkIns, setCheckIns] = useState('');
  const [checkOuts, setCheckOuts] = useState('');

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

    const apiUrl1 = 'https://api.ratebotai.com:8443/get_check_out_orders';

    const postData = {
      from_date: selectedDate,
      to_date: currDate,
      hotel_code: hotelCode,
    };

    try {
      const response = await axios.post(apiUrl1, postData);
      setCheckOuts(response.data.data.length);
    } catch (error) {
      alert('Error fetching room types:', error);
    }


    const apiUrl = 'https://api.ratebotai.com:8443/get_check_in_orders';
   
    try {
      const response = await axios.post(apiUrl, postData);
      setCheckIns(response.data.data.length);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setRefreshing(false);
  };



  useEffect(() => {
    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  

  const onRefresh = React.useCallback(() => {
   
    setRefreshing(true);
    setTimeout(() => {
      setCurrTime(new Date().toLocaleTimeString());
      setSelectedDate(new Date().toISOString().slice(0, 10));
      fetchData();
      setRefreshing(false);
      
    }, 2000);

  }, []);
  // console.log.(navigation)

  return (
    <ScrollView style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      
       <View style={styles.header}>
        <DatePickerComp
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          style={{ color: '#fff', alignItems: 'center' }}
        />
        <TouchableOpacity onPress={() => {
              onRefresh()
            } 
            }>
        <FontAwesome name="repeat" size={30} color="white" 
           
        /> 
        </TouchableOpacity>
        <View >
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 25,color:"white" }}>{currTime}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.card}
         onPress={() => navigation.navigate('Check In List')}
      >
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>

        <FontAwesome5 name='key' size={45} color="#0186C1"  />
        <Text style={styles.count}>
          {checkIns}
        </Text>
        </View>
        <Text style={styles.txt}>
             CHECKED IN 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
       onPress={() => navigation.navigate('Check Out List')}
      >
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <FontAwesome5 name='door-open' size={45} color="#0186C1"  />
        <Text style={styles.count}>
          {checkOuts}
        </Text>
        </View>
        <Text style={styles.txt}>
             CHECKED OUT 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
      onPress={()=> navigation.navigate('Create Booking')}
      >
        <FontAwesome5 name="book" size={45} color="#0186C1" />
        <Text style={styles.txt}>
          Create Booking
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
        onPress={()=> navigation.navigate('Night Audit')}
      >
        <FontAwesome5 name="clock" size={45} color="#0186C1" />
        <Text style={styles.txt}>
          Night Audit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
        onPress={()=> navigation.navigate('House Keeping')}
      >
        <FontAwesome5 name="bed" size={45} color="#0186C1" />
        <Text style={styles.txt}>
        House Keeping
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
        onPress={()=> navigation.navigate("Cancelled Booking")}
      >
        <FontAwesome5 name="window-close" size={45} color="#0186C1" />
        <Text style={styles.txt}>
        Cancelled Booking
        </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: '#ccc', // Color for the bottom border
    backgroundColor: '#0186C1', // Background color for the header
    paddingHorizontal: 10,
  },
  DrawerButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  ButtonText: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    height: 110,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 10,
  },txt:{
    color:"black",
    fontWeight:"bold",
    fontSize:15
  },
  count: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    width: 35,
    height: 35,
    marginLeft: 5,
    borderRadius: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5, 
    padding: 5,
    backgroundColor: '#FECD00',


    
  },
  
});

export default HomeScreen