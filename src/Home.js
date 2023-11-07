import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import NavigationHead from './components/NavigationHead'

const Home = ({navigation}) => {
  handleBackPress = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <NavigationHead heading="Home" 
      onBackPress={handleBackPress}
      />
    </SafeAreaView>
  )
}

export default Home