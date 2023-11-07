import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5,FontAwesome } from '@expo/vector-icons';
import DatePickerComp from '../components/DateTimePicker';
import { userDataRemover } from '../APIS/Context';


const HomeScreen = ({navigation}) => {
  const currDate = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [currTime, setCurrTime] = useState(new Date().toLocaleTimeString());
  const [refreshing, setRefreshing] = React.useState(false);

  const logOut = async () => {

   try {
    const res = await userDataRemover();
    console.log(res)
    if(res){
      navigation.navigate('login')
    }
    else{
      alert("Something went wrong")
      navigation.navigate('login')
    }
   } catch (error) {
     alert(error)
   }

  }

  const onRefresh = React.useCallback(() => {
   
    setRefreshing(true);
    setTimeout(() => {
      setCurrTime(new Date().toLocaleTimeString());
      setSelectedDate(new Date().toISOString().slice(0, 10));
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
        <View style={styles.count}>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 25,color:"white" }}>{currTime}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.card}
         onPress={() => navigation.navigate('Check In List')}
      >
        <FontAwesome5 name='key' size={45} color="#0186C1" />
        <Text style={styles.txt}>
             CHECKED IN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
       onPress={() => navigation.navigate('Check Out List')}
      >
        <FontAwesome5 name="door-open" size={45} color="#0186C1" />
        <Text style={styles.txt}>
          CHECKED OUT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
       onPress={() => navigation.navigate('Create Booking')}
      >
        <FontAwesome5 name="concierge-bell" size={45} color="#0186C1" />
        <Text style={styles.txt}>
           RESERVE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome5 name="shopping-cart" size={45} color="#0186C1" />
        <Text style={styles.txt}>
          POS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}
       onPress={() => {logOut()}}
      >
        <FontAwesome5 name="power-off" size={25} color="red" />
        <Text style={{color:"red"}}>
            LOGOUT
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
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 10,
  },txt:{
    color:"black",
    fontWeight:"bold",
    fontSize:15
  }
});

export default HomeScreen