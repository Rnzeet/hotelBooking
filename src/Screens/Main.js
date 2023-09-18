import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../Botttom/BottomNavigation";

const Main = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
     <BottomNavigation/>
    </SafeAreaView>
  );
};

export default Main;
