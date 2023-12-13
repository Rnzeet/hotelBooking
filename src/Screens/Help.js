import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const HelpScreen = () => {

    const handlePressWeb = () => {
        const url = 'https://ratebotai.com';
        Linking.openURL(url);
      };
      const handleClickMail = () => {
        const emailAddress = 'support@ratebotai.com';
        const subject = 'Help';
    
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
        
        Linking.openURL(mailtoUrl);
      };

      const handleClickNumber = () => {
        const phoneNumber = '08048039014';
        const telUrl = `tel:${phoneNumber}`;
        Linking.openURL(telUrl);
      };
      const handleWhatsApp = () => {
        const phoneNumber = '08048039014'; // Replace with your WhatsApp number
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
        Linking.openURL(whatsappUrl);
      };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Hi</Text>
          <Text style={styles.headingText2}>We are happy to help you!</Text>
        </View>
        <View style={{marginTop:40,marginHorizontal:10,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.text}>RateBotAi</Text>
          <Text style={styles.text}>
            A-007, Kanakia Boomerang, Chandivali, 
          </Text>
          <Text style={styles.text}>
            Mumbai – 400072
          </Text>
          <TouchableOpacity onPress={handleClickNumber}>
          <Text style={styles.text2}>
           CRS No. 08048039014
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClickMail}>
          <Text style={styles.text2}>
           support@ratebotai.com
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressWeb}>
          <Text style={styles.text2}>
           www.ratebotai.com
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWhatsApp} style={{marginTop:20}}>
            <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  heading: {
    backgroundColor: "#77C3EC",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  headingText: {
    fontSize: 40,
    fontWeight: "400",
  },
  headingText2: {
    fontSize: 20,
    fontWeight: "400",
  },
  text:{
    fontSize: 18,
    fontWeight: "400",
    marginTop:10
  },
  text2:{
    fontSize: 18,
    fontWeight: "400",
    marginTop:10,
    color:"blue"
  }
});

export default HelpScreen;
