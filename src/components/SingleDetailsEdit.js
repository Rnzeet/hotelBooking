import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SimpleCard from './SimpleCard';
import Modal from 'react-native-modal'; // Import the modal library
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


const SingleDetailsEdit = ({ navigation, rooms,total,count,details,dates ,updatePayments,bookingId}) => {


  const [personDetails, setPersonDetails] = useState(details.personDetails);
  const selectedServices = details.selectedServices[0];
  const [totalPaid, setTotalPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(total);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false); // Control the payment modal visibility
  const [cashierName, setCashierName] = useState(""); // Store cashier name
  const [discount, setDiscount] = useState(0);
  const [isPreferenceModalVisible, setPreferenceModalVisible] = useState(false); // Control the payment modal visibility
  const [preferences, setPreferences] = useState([]);
  const [newPreferences, setNewPreferences] = useState("");

  const generateUniqueOrderId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}${month}${hours}${minutes}`;
  };
  const [uniqueId, setUniqueId] = useState(generateUniqueOrderId());

  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible);
  };

  const togglePreferenceModal = () => {
    setPreferenceModalVisible(!isPreferenceModalVisible);
  };

  const handlePayment = () => {

    // {
    //   "booking_id": 3389,
    //   "paid_amount": 500,
    //   "gross_amount": 3584.00,
    //   "online": 0,
    //   "upi": 0,
    //   "card": 0,
    //   "cash": 500,
    //   "description": "dagdctdvctd dcgwvcwvytc"
    //   }
    // Simulate an API request to update payment details.
    // Replace this with your actual API request.\
    const paymentData = {
      booking_id: bookingId,
      paid_amount: totalPaid,
      gross_amount: total,
      online: paymentMethod === "card" ? paymentAmount : 0,
      upi: paymentMethod === "upi" ? paymentAmount : 0,
      card: paymentMethod === "card" ? paymentAmount : 0,
      cash: paymentMethod === "cash" ? paymentAmount : 0,
      description: cashierName,       
    }

    setTotalPaid(totalPaid + paymentAmount);
    setUniqueId(generateUniqueOrderId()+paymentAmount);
    const paymentDetails = {
      name: cashierName,
      online: paymentMethod === "card" ? paymentAmount : 0,
      card: paymentMethod === "card" ? paymentAmount : 0,
      upi: paymentMethod === "upi" ? paymentAmount : 0,
      cash: paymentMethod === "cash" ? paymentAmount : 0,
      wallet: 0,
      total_payment: paymentAmount,
      discount: discount,
      total: total,
      uId: uniqueId,
      totalPaid: totalPaid,
    };

    // Update the total paid amount and reset the payment form.
    
    updatePayments(paymentDetails)
    

    //api call
    const apiUrl = 'https://api.ratebotai.com:8443/insert_payment_data';
    const paymentResponse = axios.post(apiUrl, paymentData);
    console.log(paymentResponse,"paymentResponse");  

    setPaymentMethod("");
    setPaymentAmount(0);
    setCashierName(""); // Reset cashier name
    setDiscount(0); // Reset discount
    togglePaymentModal(); // Close the payment modal
  };
  console.log(bookingId,"bookingId")
  const handlePreferences = () => {
     setPreferences([...preferences, newPreferences]);
    //  console.log(preferences,newPreferences,"lkjfhdgf")
      setNewPreferences("");
     togglePreferenceModal(); // Close the payment modal

  }
   const navigations = useNavigation();
   const OnhandleHome = () => {
    // Wrap the navigation inside a function and call it
    const resetAndNavigateHome = () => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigations.dispatch(resetAction);
    };

    resetAndNavigateHome();
  };
// const OnhandleHome=()=>{
//   navigations.navigate('Home');
// }
// // Inside your component or navigation screen
// const resetAction = CommonActions.reset({
//   index: 0, // Index of the screen to navigate to (in this case, the first screen)
//   routes: [
//     { name: 'Home' }, // Replace 'HomeScreen' with the name of your desired screen
//   ],
// });

// // Use the reset action to clear the stack and navigate to the specified screen
// navigation.dispatch(resetAction);

  console.log(selectedServices,"services")
  return (
    <View >
      <View style={styles.header2}>
        <View style={styles.check}>
          <View style={styles.count2}>
            <View style={{ alignItems: 'center', fontWeight: 'bold', color: "white", fontSize: 20 }}>
              <FontAwesome name="bell" size={20} color="white" />
            </View>
          </View>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 17, marginTop: 12, color: 'white' }}>#{bookingId}</Text>
          <FontAwesome name="ellipsis-h" style={{ marginTop: 15, marginLeft: 5, color: "#FECD00" }} size={20} color="white" />
        </View>
        <View style={styles.check}>
          <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 24, color: 'white' }}>₹ {total}</Text>
        </View>
      </View>

      <ScrollView style={styles.cards}>
        {rooms?.map((item, index) => (
          <View key={index} style={styles.card}>
            <SimpleCard
              item={item}
              id={bookingId}
              details={personDetails}
              dates={dates}
            />
          </View>
        ))}
      </ScrollView>
      {/* <View style={{ marginHorizontal:8, borderRadius: 12,marginVertical:30,backgroundColor:'lightblue',padding:10}}>
      <View >   
        <Text style={{ color: "black", fontWeight: 600, fontSize: 18, }}>
          Add Ons   
        </Text>
      </View>
      <View style={styles.line}></View>
      {selectedServices.map((serviceGroup, index) => (
        <View key={index} style={{flexDirection:'row',justifyContent:'space-between'}}> 
        <Text  style={{ color: "black", fontWeight: 500, fontSize: 16, marginTop:10,}}>{serviceGroup?.name}</Text>
        <Text  style={{ color: "black", fontWeight: 500, fontSize: 16,right:10,marginTop:10 }}>$ {serviceGroup?.price}</Text>
        </View>
      ))}
    </View> */}


      <View style={styles.payCard}>
        <Text style={{ color: "white", fontWeight: 400, fontSize: 18 }}>
          Balance Amount
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
          <Text style={{ color: '#FECD00', fontSize: 26, fontWeight: 800 }}>
          ₹ {total - totalPaid}
          </Text>
          {/* <TouchableOpacity onPress={togglePaymentModal}>
            <Text style={styles.btn}>
              Pay Now
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.totalPay}>
        <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5, marginLeft: 15, color: '#FECD00' }}>Total Paid</Text>
        <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5, marginRight: 15, color: '#FECD00' }}>₹ {totalPaid}</Text>
      </View>
      <ScrollView style={styles.cards}>
          {/* <View style={styles.preferenceBtn}>
            <TouchableOpacity onPress={togglePreferenceModal} style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
              <Text style={styles.btn}>
                <FontAwesome name="pencil" size={16} color="#000" />
                Preferences
              </Text>
            </TouchableOpacity>
          </View> */}

          {preferences?.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={{ fontWeight: 500, fontSize: 18, marginTop: 5, marginLeft: 15, color: '#FECD00' }}>{item}</Text>
            </View>
          ))}
        </ScrollView>
  <View style={styles.preferenceBtn}>
            <TouchableOpacity onPress={OnhandleHome} style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
              <Text style={styles.btn}>
                {/* <FontAwesome name="pencil" size={16} color="#000" /> */}
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
      {/* Payment Modal */}
      <Modal isVisible={isPaymentModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Payment Details</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[styles.input, { width: "30%" }, paymentMethod === "card" && { backgroundColor: "#FECD00" }]}
              onPress={() => setPaymentMethod("card")}
            >
              <Text>Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.input, { width: "30%" }, paymentMethod === "upi" && { backgroundColor: "#FECD00" }]}
              onPress={() => setPaymentMethod("upi")}
            >
              <Text>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.input, { width: "30%" }, paymentMethod === "cash" && { backgroundColor: "#FECD00" }]}
              onPress={() => setPaymentMethod("cash")}
              >
                <Text>Cash</Text>
              </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Cashier Name"
            style={styles.input}
            onChangeText={(text) => setCashierName(text)}
            value={cashierName}
          />
          <TextInput
            placeholder="Discount"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setDiscount(parseFloat(text))}
            value={discount.toString()}
          />
          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => setPaymentAmount(parseFloat(text))}
            value={paymentAmount.toString()}
          />
          <TouchableOpacity style={styles.payNowBtn} onPress={handlePayment}>
            <Text>Pay Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeModalBtn} onPress={togglePaymentModal}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isPreferenceModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Preferences</Text>
            <TextInput
              placeholder="Enter preferences"
              style={styles.input}
              onChangeText={(text) => setNewPreferences(text)} // Update newPreference
              value={newPreferences}
            />
            <TouchableOpacity style={styles.payNowBtn} onPress={handlePreferences}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalBtn} onPress={togglePreferenceModal}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Bottom check in button  */}


    </View>
  );
};

export default SingleDetailsEdit;

const styles = StyleSheet.create({
  header2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: '#ccc', // Color for the bottom border
    paddingHorizontal: 10,
    backgroundColor: '#027DB1',
  },
  count: {
    backgroundColor: '#FECD00',
    color: '#fff',
    borderRadius: 50,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: 'white',
  },
  count2: {
    backgroundColor: '#0186C1', // Background color for the header
    color: '#fff',
    borderRadius: 50,
    borderColor: '#fff',
    padding: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cards: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    maxHeight: '40%',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    marginVertical: 5,
  },
  payCard: {
    backgroundColor: 'gray',
    padding: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 2,
    marginVertical: 1,
  },
  totalPay: {
    backgroundColor: 'gray',
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 2,
  },
  btn: {
    backgroundColor: '#FECD00',
    padding: 10,
    borderRadius: 5,
    // elevation: 2,
    
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  payNowBtn: {
    backgroundColor: '#FECD00',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeModalBtn: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    alignItems: "center",
    marginTop: 10,
  },
  preferenceBtn: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    marginTop: 5,
    height: 1, // Adjust the height to change the thickness of the line
    backgroundColor: "black", // Change the color of the line
  },
});
