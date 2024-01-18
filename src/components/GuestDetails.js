import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ServiceModal from "./Modals/ServiceModal";
import DropDownPicker from "react-native-dropdown-picker";
const GuestDetails = ({
  rooms,
  total,
  onPersonDetailsChange,
  onSelectedServicesChange,
  checkInDate,
  checkOutDate,
  updateTotalAmount,
  onPaymentDataChange
}) => {
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newBorderColor, setNewBorderColor] = useState("red");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [amount, setAmount] = useState(0);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const updateAmount = (updatedAdult, updatedChild) => {
    const newAmount = rooms[0]?.roomType?.extra_bed_price * (updatedAdult-1 + updatedChild);
    setAmount(newAmount);
  };
  const add = (current) => {
    if (current === "child" && child + adult < 3) {
      setChild(child + 1, () => updatePersonAndAmount());
    } else if (current === "adult" && child + adult < 3) {
      setAdult(adult + 1, () => updatePersonAndAmount());
    }
  };

  const sub = (current) => {
    if (current === "child" && child > 0) {
      setChild(child - 1, () => updatePersonAndAmount());
    } else if (current === "adult" && adult > 1) {
      setAdult(adult - 1, () => updatePersonAndAmount());
    }
  };

  const updatePersonAndAmount = () => {
    updatePersonDetails(adult, child, firstName, lastName, email, phone);
    updateAmount(adult, child);
  };

  // ... (existing code)

  useEffect(() => {
    updateAmount(adult, child);
  }, [adult, child]);
  // const add = (current) => {
  //   if (current === "child") {
  //     if (child + adult < 3) {
  //       setChild(child + 1);
  //       updatePersonDetails(
  //         adult,
  //         child + 1,
  //         firstName,
  //         lastName,
  //         email,
  //         phone
  //       );
  //     }
  //   } else {
  //     if (child + adult < 3) {
  //       setAdult(adult + 1);
  //       updatePersonDetails(
  //         adult + 1,
  //         child,
  //         firstName,
  //         lastName,
  //         email,
  //         phone
  //       );
  //     }
  //   }
  // };

  // const sub = (current) => {
  //   if (current === "child") {
  //     if (child > 0) {
  //       setChild(child - 1);
  //       updatePersonDetails(
  //         adult,
  //         child - 1,
  //         firstName,
  //         lastName,
  //         email,
  //         phone
  //       ); // Include existing values
  //       updateAmount(adult, child + 1);
  //     }
  //   } else {
  //     if (adult > 1) {
  //       setAdult(adult - 1);
  //       updatePersonDetails(
  //         adult - 1,
  //         child,
  //         firstName,
  //         lastName,
  //         email,
  //         phone
  //       ); // Include existing values
  //       updateAmount(adult, child + 1);
  //     }
  //   }
  // };




  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Cash");
  const [item, setItems] = useState([
    { label: "Cash", value: "Cash" },
    { label: "Card", value: "Card" },
    { label: "Upi", value: "Upi" },
  ]);
  const [formData, setFormData] = useState({
    amount:'',
    receipt:'',
    desc:'',
    mode:value,
  });
  console.log(formData,value,"formdata")
  const handleInputChangeValue = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     amount:'',
  //   }));
  // }, []);



  const toggleServiceModal = () => {
    setServiceModalVisible(!isServiceModalVisible);
  };

  const handleSelectService = (service) => {
    const isServiceSelected =
      selectedServices.length > 0 &&
      selectedServices.find((s) => s.id === service.id);
    if (isServiceSelected) {
      const updatedServices = selectedServices.filter(
        (s) => s.id !== service.id
      );
      updateSelectedServices([...updatedServices, service]);
    } else {
      updateSelectedServices([...selectedServices, service]);
    }
  };

  const updatePersonDetails = (
    updatedAdult,
    updatedChild,
    updatedFirstName,
    updatedLastName,
    updatedEmail,
    updatedPhone,
    formData,
    value
  ) => {
    setAdult(updatedAdult);
    setChild(updatedChild);
    setFirstName(updatedFirstName);
    setLastName(updatedLastName);
    setEmail(updatedEmail);
    setIsValidEmail(validateEmail(updatedEmail));
    setPhone(updatedPhone);
    onPersonDetailsChange({
      adult: updatedAdult,
      child: updatedChild,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      phone: updatedPhone,
    });
    updateTotalAmount(updatedAdult, updatedChild);
    onPaymentDataChange(formData,value);
  };
  useEffect(() => {
    updateAmount(adult, child);
  }, []);
  useEffect(() => {
    updateTotalAmount(adult, child);
  }, [adult, child, updateTotalAmount]);
  useEffect(() => {
    onPaymentDataChange(formData,value);
  }, [formData,value]);
  const updateSelectedServices = (services) => {
    setSelectedServices(services);
    onSelectedServicesChange(services);
  };

  const getMonthAndDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    return `${month} ${day}`;
  };
  const bColor = () => {
    if (firstName !== "" && lastName !== "" && email !== "" && phone !== "") {
      setNewBorderColor("green");
    } else {
      setNewBorderColor("red");
    }
  };

  useEffect(() => {
    bColor();
  }, [firstName, lastName, email, phone]);
  const handleFocus = () => {
    setIsEmailFocused(true);
  };

  const handleBlur = () => {
    setIsEmailFocused(false);
  };

  const isExtraTotalAmountVisible = adult > 1 || child > 0;

  console.log(
    rooms[0]?.roomType?.extra_bed_price,
    total,
    onPersonDetailsChange,
    onSelectedServicesChange,
    checkInDate,
    checkOutDate,
    adult,
    child,
    "huiii"
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Enter Guest Information</Text>
        <Text style={styles.headerText}>
          {getMonthAndDate(checkInDate)} &gt; {getMonthAndDate(checkOutDate)}
        </Text>
      </View>

      <View style={styles.userSection}>
        <View style={styles.userInfo}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) =>
              updatePersonDetails(adult, child, text, lastName, email, phone)
            }
          />

          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) =>
              updatePersonDetails(adult, child, firstName, text, email, phone)
            }
          />

          {/* <TextInput
            placeholder="Email"
            numberOfLines={1}
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) => updatePersonDetails(adult, child, firstName, lastName, text, phone)}
          /> */}
          <TextInput
            placeholder="Email"
            numberOfLines={1}
            placeholderTextColor="#000"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[
              styles.input,
              { borderColor: isValidEmail ? newBorderColor : "red" },
            ]}
            onChangeText={(text) =>
              updatePersonDetails(
                adult,
                child,
                firstName,
                lastName,
                text,
                phone
              )
            }
          />
          {isEmailFocused && !isValidEmail && (
            <Text style={{ color: "red", marginTop: 0 }}>
              Please enter a valid email address.
            </Text>
          )}

          <TextInput
            keyboardType="number-pad"
            placeholder="Phone"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) =>
              updatePersonDetails(
                adult,
                child,
                firstName,
                lastName,
                email,
                text
              )
            }
          />
          <View style={{backgroundColor:"lightblue",borderRadius:5}}>
          <Text style={{fontWeight:'bold',marginVertical:5}}>Advance Payment</Text>
           <DropDownPicker
              open={open}
              value={value}
              items={item}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Payment Method"
            />
            <TextInput
              style={[styles.input, { fontWeight: 'bold',fontSize:18,color:'black',marginTop:10 }]}
              placeholder="Amount"
              keyboardType="number-pad"
              value={formData.amount}
              onChangeText={(text) => handleInputChangeValue("amount", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Receipt No"
              value={formData.receipt}
              onChangeText={(text) => handleInputChangeValue("receipt", text)}
            />
             <TextInput
              style={styles.input}
              placeholder="Description"
              value={formData.desc}
              onChangeText={(text) => handleInputChangeValue("desc", text)}
            />
        </View>
        </View>
      </View>

      {rooms.map((room, index) => (
        <View key={index + room.type} style={styles.room}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomText}>{room.type}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.roomPrice}>₹ {room.price}</Text>
              <Text style={styles.roomPrice}> X {room.count}</Text>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.counterSection}>
        <View style={styles.counter}>
          <Text style={styles.counterLabel}>Adult:</Text>
          <Button title="-" onPress={() => sub("adult")} />
          <Text style={styles.counterValue}>{adult}</Text>
          <Button title="+" onPress={() => add("adult")} />
        </View>
        <View style={styles.counter}>
          <Text style={styles.counterLabel}>Child:</Text>
          <Button title="-" onPress={() => sub("child")} />
          <Text style={styles.counterValue}>{child}</Text>
          <Button title="+" onPress={() => add("child")} />
        </View>
      </View>
      {isExtraTotalAmountVisible && (
        <View>
          <Text style={styles.counterLabel}>Extra Total Amount: ₹{amount}</Text>
          {/* Add your calculation logic here based on adult, child counts, or any other relevant data */}
          {/* Display the calculated total amount */}
        </View>
      )}

      {/* <View style={styles.addOns}>
        <TouchableOpacity onPress={toggleServiceModal}>
          <Text style={{ backgroundColor: "lightgreen", fontWeight: "bold" }}>
            Add-ons <FontAwesome name="plus" size={20} color="black" />
          </Text>
        </TouchableOpacity>
      </View>

      {selectedServices.length > 0 && (
        <View style={styles.selectedServicesContainer}>
          <Text>Selected Services:</Text>
          {selectedServices[0].map((service, index) => (
            <View key={index} style={styles.selectedService}>
              <Text style={styles.selectedServiceName}>{service.name}</Text>
              <Text style={styles.selectedServicePrice}>$ {service.price}</Text>
            </View>
          ))}
        </View>
      )} */}

      <ServiceModal
        isVisible={isServiceModalVisible}
        onClose={toggleServiceModal}
        onSelectService={handleSelectService}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom:150
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headerText: {
    fontWeight: "bold",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  room: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  roomInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
  roomText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  roomPrice: {},
  counterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  counterValue: {
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  addOns: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
  },
  selectedServicesContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "gray",
    paddingTop: 10,
  },
  selectedService: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  selectedServiceName: {
    flex: 1,
    fontWeight: "bold",
  },
  selectedServicePrice: {
    fontWeight: "bold",
  },
});

export default GuestDetails;
