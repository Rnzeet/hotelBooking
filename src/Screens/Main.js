import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView,TextInput } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BottomNavigation from "../Botttom/BottomNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const Main = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
                <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Reservation"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.searchButton}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
     <BottomNavigation/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 3,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginLeft: 5,
  },
});
export default Main;
