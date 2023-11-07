import React, { useState } from 'react';
import { Image, SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const theme = {
    colors: {
      placeholder: 'white', // Set the color you want for placeholders
    },
  };
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [noOfRooms, setNoOfRooms] = useState('');

  const loginAPI = async () => {
    const apiUrl = 'https://api.ratebotai.com:8443/register_hotels_for_pms_software';
    const postData = {
      first_name: firstName,
      last_name: lastName,
      hotel_name: hotelName,
      mobile_number: mobile,
      email_id: email,
      password: password,
      country: country,
      state: state,
      no_of_rooms: parseInt(noOfRooms), // Parse as an integer
    };
    try {
      const response = await axios.post(apiUrl, postData);
      console.log(response.data);
      if (response.data.status_message === "success") {
        alert("Sign Up Successful");
        navigation.navigate('appStack');
      } else {
        alert("Incorrect Data");
      }
    } catch (error) {
      alert('Error login', error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.txtInput}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.column}>
              <TextInput
                placeholder="First Name"
                accessibilityLabel="First Name Input"
                theme={theme}
                style={styles.input}
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View style={styles.column}>
              <TextInput
                placeholder="Last Name"
                accessibilityLabel="Last Name Input"
                theme={theme}
                style={styles.input}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>
          <TextInput
            placeholder="Hotel Name"
            accessibilityLabel="Hotel Name Input"
            theme={theme}
            style={styles.input}
            onChangeText={(text) => setHotelName(text)}
          />
          <TextInput
            placeholder="Email"
            accessibilityLabel="Email Input"
            theme={theme}
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Mobile Number"
            accessibilityLabel="Mobile Number Input"
            theme={theme}
            style={styles.input}
            onChangeText={(text) => setMobile(text)}
          />
          <TextInput
            placeholder="Password"
            accessibilityLabel="Password Input"
            secureTextEntry={true}
            theme={theme}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.column}>
              <TextInput
                placeholder="Country"
                accessibilityLabel="Country Input"
                theme={theme}
                style={styles.input}
                onChangeText={(text) => setCountry(text)}
              />
            </View>
            <View style={styles.column}>
              <TextInput
                placeholder="State"
                accessibilityLabel="State Input"
                theme={theme}
                style={styles.input}
                onChangeText={(text) => setState(text)}
              />
            </View>
          </View>
          <TextInput
            placeholder="No of Rooms"
            accessibilityLabel="No of Rooms Input"
            theme={theme}
            keyboardType="numeric" // Set the keyboard type to numeric
            style={styles.input}
            onChangeText={(text) => setNoOfRooms(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.7}
          onPress={loginAPI}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:5}}>
          <Text >Already have an Account? </Text>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={{color:"blue"}}>Login</Text>
        </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  txtInput: {
    width: '90%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input: {
    elevation: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#0186C1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  column: {
    flex: 1,
    marginRight: 5,
  },
});

export default SignUp;
