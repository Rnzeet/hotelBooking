import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePickerComp from "../components/DateTimePicker";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

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
  const [available, setAvailable] = useState([]);
  const [error, setError] = useState();
  const [errorRev, setRevError] = useState();
  const screenWidth = Dimensions.get("window").width;
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
      AsyncStorage.getItem("userData").then((value) => {
        if (value !== null) {
          const userData = JSON.parse(value);
          setHotelCode(userData.hotel_code);
          // console.log(hotelCode)
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };
  const fetchAvailable = async () => {
    setRefreshing(true);
    getHotelCode();
    const apiUrl = "https://api.ratebotai.com:8443/availability_analysis_pms";
    if (!hotelCode) {
      getHotelCode();
    }
    const postData = {
      from_date: selectedDate,
      to_date: currDate,
      hotel_code: hotelCode,
    };
    try {
      const response = await axios.post(apiUrl, postData);
      setAvailable(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRevError(error);
    }

    setRefreshing(false);
  };
  const fetchRevenueData = async () => {
    setRefreshing(true);
    getHotelCode();
    const apiUrl = "https://api.ratebotai.com:8443/get_revenue_report";
    if (!hotelCode) {
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
    if (!hotelCode) {
      getHotelCode();
    }
    const dataToSend = {
      from_date: selectedDate ?? selectedDate,
      to_date: selectedLastDate,
      pms_hotel_code: hotelCode ? hotelCode : getHotelCode(),
    };
    try {
      const response = await axios.post(apiUrl, dataToSend);
      setApiData(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
    setRefreshing(false);
  };
  useEffect(() => {
    if (selectedDate && hotelCode) {
      fetchRevenueData();
      fetchBookedRoomData();
      fetchAvailable();
    }
  }, [selectedDate, hotelCode]);
  useFocusEffect(
    React.useCallback(() => {
      // Ensure that fetchData is called only after hotelCode is fetched
      if (hotelCode) {
        fetchRevenueData();
        fetchBookedRoomData();
        fetchAvailable();
      }
    }, [selectedDate, hotelCode])
  );

  useEffect(() => {
    fetchRevenueData();
    fetchBookedRoomData();
    fetchAvailable();
  }, []);

  const onRefresh = () => {
    fetchRevenueData();
    fetchBookedRoomData();
    fetchAvailable();
  };
  const [dateData, setDateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const datee = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ];
  useEffect(() => {
    const date = apiData?.map((dayData, index) => dayData?.date);
    const dat = date
      ? date?.map((dateValue, index) => ({ label: dateValue, value: index }))
      : [];

    setDateData(dat);
  }, [apiData]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState(
    dateData
    // datee
  );
  // const filteredApiData = apiData?.filter(dayData => dayData.date === dateData[value]?.label);

  const [filteredApiData, setFilteredApiData] = useState([]);

  useEffect(() => {
    // Update filtered data when dateData or value changes
    const filteredData = apiData?.filter(
      (dayData) => dayData.date === dateData[value]?.label
    );
    setFilteredApiData(filteredData);
  }, [dateData, value, apiData]);

  const [filteredGraphApiData, setFilteredGraphApiData] = useState([]);
  const [datevalue, setDateValue] = useState(0);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const date = available?.map((dayData, index) => dayData?.date);
    const dat = date
      ? date?.map((dateValu, index) => ({ label: dateValu, value: index }))
      : [];

    setGraphData(dat);
  }, [available]);
  useEffect(() => {
    // Update filtered data when dateData or value changes
    const filteredData = available?.filter(
      (dayData) => dayData.date === graphData[datevalue]?.label
    );
    setFilteredGraphApiData(filteredData);
  }, [graphData, datevalue, available]);

  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    if (filteredGraphApiData && filteredGraphApiData?.length > 0) {
      const chartData = filteredGraphApiData.map((entry) => ({
        date: entry.date,
        data: entry.data.map((room) => ({
          room_type_name: room.room_type_name.trim().split(" ")[0],
          total_rooms_booked: room.total_rooms_booked,
          available_rooms: room.available_rooms,   
          total_rooms: room.total_rooms,
         
        })),
      }));
      setBarChartData(chartData);
    }
  }, [available]);

  console.log(barChartData[0]?.data?.[0]?.booked_rooms, "datttaa");
 useEffect(()=>{
if(selectedDate>selectedLastDate){
  alert("Starting date cannot be greater then End date")
  setSelectedDate(currDate)
}
 },[selectedDate,selectedLastDate])
  return (
    <View style={{ paddingBottom: 10, flex: 1 }}>
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
            <View
              style={styles.section}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
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
        ) : (
          <View></View>
        )}
        {/* booked rooms stats */}
        {apiData?.length > 0 ? (
          <View
            style={styles.section}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.sectionHeader}>Booked rooms stats</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dateData}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={dateData[0]?.label}
              // searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
            {filteredApiData?.map((dayData, index) => (
              <View key={index} style={styles.section}>
                {/* <Text style={styles.sectionHeader}>{dayData?.date}</Text> */}
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
        ) : (
          <View></View>
        )}

        {barChartData?.length > 0 ? (
          <View
            style={styles.section}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.sectionHeader}>Occupancy Analysis</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={graphData}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={graphData[0]?.label}
              // searchPlaceholder="Search..."
              value={datevalue}
              onChange={(item) => {
                setDateValue(item.value);
              }}
            />
            {filteredGraphApiData?.map((chartEntry, index) => (
              <View key={index}>
                <Text style={{}}>Available Room</Text>
                <BarChart
                  style={styles.chartStyle}
                  data={{
                    labels: chartEntry.data.map((room) => {
                      // (room) => `${room.room_type_name}`
                          const bookedRooms = room.room_type_name; // Set a default value if booked_rooms is undefined
                          return bookedRooms.trim().split(/\s+/)[0];
                        }
                    ), // Include total rooms in the labels
                    // labels:
                    //   filteredGraphApiData?.length > 0
                    //     ? filteredGraphApiData[datevalue]?.data.map(
                    //         (room) => room.room_type_name.trim().split(/\s+/)[0]
                    //       )
                    //     : [],
                    datasets: [
                      {
                        // data: chartEntry.data.map((room) => room.booked_rooms),
                        data: chartEntry.data.map((room) => {
                          const bookedRooms = room.available_rooms; // Set a default value if booked_rooms is undefined
                          return bookedRooms;
                        }),
                      },
                    ],
                  }}
                  width={screenWidth - 30} // Use screenWidth from the library or your own calculation
                  height={300}
                  yAxisLabel=""
                  xAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },

                    verticalLabelRotation: 0, // Set rotation angle to 0
                    barPercentage: 0.7,
                  }}
                  horizontal
                  bezier
                  fromZero
                  withInnerLines={true}
                  withHorizontalLabels={true}
                  withVerticalLabels={true}
                  showBarTops={true}
                  showValuesOnTopOfBars={true}
                  yAxisInterval={1}
                  verticalLabelRotation={20}
                  onDataPointClick={(value) => {
                    // Handle click on data points
                    console.log(value);
                  }}
                  decorator={() => {
                    // You can add decorators to customize the chart further
                    return (
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "black" }}>Customize me!</Text>
                      </View>
                    );
                  }}
                  grid
                />
                <Text >Booked Room</Text>
                <BarChart
                  style={styles.chartStyle}
                  data={{
                    // labels: chartEntry.data.map(
                    //   (room) => `${room.room_type_name}`
                    // ), // Include total rooms in the labels
                    labels: chartEntry.data.map((room) => {
                      // (room) => `${room.room_type_name}`
                          const bookedRooms = room.room_type_name; // Set a default value if booked_rooms is undefined
                          return bookedRooms.trim().split(/\s+/)[0];
                        }
                    ), 
                    datasets: [
                      {
                        data:chartEntry.data.map((room) => {
                          const booked= room.total_rooms_booked; // Set a default value if booked_rooms is undefined
                          return booked ||[];
                      })}
                    ],
                  }}
                  width={screenWidth - 30} // Use screenWidth from the library or your own calculation
                  height={300}
                  yAxisLabel=""
                  xAxisSuffix=""
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },

                    verticalLabelRotation: 0, // Set rotation angle to 0
                    barPercentage: 0.7,
                  }}
                  horizontal
                  bezier
                  fromZero
                  withInnerLines={true}
                  withHorizontalLabels={true}
                  withVerticalLabels={true}
                  showBarTops={true}
                  showValuesOnTopOfBars={true}
                  yAxisInterval={1}
                  verticalLabelRotation={20}
                  onDataPointClick={(value) => {
                    // Handle click on data points
                    console.log(value);
                  }}
                  decorator={() => {
                    // You can add decorators to customize the chart further
                    return (
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "black" }}>Customize me!</Text>
                      </View>
                    );
                  }}
                  grid
                />
              </View>
            ))}
          </View>
        ) : (
          <View></View>
        )}
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
    marginLeft: -45,
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
    color: "#555",
    backgroundColor: "lightblue",
    padding: 8,
    borderRadius:5
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
  dropdown: {
    marginTop: 0,
    margin: 12,
    height: 45,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 6,
    backgroundColor: "#D5FFFF",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default DashboardScreen;
