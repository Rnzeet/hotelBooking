import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed

const RoomStatus = (checkInDatas) => {
  if (checkInDatas.room_booking_info.room_title === "Standard Room Testing") {
    return "ST";
  }
  else if (checkInDatas.room_booking_info.room_title === "Dulex Room") {
    return "DR";
  }
  else if (checkInDatas.room_booking_info.room_title === "AC single room") {
    return "ACSR";
  }
  else {
    return "MULTI"
  }
}

const SimpleCard = ({ dates,item,details,id }) => {
  const firstLastCharater = (item) => {
    if (item.includes(" ")) {
      // If the item contains a space, return the first character of each word
      const words = item.split(" ");
      return `${words[0].charAt(0)}${words[1].charAt(0)}`;
    } else {
      // If it's a single word, return the first two characters in uppercase
      return item.slice(0, 2).toUpperCase();
    }
  };
  


// console.log()
  return (
    <View style={styles.container}>
      <View style={styles.roomType}>
        <Text>  
          {/* {RoomStatus(checkInDatas)} */}
          {firstLastCharater(item?.type)}
        </Text>
      </View>
      <View>
        <Text>
          {details?.firstName}
        </Text>
        <Text>
          {`#${id}`}
        </Text>
        <Text>
          {`${dates.checkInDate} > ${dates.checkOutDate}`}
        </Text>
      </View>
      <View >
        <View>
          <Text>{`₹ ${item.price}`}
          </Text>
        </View>
        <View>
          <Text>
            {`N X ${item.count}`}
          </Text>
        </View>
      </View>
      <View style={styles.verticle}>
        <FontAwesome name="ellipsis-v" size={20} color="black" />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  roomType: {
    backgroundColor: '#FECD00',
    color: '#fff',
    borderRadius: 50,
    padding: 5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: 'white'
  },
  verticle:{
    width:5,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
  }
})
export default SimpleCard