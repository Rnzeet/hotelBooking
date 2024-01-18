import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";
import axios from "axios";
import NavigationHead from "../components/NavigationHead";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
// import { Calendar } from "react-native-big-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Agenda } from "react-native-calendars";
import CollapsibleCard from "../components/CollapsableCard";

const BookingCalendar = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState();
  // ========================================
  const [hotelCode, setHotelCode] = useState("");
  const [checkIns, setCheckIns] = useState([]);
  const fetchHotelCode = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setHotelCode(userData.hotel_code);
      } else {
        console.log("User data not found.");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const fetchData = async () => {
    setRefreshing(true);

    const apiUrl = "https://api.ratebotai.com:8443/get_check_in_orders";
    const postData = {
      from_date: formatDateSelect(selectedDate),
      // to_date: formatDateSelect(generateNextDates().slice(3)[0]),
      to_date: formatDateSelect(selectedDate),
      hotel_code: hotelCode,
    };
    console.log(postData, "dataaa");
    try {
      const response = await axios.post(apiUrl, postData);
      const filteredCheckIns = response.data.data.filter(
        (booking) => booking.booking_status === "pending"
      );
      setCheckIns(response?.data?.data);
      setStatus(response.data.data);
      const items = {};

      response?.data?.data?.forEach((booking) => {
        const startDate = new Date(booking.from_date);
        const endDate = new Date(booking.to_date);

        // Loop through dates within the range and add an event for each day
        while (startDate <= endDate) {
          const formattedDate = formatDateSelect(startDate);
          if (!items[formattedDate]) {
            items[formattedDate] = [];
          }
          items[formattedDate].push({
            hotelName: booking.hotel_name,
            bookingStatus: booking.booking_status,
            roomTitle: booking?.room_booking_info?.room_title,
            roomId: booking?.booking_id,
            guestId: booking?.guest_id,
            guestName:booking?.guest_first_name,
            guestLastName:booking?.last_name,
            roomNo:booking?.room_booking_info?.room_name
          });

          startDate.setDate(startDate.getDate() + 1);
        }
      });

      // Set the items for the Agenda
      setItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }

    setRefreshing(false);
  };

  const fetchAvailableData = async () => {
    setRefreshing(true);

    const apiUrl = "https://api.ratebotai.com:8443/current_rooms_analysis_pms";
    const postData = {
      hotel_code: hotelCode,
      from_date: formatDateSelect(selectedDate),
    };
    console.log(postData, "dataaa");
    try {
      const response = await axios.post(apiUrl, postData);
      setAvailable(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        fetchAvailableData();
      }
    }, [selectedDate, hotelCode])
  );

  const onRefresh = () => {
    fetchData();
    fetchAvailableData();
  };
  // =====================================================================
  const handleDayPress = (day) => {
    setSelectedDate(new Date(day.dateString));
  };
  // const onDayChange = (day) => {
  //   setSelectedDate(new Date(day.dateString));
  // };

  const formatDateSelect = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // const handleBackPress = () => {
  //   navigation.navigate("Home");
  // };

  // const generateNextDates = () => {
  //   const nextDates = [];
  //   for (let i = 1; i <= 5; i++) {
  //     const nextDate = new Date(
  //       selectedDate.getTime() + i * 24 * 60 * 60 * 1000
  //     );
  //     nextDates.push(nextDate);
  //   }
  //   return nextDates;
  // };
  const onCardNav = useCallback(
    (guest_id) => {
      const checkInDatas = checkIns.find(
        (booking) => booking?.guest_id === guest_id
      );
      if (checkInDatas && checkInDatas?.booking_status === "pending") {
        navigation.navigate("Reservation Details", {
          checkInDatas,
          hotelCode,
        });
      } else if (checkInDatas && checkInDatas?.booking_status === "check_in") {
        navigation.navigate(
          "CheckIn Details",
          (item={checkInDatas, hotelCode })
        );
      }
      else if (checkInDatas && checkInDatas?.booking_status === "check_out") {
        navigation.navigate(
          "CheckOut Details",
          (item = { checkOutDatas: checkInDatas, hotelCode })
        );
        }
    [checkIns, hotelCode, navigation]
      });
  // const [exitAlertVisible, setExitAlertVisible] = useState(false);
  // const isFocused = useIsFocused();
  // const showExitAlert = () => {
  //   Alert.alert(
  //     "Exit App",
  //     "Are you sure you want to exit?",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => setExitAlertVisible(false),
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: () => BackHandler.exitApp() },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  // useEffect(() => {
  //   const handleBackPress = () => {
  //     if (isFocused) {
  //       // Check if you are on the first tab ("TapeChart")
  //       const parentNavigator = navigation.getParent(); // Use dangerouslyGetParent
  //       if (parentNavigator && parentNavigator.getState().index === 0) {
  //         // If on the first tab, exit the app
  //         setExitAlertVisible(true);
  //         return true;
  //       }
  //     }

  //     // If not on the first tab or not focused, let the default back behavior happen
  //     return false;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     handleBackPress
  //   );

  //   return () => backHandler.remove();
  //   setExitAlertVisible(false);
  // }, [isFocused, navigation]);
  useEffect(() => {
    // Fetch data based on selectedDate and update items state
    fetchData();
    fetchAvailableData();
  }, [selectedDate, hotelCode]);

  console.log(items, checkIns, loading, "gatteee");
  return (
    <View
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: "column", justifyContent: "flex-start" ,}}>
        {/* <View style={styles.container}>
          <View></View>
          <TouchableOpacity style={styles.arrowButton} onPress={onPrevDate}>
            <Text style={{ color: "white" }}>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </View>
          <TouchableOpacity style={styles.arrowButton} onPress={onNextDate}>
            <Text style={{ color: "white" }}>{">"}</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine}></View>
          <FlatList
            data={[selectedDate, ...generateNextDates()]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(date) => date.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{formatDate(item)}</Text>
              </View>
            )}
          />
        </View> */}
        {/* <View style={{marginTop:20}}>
         <FlatList
          data={generateNextDates().slice(3)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(date) => date.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(item)}</Text>
            </View>
          )}
        />
        </View> */}
      </View>
      {/* <ScrollView style={{ flex: 1 }}> */}

      <Agenda
        items={items}
        selected={formatDateSelect(selectedDate)}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => {
              onCardNav(item.guestId);
            }}
            key={item.guestId}
          >
            <View
              style={[
                styles.itemContainer,
                {
                  backgroundColor:
                    item.bookingStatus === "pending"
                      ? "blue"
                      : item.bookingStatus === "cancelled"
                      ? "pink"
                      : item.bookingStatus === "check_in"
                      ? "green"
                      : item.bookingStatus === "check_out"
                      ? "red"
                      : "purple",
                },
              ]}
            >
              <View style={styles.leftItem}>
                <Text style={styles.roomTitle}>{item?.roomTitle}</Text>
                <Text style={styles.roomId}>#{item?.roomId}</Text>
              </View>
              <View style={styles.rightItem}>
              <Text style={styles.roomTitle}>{item?.guestName} {item?.guestLastName}</Text>
                <Text style={styles.roomId}>{item?.hotelName}</Text>
                <Text style={[styles.roomId,{fontSize:14,fontWeight:'bold'}]}>{item?.roomNo}</Text>
                {/* <Text style={styles.roomId}>Status: {item?.bookingStatus}</Text> */}
                {item.bookingStatus === "pending" ? (
                <Text style={styles.roomId}>Status:Confirmed</Text>
              ) : (
                <Text style={styles.roomId}>
                  Status: {item?.bookingStatus}
                </Text>
              )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        onDayPress={(day) => handleDayPress(day)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderEmptyData={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginVertical: 30,
                  marginHorizontal: 50,
                  fontWeight: "600",
                  fontSize: 18,
                }}
              > {Object.keys(items).length === 0 && (
    <Text>No data available</Text>
  )}
              </Text>
            </View>
          );
        }}
      />
      <View style={{ marginBottom: 0 }}></View>
      <CollapsibleCard content={available} />
      {/* {exitAlertVisible && showExitAlert()} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: "#5A5A5A",
  },
  arrowButton: {
    justifyContent: "center",
    padding: 2,
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5A5A",
    width: 50,
    height: 35,
    marginHorizontal: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  verticalLine: {
    backgroundColor: "white",
    height: "95%", // Adjust the height as needed
    width: 1.5,
    marginHorizontal: 5,
  },
  bottomFixedView: {
    backgroundColor: "grey", // Add your desired background color
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  textWhite: {
    color: "white",
  },
  line: {
    marginTop: 5,
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: "black", // Change the color of the line
  },
  table: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "grey", // Add your desired background color
    alignItems: "flex-start",
    justifyContent: "center",
    // padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cell2: {
    // flex: 1,
    width: "25%",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    flexWrap: "nowrap",
  },
  separator: {
    width: 1,
    backgroundColor: "black",
  },
  text: {
    fontWeight: "medium",
    color: "white",
  },
  redBox: {
    marginLeft: 30,
    width: 20, // Adjust width as needed
    height: 20, // Adjust height as needed
    backgroundColor: "red",
    // marginVertical: 10, // Adjust spacing as needed
  },
  greenBox: {
    marginLeft: 30,
    width: 20, // Adjust width as needed
    height: 20, // Adjust height as needed
    backgroundColor: "green",
    // marginVertical: 10, // Adjust spacing as needed
  },
  bllueBox: {
    marginLeft: 30,
    width: 20, // Adjust width as needed
    height: 20, // Adjust height as needed
    backgroundColor: "blue",
    // marginVertical: 10, // Adjust spacing as needed
  },
  rowHeader: {
    width: 80, // Adjust width as needed
    height: 50, // Adjust height as needed
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5A5A",
  },
  rowHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  day: {
    width: 63,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dayText: {
    fontSize: 18,
    color: "black",
  },
  eventText: {
    marginTop: 5,
    color: "blue",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    // marginRight: 10,
    marginTop: 17,
    paddingRight: 10,
  },
  leftItem: {
    flex: 1,
    // marginRight: 10,
  },
  rightItem: {
    flex: 2,
  },
  roomTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  roomId: {
    color: "white",
    // fontWeight: "bold",
  },
  emptyDateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyDateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
});

export default BookingCalendar;
