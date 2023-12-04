import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import CancelledCard from "../components/CancelledCard";

const CancelledDetailsScreen = (item) => {
const data=item?.route?.params?.cancelledData
  return (
  <View style={styles.container}>
    <View style={styles.card}>
            <CancelledCard cancelledData={data} />
          </View>

          <View style={styles.card}>
            <Text style={{marginTop:10,marginBottom:5}}>
              GUEST INFORMATION
            </Text>
            <View style={styles.line}></View>
            <Text style={{marginTop:10}}>{data?.guest_first_name} {data?.last_name}</Text>
            <Text style={{marginTop:5}}>{data?.email}</Text>
            <Text style={{marginTop:5}}>{data?.mobile_number}</Text>
            <Text style={{marginTop:10}}>{data?.country}</Text>
          </View>
          <View style={styles.card}>
          <View style={styles.balanceAmount}>
            <Text>Balance Amount</Text>
            <Text>{data?.balance_amount}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.balanceAmount}>
            <Text>Total Paid</Text>
            <Text>{data?.paid_amount}</Text>
          </View>
          </View>
         
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  balanceAmount:{
    flexDirection:"row",
    justifyContent:'space-between',
    padding: 15,
    paddingHorizontal: 10,

  },
  line: {
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: 'black', // Change the color of the line
  },
});
export default CancelledDetailsScreen;
