import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import CancelledCard from "../components/CancelledCard";

const CancelledDetailsScreen = (item) => {
  const data = item?.route?.params?.cancelledData;
  console.log(item,data,"hey you")
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <CancelledCard cancelledData={data} />
      </View>

      <View style={styles.card}>
        <Text
          style={{
            marginTop: 10,
            fontSize: 15,
            marginBottom: 5,
            fontWeight: "500",
            backgroundColor: "#90EE90",
            padding: 5,
            marginHorizontal: 0,
            borderRadius: 5,
          }}
        >
          GUEST INFORMATION
        </Text>
        <View style={styles.line}></View>
        <Text style={{ marginTop: 10,fontWeight:500,fontSize:14 }}>
          {data?.guest_first_name} {data?.last_name}
        </Text>
        <Text style={{ marginTop: 5 }}>{data?.email}</Text>
        <Text style={{ marginTop: 5 }}>{data?.mobile_number}</Text>
        <Text style={{ marginTop: 10 }}>{data?.country}</Text>
      </View>
      <View style={[styles.card, {backgroundColor:'lightgreen',marginHorizontal:0}]}>
          <View style={styles.balanceAmountpaid}>
            <Text>Room Charge</Text>
            <Text>{data?.total_sale_amount}</Text>
          </View>
          <View style={styles.balanceAmountpaid}>
            <Text>Discount Amount</Text>
            <Text>- {data?.discount_value}</Text>
          </View>
          <View style={styles.balanceAmountpaid}>
            <Text>Other Charge</Text>
            <Text>0</Text>
          </View>
          <View style={styles.balanceAmountpaid}>
            <Text>Room Tax</Text>
            <Text>{data?.tax_amount}</Text>
          </View>
          <View style={styles.balanceAmountcharge}>
            <Text>Total Paid</Text>
            <Text>{data?.paid_amount}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.balanceAmount}>
            <Text style={{fontSize:15,fontWeight:"600"}}>Balance Amount</Text>
            <Text style={{fontSize:15,fontWeight:"600"}}>{data?.balance_amount}</Text>
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
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  balanceAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingHorizontal: 10,
  },
  line: {
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: "black", // Change the color of the line
  },
  balanceAmountpaid: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 15,
    paddingHorizontal: 10,
  },
  balanceAmountcharge: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingHorizontal: 10,
  },
});
export default CancelledDetailsScreen;
