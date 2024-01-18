import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you have FontAwesome installed
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
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

  const DetailScreen = () => {
    navigation.navigate("Cancelled Details", (item = { cancelledData }));
  };
  const fromDate = new Date(cancelledData.from_date);
const toDate = new Date(cancelledData.to_date);
const dateDifferenceInMilliseconds = toDate - fromDate;
const dateDifferenceInDays = dateDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

  console.log(cancelledData,"datatata")
  return (
    <TouchableOpacity onPress={DetailScreen}>
      <View style={styles.container}>
        <View>
          <View style={styles.roomType}>
            <Text>{firstLastCharater(cancelledData?.hotel_name)}</Text>
          </View>
          <View
            style={{ backgroundColor: "orange", marginTop: 3, borderRadius: 7 }}
          >
            <Text style={{ marginLeft: 10 }}>
              {`#${cancelledData?.guest_id}`}
            </Text>
          </View>
        </View>
        <View>
          <Text>{cancelledData?.guest_first_name} {cancelledData?.last_name}</Text>
          <Text style={{fontSize:14,marginVertical:4,backgroundColor:'orange'}}>{`#${cancelledData?.hotel_name}`}</Text>
          <Text style={{fontSize:16}}>
        {`${fromDate.toLocaleDateString('en-US', { month: 'short' })} ${fromDate.getDate()} > ${toDate.toLocaleDateString('en-US', { month: 'short' })} ${toDate.getDate()}`} <Text style={{ fontSize: 16, fontStyle: 'italic' }}> {dateDifferenceInDays}(N)</Text></Text>
        </View>
        <View>
          <View>
            <Text>{`₹ ${cancelledData?.total_sale_amount}`}</Text>
          </View>
          <View>
          <Text style={{fontSize:16,marginVertical:4}}> <FontAwesome5 name="male" size={20} color="blue" /> {`X ${ cancelledData?.no_of_adults + cancelledData?.no_of_children}`}</Text>
        </View>
        </View>
        {/* <View style={styles.verticle}>
        <FontAwesome name="ellipsis-v" size={20} color="black" />
      </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  roomType: {
    backgroundColor: "#FECD00",
    color: "#fff",
    borderRadius: 50,
    padding: 5,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: "white",
  },
  verticle: {
    width: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
});
export default CancelledCard;
