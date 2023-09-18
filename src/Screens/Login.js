import { Image, SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';


const Login = () => {
  const theme = {
    colors: {
      placeholder: '#fff', // Set the color you want for placeholders
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/animation.gif')} />
      <View style={styles.txtInput}>
        <TextInput
          placeholder="Username / Email"
          accessibilityLabel="Username or Email Input"
          theme={theme} // Apply the theme to change placeholder color
          style={{ elevation: 10 }} // Apply the desired elevation
        />
        <TextInput
          placeholder="Password"
          accessibilityLabel="Password Input"
          secureTextEntry={true}
          theme={theme} // Apply the theme to change placeholder color
          style={{ elevation: 10 }} // Apply the desired elevation
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.7} // Set the desired opacity on press
        onPress={() => {
        alert('Login button pressed');
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  txtInput: {
    width: '90%',
    height: '20%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    // The elevation is now set through the 'style' prop for TextInput components
  },

  loginButton: {
    width: '90%',
    backgroundColor: 'blue', // Set the background color of the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },

  buttonText: {
    color: 'white', // Set the text color of the button
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Login;
