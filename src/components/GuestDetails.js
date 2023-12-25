import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ServiceModal from './Modals/ServiceModal';

const GuestDetails = ({ rooms, total, onPersonDetailsChange, onSelectedServicesChange, checkInDate, checkOutDate }) => {
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [isServiceModalVisible, setServiceModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newBorderColor, setNewBorderColor] = useState('red');
  const add = (current) => {
    if (current === 'child') {
      if (child < 5) {
        setChild(child + 1);
        updatePersonDetails(adult, child + 1, firstName, lastName, email, phone); // Include existing values
      }
    } else {
      if (adult < 5) {
        setAdult(adult + 1);
        updatePersonDetails(adult + 1, child, firstName, lastName, email, phone); // Include existing values
      }
    }
  }
  
  const sub = (current) => {
    if (current === 'child') {
      if (child > 0) {
        setChild(child - 1);
        updatePersonDetails(adult, child - 1, firstName, lastName, email, phone); // Include existing values
      }
    } else {
      if (adult > 1) {
        setAdult(adult - 1);
        updatePersonDetails(adult - 1, child, firstName, lastName, email, phone); // Include existing values
      }
    }
  }
  

  const toggleServiceModal = () => {
    setServiceModalVisible(!isServiceModalVisible);
  };

  const handleSelectService = (service) => {
    const isServiceSelected = selectedServices.length > 0 && selectedServices.find((s) => s.id === service.id);
    if (isServiceSelected) {
      const updatedServices = selectedServices.filter((s) => s.id !== service.id);
      updateSelectedServices([...updatedServices, service]);
    } else {
      updateSelectedServices([...selectedServices, service]);
    }
  };

  const updatePersonDetails = (updatedAdult, updatedChild, updatedFirstName, updatedLastName, updatedEmail, updatedPhone) => {
    setAdult(updatedAdult)
    setChild(updatedChild)
    setFirstName(updatedFirstName)
    setLastName(updatedLastName)
    setEmail(updatedEmail)
    setPhone(updatedPhone)
    onPersonDetailsChange({
      adult: updatedAdult,
      child: updatedChild,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      phone: updatedPhone,
    });
  };

  const updateSelectedServices = (services) => {
    setSelectedServices(services);
    onSelectedServicesChange(services);
  };

  const getMonthAndDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    return `${month} ${day}`;
  }
const bColor = () => {
  if(firstName!=="" && lastName!=="" && email!=="" && phone!==""){
    setNewBorderColor('green')
  }
  else{
    setNewBorderColor('red')
  }
}

useEffect(() => {
  bColor()
}
, [firstName, lastName, email, phone])
console.log( rooms, total, onPersonDetailsChange, onSelectedServicesChange, checkInDate, checkOutDate,"huiii")
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Enter Guest</Text>
        <Text style={styles.headerText}>{getMonthAndDate(checkInDate)} &gt; {getMonthAndDate(checkOutDate)}</Text>
      </View>

      <View style={styles.userSection}>

        <View style={styles.userInfo}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) => updatePersonDetails(adult, child, text, lastName, email, phone)}
          />

          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) => updatePersonDetails(adult, child, firstName, text, email, phone)}
          />

          <TextInput
            placeholder="Email"
            numberOfLines={1}
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) => updatePersonDetails(adult, child, firstName, lastName, text, phone)}
          />

          <TextInput
            placeholder="Phone"
            placeholderTextColor="#000"
            style={[styles.input, { borderColor: newBorderColor }]}
            onChangeText={(text) => updatePersonDetails(adult, child, firstName, lastName, email, text)}
          />


        </View>
      </View>

      {rooms.map((room, index) => (
        <View key={index + room.type} style={styles.room}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomText}>{room.type}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.roomPrice}>$ {room.price}</Text>
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
          <Button title="-" onPress={() => sub('child')} />
          <Text style={styles.counterValue}>{child}</Text>
          <Button title="+" onPress={() => add('child')} />
        </View>
      </View>

      <View style={styles.addOns}>
        <Text>Add-ons</Text>
        <TouchableOpacity onPress={toggleServiceModal}>
          <FontAwesome name="plus" size={20} color="black" />
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
      )}

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
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  room: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  roomInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  roomText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomPrice: {},
  counterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  counterValue: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  addOns: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedServicesContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 10,
  },
  selectedService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  selectedServiceName: {
    flex: 1,
    fontWeight: 'bold',
  },
  selectedServicePrice: {
    fontWeight: 'bold',
  },
});

export default GuestDetails;
