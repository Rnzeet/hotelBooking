import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import NavigationHead from "../components/NavigationHead";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { Calendar } from "react-native-big-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Agenda } from "react-native-calendars";

const DateSlider = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState({});
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
      to_date: formatDateSelect(generateNextDates().slice(3)[0]),
      // to_date: formatDateSelect(selectedDate),
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

      checkIns?.forEach((booking) => {
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
            roomId: booking?.room_booking_info?.room_id,
          });

          startDate.setDate(startDate.getDate() + 1);
        }
      });

      // Set the items for the Agenda
      setItems(items);
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
      }
    }, [selectedDate, hotelCode])
  );

  const onRefresh = () => {
    fetchData();
  };
  // =====================================================================

  const events = {
    "2023-12-25": [{ name: "Meeting" }],
    "2023-12-30": [{ name: "Coffee break" }],
    // Add more events as needed
  };
  // const handleDayPress = (day) => {
  //   console.log('Selected day:', day);
  //   // You can handle the selected day as needed
  // };
  const handleDayPress = (day) => {
    setSelectedDate(new Date(day.dateString));
  };
  const onDayChange = (day) => {
    setSelectedDate(new Date(day.dateString));
  };

  // const onPrevDate = () => {
  //   const prevDate = new Date(selectedDate);
  //   prevDate.setDate(selectedDate.getDate() - 1);
  //   setSelectedDate(prevDate);
  // };

  // const onNextDate = () => {
  //   const nextDate = new Date(selectedDate);
  //   nextDate.setDate(selectedDate.getDate() + 1);
  //   setSelectedDate(nextDate);
  // };

  // const formatDate = (date) => {
  //   const options = { month: "short", day: "numeric" };
  //   return date.toLocaleDateString("en-US", options);
  // };

  const formatDateSelect = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

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

  const generateNextDates = () => {
    const nextDates = [];
    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(
        selectedDate.getTime() + i * 24 * 60 * 60 * 1000
      );
      nextDates.push(nextDate);
    }
    return nextDates;
  };

  console.log(items, checkIns, formatDateSelect(selectedDate), "gatteee");
  return (
    <View
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
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
      <ScrollView style={{ flex: 1 }}>
        {/* <Agenda
        items={events}
        selected={'2023-12-26'} // Set the initial selected day
        renderItem={(item) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderEmptyDate={() => (
          <View style={styles.emptyDate}>
            <Text>No events</Text>
          </View>
        )}
        renderDay={(day, item) => (
          <View style={styles.day}>
            <Text style={styles.dayText}>{day.day}</Text>
            {item && <Text style={styles.eventText}>{item.name}</Text>}
          </View>
 )}
        onDayPress={(day) => handleDayPress(day)}
      /> */}
        {/* <Agenda
          items={sampleEvents} // Use the sampleEvents data here
          selected={formatDateSelect(selectedDate)}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          )}
          renderEmptyData={() => {
    return <View />;
  }}


          renderDay={(day, item) => {
            const dayText = day && day.day ? day.day.toString() : "";
            return (
              <View style={styles.day}>
                <Text style={styles.dayText}>{dayText}</Text>
                {item && (
                  <View>
                    <Text style={styles.eventText}>{item.name}</Text>
                    <Text
                      style={styles.eventText}
                    >{`${item.startTime} - ${item.endTime}`}</Text>
                  </View>
                )}
              </View>
            );
          }}
          onDayPress={(day) => handleDayPress(day)}
        /> */}

        {/* <Agenda
          items={items}
          selected={selectedDate}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text>{item.hotelName}</Text>
              <Text>Status: {item.bookingStatus}</Text>
            </View>
          )}
          renderEmptyData={() => {
            return <View />;
          }}
          renderDay={(day, item) => {
            const dayText = day && day.day ? day.day.toString() : "";
            return (
              <View style={styles.day}>
                <Text style={styles.dayText}>{dayText}</Text>
                {item && (
                  <View>
                    <Text style={styles.eventText}>{'item.hotelName'}</Text>
                    <Text
                      style={styles.eventText}
                    >{item.bookingStatus}</Text>
                  </View>
                )}
              </View>
            );
          }}
          onDayPress={(day) => handleDayPress(day)}
        /> */}

        {/* <Agenda
          items={items}
          selected={selectedDate}
          renderItem={(item) => (
            <View style={styles.itemContainer}>
              <View style={styles.leftItem}>
                <Text style={styles.roomTitle}>{item.roomTitle}</Text>
                <Text style={styles.roomId}>#{item.roomId}</Text>
              </View>
              <View style={styles.rightItem}>
                <Text>{item.hotelName}</Text>
                <Text>Status: {item.bookingStatus}</Text>
               
              </View>
            </View>
          )}
          renderEmptyData={() => {
            return <View />;
          }}
          renderDay={(day, item) => {
            const dayText = day && day.day ? day.day.toString() : "";
            return (
              <View style={styles.day}>
                <Text style={styles.dayText}>{dayText}</Text>
                {item && (
                  <View>
                    <Text style={styles.eventText}>{item.hotelName}</Text>
                   
                  </View>
                )}
              </View>
            );
          }}
          onDayPress={(day) => handleDayPress(day)}
        />  */}

        <Agenda
          items={items}
          selected={formatDateSelect(selectedDate)}
          renderItem={(item) => (
            <View  style={[
        styles.itemContainer,
        {
          backgroundColor:
            item.bookingStatus === "pending"
              ? "blue"
              : item.bookingStatus === "cancelled"
              ? "red"
              : item.bookingStatus === "check_in"
              ? "green"
              : "white",
        },
      ]}>
              <View style={styles.leftItem}>
                <Text style={styles.roomTitle}>{item.roomTitle}</Text>
                <Text style={styles.roomId}>#{item.roomId}</Text>
              </View>
              <View style={styles.rightItem}>
                <Text>{item.hotelName}</Text>
                <Text>Status: {item.bookingStatus}</Text>
              </View>
            </View>
          )}
          renderEmptyData={() => {
            return <View />;
          }}
          onDayPress={(day) => handleDayPress(day)}
        />

        <View style={{ marginTop: 40, marginBottom: 150 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.greenBox}></View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              Occupied//Checked In
            </Text>
            <View style={styles.redBox}></View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              Cancelled
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.bllueBox}></View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              Reserved
            </Text>
            <View style={styles.redBox}></View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              Checked Out
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.table}>
        {/* Row 1 */}
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.text}>Available Room</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 2</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 3</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 4</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 5</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 6</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.text}>Occupancy</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 2</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 3</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 4</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 5</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.cell}>
            <Text style={styles.text}> 6</Text>
          </View>
        </View>
      </View>
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
  },
  roomId: {
    color: "#555",
  },
});

export default DateSlider;
