import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch profile data from AsyncStorage
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        console.log(userData.logo_file)
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userData && (
        <Image source={{ uri: userData.logo_file }} style={styles.logo} />
      )}

      {userData ? (
        <View style={styles.card}>
          <Text style={styles.name}>{userData.user_name}</Text>
          <Text style={styles.email}>{userData.email_id}</Text>
          <Text style={styles.heading}>Address</Text>
          <Text style={styles.address}>{userData.address}</Text>
          <Text style={styles.heading}>Designation</Text>
          <Text style={styles.designation}>
            {userData.billing_designation}
          </Text>
          <Text style={styles.heading}>Mobile</Text>
          <Text style={styles.mobile}>{userData.mobile_number}</Text>
          <Text style={styles.heading}>GST No</Text>
          <Text style={styles.gst}>{userData.gst_no}</Text>
          <Text style={styles.heading}>Website</Text>
          <Text style={styles.website}>{userData.website_link}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: '70%',
    height: '10%',
    borderRadius: 2,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 10,
  },
  designation: {
    fontSize: 14,
    marginBottom: 10,
  },
  mobile: {
    fontSize: 14,
    marginBottom: 10,
  },
  gst: {
    fontSize: 14,
    marginBottom: 10,
  },
  website: {
    fontSize: 14,
  },
});

export default Product;
