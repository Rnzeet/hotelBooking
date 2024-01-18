import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed
import { FontAwesome5 } from '@expo/vector-icons';
export const firstLastCharater = (item) => {
  if (item?.includes(" ")) {
    // If the item contains a space, return the first character of each word
    const words = item?.split(" ");
    return `${words[0]?.charAt(0)}${words[1]?.charAt(0)}`;
  } else {
    // If it's a single word, return the first two characters in uppercase
    return item?.slice(0, 2)?.toUpperCase();
  }
};

const SimpleCard = ({ dates,item,details,id }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };
console.log(item,details,"dates")
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
          {details?.firstName}  {details?.lastName}
        </Text>
        <Text style={{backgroundColor:'orange',borderRadius:5,textAlign:'center'}}>
          {`# ${item?.type}`}
        </Text>
        <Text>
        {`${formatDate(dates.checkInDate)} > ${formatDate(dates.checkOutDate)}`}
        </Text>
      </View>
      <View >
        <View>
          <Text>{`₹ ${item.price}`}
          </Text>
        </View>
        <View>
          <Text>
             <FontAwesome5 name="male" size={20} color="blue" />   X  {details?.adult+details?.child}
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