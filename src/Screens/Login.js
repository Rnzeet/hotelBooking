import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkUserLoggedIn } from '../APIS/Context';


const Login = ({ navigation }) => {
  const theme = {
    colors: {
      placeholder: 'white', // Set the color you want for placeholders
    },
  };

  const [email, setEmail] = useState('');
  const [hotelCode, setHotelCode] = useState('');
  const [password, setPassword] = useState('');

  const storeData = async (userData) => {
    try {
      const userDataString = JSON.stringify(userData);
      await AsyncStorage.setItem('userData', userDataString);
      console.log('User data stored successfully.');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };
  
  const loginAPI = async () => {
    const apiUrl = 'https://api.ratebotai.com:8443/hotel_login';
    const postData = {
      mobile_number: '', // Ensure this is required
      email_id: email,
      hotel_code: hotelCode,
      password: password,
    };
    
    try {
      const response = await axios.post(apiUrl, postData);
      if (response.data.status_message === "success") {
        storeData(response.data.data);
        navigation.navigate('appStack');
      } else {
        alert("Incorrect Data");
      }
    } catch (error) {
      alert('Error logging in: ' + error); // Added "Error logging in"
      console.log(error);
      // navigation.navigate('appStack');
    }
  };

  const checkUser = async () => {
    const userData = await checkUserLoggedIn();
    // console.log(userData)
    if (userData) {
      console.log("User is already logged in",userData); // Corrected log message
      navigation.navigate('appStack');
    }
  }

  useEffect(() => {
    checkUser(); // Call checkUser when the component mounts.
  }, []); // Use an empty dependency array to run it once when mounted.

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image
    style={styles.stretch}
    source={require('../assets/icon2.png')}
  />
        <Text style={{ fontSize: 22, fontWeight:'500', color: 'blue', textShadowColor: 'green', textShadowRadius: 5 }}>
  Welcome to RateBot Ai
</Text>

        <View style={styles.txtInput}>
          <TextInput
            placeholder="Email"
            accessibilityLabel="Email Input"
            theme={theme}
            style={[styles.input, { borderColor: 'purple', borderWidth: 0.5 }]}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Hotel Code"
            accessibilityLabel="Hotel Code Input"
            theme={theme}
            style={[styles.input, { borderColor: 'purple', borderWidth: 0.5 }]}
            onChangeText={(text) => setHotelCode(text)}
          />
          <TextInput
            placeholder="Password"
            accessibilityLabel="Password Input"
            secureTextEntry={true}
            theme={theme}
            style={[styles.input, { borderColor: 'purple', borderWidth: 0.5 }]}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.7}
          onPress={loginAPI}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SignButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('signUp')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.loginButton}
          // activeOpacity={0.7}
          onPress={() => navigation.navigate('Help')}
        >
          <Text style={{color:'#0186c1',marginTop:10,fontSize:16}}>Need Help?</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight:'400', color: 'blue',marginTop:50 }}>
  Powered By RateBot Ai
</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    width: '100%',
    height: '100%',
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
    borderColor:'purple',
    borderRadius:5
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#0186c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  SignButton:{
    width: '90%',
    backgroundColor: '#FFB81C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Use rgba to add transparency to the overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    paddingTop: 50,
    justifyContent: 'center', alignItems: 'center',
    marginTop:50
  },
  stretch: {
    width: '50%',
    height:100,
    resizeMode:'center',
    borderRadius:10,
    marginTop:30,
    marginBottom:30
    
  },
});

export default Login;
