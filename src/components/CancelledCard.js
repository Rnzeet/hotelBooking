import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed
import { useNavigation } from "@react-navigation/native";
export const firstLastCharater = (item) => {
    if (item?.includes(" ")) {
      // If the item contains a space, return the first character of each word
      const words = item?.split(" ");
      return `${words[0].charAt(0)}${words[1].charAt(0)}${words[2].charAt(0)}`;
    } else {
      // If it's a single word, return the first two characters in uppercase
      return item?.slice(0, 2).toUpperCase();
    }
  };

const CancelledCard = ({ cancelledData }) => {
  const navigation = useNavigation();
  
 const DetailScreen=()=>{
navigation.navigate("Cancelled Details" ,item={cancelledData})
 }
  return (
    <TouchableOpacity onPress={DetailScreen} >
    <View style={styles.container}>
      <View style={styles.roomType}>
        <Text>
        {firstLastCharater(cancelledData?.hotel_name)}
        </Text>
      </View>
      <View>
        <Text>
          {cancelledData?.guest_first_name}
        </Text>
        <Text>
          {`#${cancelledData?.guest_id}`}
        </Text>
        <Text>
          {`${cancelledData?.from_date} > ${cancelledData?.to_date}`}
        </Text>
      </View>
      <View >
        <View>
          <Text>{`₹ ${cancelledData?.total_sale_amount}`}
          </Text>
        </View>
        <View>
          <Text>
            {`N X ${cancelledData?.no_of_nights} G X ${cancelledData?.no_of_adults + cancelledData?.no_of_children}`}
          </Text>
        </View>
      </View>
      {/* <View style={styles.verticle}>
        <FontAwesome name="ellipsis-v" size={20} color="black" />
      </View> */}
    </View>
    </TouchableOpacity>
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
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
})
export default CancelledCard;