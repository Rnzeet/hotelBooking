import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const NavigationHead = ({heading,onBackPress}) => {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        onPress={onBackPress}
        >
        <FontAwesome name="arrow-left" size={20}  />
        </TouchableOpacity>
        <Text style={{fontWeight:600,fontSize:18}}>{heading}</Text>
    </SafeAreaView>
  )
}

export default NavigationHead

const styles = StyleSheet.create({
    container:{
        
        flexDirection:"row",
        alignItems:"left",
        gap:25,
        padding:15,
        backgroundColor:"#fff",
        borderBottomColor:"#000",
        borderBottomWidth:1,
        height:60,
        width:"100%",
        
        
    

    }
})