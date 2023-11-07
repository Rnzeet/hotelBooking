import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CheckInButton = ({handlePaymentPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}
        onPress={handlePaymentPress}
      >
        <Text style={styles.buttonText}>Check In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#FECD00",
    padding: 15,
    width: "100%",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
})

export default CheckInButton
