import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed

export const firstLastCharater = (item) => {
  if (item.includes(" ")) {
    // If the item contains a space, return the first character of each word
    const words = item?.split(" ");
    return `${words[0].charAt(0)}${words[1].charAt(0)}${words[2].charAt(0)}`;
  } else {
    // If it's a single word, return the first two characters in uppercase
    return item?.slice(0, 2).toUpperCase();
  }
};

const CheckOutCard = ({ checkInDatas }) => {
// console.log()
console.log(checkInDatas,"data")
  return (
    <View style={styles.container}>
      <View style={styles.roomType}>
        <Text>
          {firstLastCharater(checkInDatas?.hotel_name)}
        </Text>
      </View>
      <View>
        <Text>
          {checkInDatas?.guest_first_name}
        </Text>
        <Text>
          {`#${checkInDatas?.guest_id}`}
        </Text>
        <Text>
          {`${checkInDatas?.from_date} > ${checkInDatas?.to_date}`}
        </Text>
      </View>
      <View >
        <View>
          <Text>{`₹ ${checkInDatas?.total_sale_amount}`}
          </Text>
        </View>
        <View>
          <Text>
            {`N X ${checkInDatas?.no_of_nights} G X ${checkInDatas?.no_of_adults + checkInDatas?.no_of_children}`}
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
export default CheckOutCard