import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePickerComp from "../components/DateTimePicker";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const DashboardScreen = () => {
  // console.log(data, "data breached inside");
  const [hotelCode, setHotelCode] = useState(null);
  const currDate = new Date().toISOString().slice(0, 10);
  const currentDate = new Date();
  const oneWeekEarlier = new Date(currentDate);
  oneWeekEarlier.setDate(currentDate.getDate() - 7);
  const [selectedDate, setSelectedDate] = useState(
    oneWeekEarlier.toISOString().slice(0, 10)
  );
  const [selectedLastDate, setSelectedLastDate] = useState(currDate);
  const [refreshing, setRefreshing] = React.useState(false);
  const [apiData, setApiData] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [error,setError]=useState();
  const [errorRev,setRevError]=useState();
  
  AsyncStorage.getItem("userData")
    .then((userDataString) => {
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setHotelCode(userData.hotel_code);
      } else {
        console.log("User data not found.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving user data:", error);
    });
    const getHotelCode = () => {
      try {
          AsyncStorage.getItem('userData').then((value) => {
              if (value !== null) {
                  const userData = JSON.parse(value);
                  setHotelCode(userData.hotel_code);
                  // console.log(hotelCode)
              }
          });

      } catch (error) {
          alert("something went wrong")
      }
  }

  const fetchRevenueData = async () => {
    setRefreshing(true);
    getHotelCode();
    const apiUrl = "https://api.ratebotai.com:8443/get_revenue_report";
    if(!hotelCode){
      getHotelCode();
    }
    const postData = {
      from_date: selectedDate,
      to_date: currDate,
      hotel_code: hotelCode,
    };
    try {
      const response = await axios.post(apiUrl, postData);
      setCheckIns(response?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRevError(error);
    }

    setRefreshing(false);
  };
  const fetchBookedRoomData = async () => {
    setRefreshing(true);
    getHotelCode();
    const apiUrl = "https://api.ratebotai.com:8443/booked_room_stats_pms";
    if(!hotelCode){
      getHotelCode();
    }
    const dataToSend = {
      from_date: selectedDate ?? selectedDate,
      to_date: selectedLastDate,
      pms_hotel_code: hotelCode ? hotelCode:getHotelCode(),
    };
    try {
      const response = await axios.post(apiUrl, dataToSend);
      setApiData(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }
    setRefreshing(false);
  };
  useEffect(() => {
    if (selectedDate  && hotelCode) {
      fetchRevenueData();
      fetchBookedRoomData();
    }
  }, [selectedDate,hotelCode]);
  useEffect(() => {
    fetchRevenueData();
    fetchBookedRoomData();
  }, []);

  const onRefresh = () => {
    fetchRevenueData();
    fetchBookedRoomData();
  };

  console.log(apiData,checkIns, "datttaa");
  return (
    <View
      style={{ paddingBottom: 10, flex: 1 }}
    >
      <View style={styles.header}>
        <DatePickerComp
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          maximumDate={currDate}
          style={{ color: "#fff", alignItems: "center" }}
        />
        <DatePickerComp
          selectedDate={selectedLastDate}
          onDateChange={setSelectedLastDate}
          disabled={true}
          maximumDate={currDate}
          style={{ color: "#fff", alignItems: "center" }}
        />
      </View>
      <ScrollView style={{ padding: 16, marginBottom: 10 }}>
        {checkIns?.data ? (
          <View>
 <View style={styles.section}
             refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
              <Text style={styles.sectionHeader}>Revenue List</Text>
              {Object?.entries(checkIns?.data).map(([key, value]) => (
                <View key={key} style={styles.item}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>{key}:</Text>
                    <Text>{JSON.stringify(value)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (<View>
               {errorRev ? 
               <Text>Api Failed to Fetch Data</Text> :
                 <Text>Loading...</Text>
               }</View>)}
        {/* booked rooms stats */}
        {apiData?.length > 0 ? (
          <View style={styles.section}
           refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
          <Text style={styles.sectionHeader}>Booked rooms stats</Text>
            {apiData?.map((dayData, index) => (
              <View key={index} style={styles.section}>
              
                <Text style={styles.sectionHeader}>{dayData?.date}</Text>
                {dayData?.rooms?.map((room, roomIndex) => (
                  <View key={roomIndex} style={styles.item}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>{room?.room_type_name}:</Text>
                      <Text>Sold Stock: {room.sold_stock}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) :(<View>
               {error ? 
               <Text>Api Failed to Fetch Data</Text> :
                 <Text>Loading...</Text>
               }</View>)}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333333",
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#0186C1",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#fff", // White background
    padding: 16,
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555", // Dark gray text color
  },
  item: {
    marginLeft: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DashboardScreen;
