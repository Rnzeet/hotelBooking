import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, RefreshControl, FlatList, Modal, ScrollView } from 'react-native';
import DatePickerComp from '../components/DateTimePicker';
import { FontAwesome } from '@expo/vector-icons';
import RoomTypeCard from '../components/RoomTypeCard';
import TwoSectionBtn from '../components/Buttons/TwoSectionBtn';
import axios from 'axios';
import NavigationHead from '../components/NavigationHead';

export const getTotalDays=(checkInDate, checkOutDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(checkInDate);
  const secondDate = new Date(checkOutDate);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}


const RoomDetails = ({ navigation }) => {
  const currDate = new Date().toISOString().slice(0, 10);

  const [checkInDate, setCheckInDate] = useState(currDate);
  const [checkOutDate, setCheckOutDate] = useState(currDate);
  const [activeOption, setActiveOption] = useState('Guest');
  const [roomTypes, setRoomTypes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  const getRoomTypes = async () => {
    setRefreshing(true);
    const apiUrl = 'https://api.ratebotai.com:8443/get_room_type_data';
    const postData = {
      hotel_code: 100087,
      floor_id: 1,
    };

    try {
      const response = await axios.post(apiUrl, postData);
      setRoomTypes(response.data.data);
      setRefreshing(false);
    } catch (error) {
      alert('Error fetching rooms:', error);
      console.log(error);
    }
  }

  const availableRoomsFetch = async (roomid,price) => {
    try {
      const dataToSend = {
        pms_hotel_code: 100087,
        from_date: checkInDate,
        to_date: checkOutDate,
        room_type_id: roomid,
      };

      const response = await axios.post(
        'https://api.ratebotai.com:8443/check_rooms_availability_for_pms',
        dataToSend
      );
      console.log(price,'price ass')
      const updatedAvailableRooms = response.data.data.map((room) => ({
        ...room,
        price: price,
      }));
      
      const updatedAvailableRoomWithNoSelectedRoom = updatedAvailableRooms.filter((room) => {
        // Check if the room is not in the selected rooms
        const isSelected = selectedRooms.some((selectedRoom) => selectedRoom.room_number === room.room_number);
        
        // Include the room in the result if it's not selected
        return !isSelected;
      });
      
      // Now, `updatedAvailableRoomWithNoSelectedRoom` contains rooms that are not already selected
      
      setAvailableRooms(updatedAvailableRoomWithNoSelectedRoom);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRoomSelected = (roomDetails) => {
    const updatedSelectedRooms = selectedRooms.map((room) => {
      if (room.roomTypeID === roomDetails.roomTypeID) {
        return {
          ...room,
          count: roomDetails.count,
          price: roomDetails.count * roomDetails.price,
        };
      }
      return room;
    });

    const newTotalPrice = updatedSelectedRooms.reduce(
      (total, room) => total + room.price,
      0
    );

    setSelectedRooms(updatedSelectedRooms);
    setTotalPrice(newTotalPrice);
  };

  const onRefresh = () => {
    getRoomTypes();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleOptionPress = (option) => {
    setActiveOption(option);
  };

  useEffect(() => {
    console.log(selectedRooms,'selectedRooms')
    const newTotalPrice = selectedRooms.reduce(
      (total, room) => total + room.price,
      0
    );
    console.log(newTotalPrice,'newTotalPrice')
    setTotalPrice(newTotalPrice);
  }, [selectedRooms]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  const handleRoomTypePress = (roomType) => {
    console.log(roomType,'roomType')
    setSelectedRoomType(roomType);
    availableRoomsFetch(roomType.id,roomType.price);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleRoomSelect = (room) => {
    const selectedRoom = availableRooms.find((r) => r.room_number === room.room_number);
     console.log(room,'selectedRoom2')

    if (!selectedRooms.some((r) => r.room_number === selectedRoom.room_number)) {
     const currRoomType = roomTypes.filter((room) => room.id === selectedRoom.room_type_id)[0];
    //  console.log(serviceCharge,'serviceCharge')

      const roomDetails = {
        type: selectedRoom.room_name,
        count: 1,
        roomType: currRoomType,
        room: selectedRoom,
        price: selectedRoom.price,
      };
      setSelectedRooms([...selectedRooms, roomDetails]);
    }

    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHead
        heading="Stay Details"
        onBackPress={handleBackPress}
      />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Check In</Text>
          <DatePickerComp
            selectedDate={checkInDate}
            onDateChange={setCheckInDate}
            containerStyle={styles.datePickerContainer}
          />
        </View>
        <FontAwesome name="angle-right" size={60} color="white" />
        <View>
          <Text style={styles.headerText}>Check Out</Text>
          <DatePickerComp
            selectedDate={checkOutDate}
            onDateChange={setCheckOutDate}
            containerStyle={styles.datePickerContainer}
          />
        </View>
      </View>
      <View style={styles.header2}>
        <TouchableOpacity
          style={[styles.check, activeOption === 'Guest' && styles.activeOption]}
          onPress={() => handleOptionPress('Guest')}
        >
          <Text style={[styles.checkText, activeOption === 'Guest' && styles.activeText]}>GUEST</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.check, activeOption === 'Agent' && styles.activeOption]}
          onPress={() => handleOptionPress('Agent')}
        >
          <Text style={[styles.checkText, activeOption === 'Agent' && styles.activeText]}>AGENT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.check, activeOption === 'Corporate' && styles.activeOption]}
          onPress={() => handleOptionPress('Corporate')}
        >
          <Text style={[styles.checkText, activeOption === 'Corporate' && styles.activeText]}>CORPORATE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={roomTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RoomTypeCard
            roomType={item.room_type_name}
            base={item.base}
            max={item.higher_occupancy}
            price={item.price}
            remainingRooms={item.no_rooms_stock}
            isActive={item.isActive}
            onRoomSelected={handleRoomSelected}
            room={item}
            room_type_id={item.room_type_id}
            onRoomTypePress={() => handleRoomTypePress(item,item.price)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          
          <ScrollView>
            {availableRooms.length>0?availableRooms.map((room) => (
              <View key={room.room_number}>
                {/* {console.log(availableRooms,'availableRooms')} */}
                <Text>Room Number: {room.room_number}</Text>
                <TouchableOpacity onPress={() => handleRoomSelect(room)}>
                  <Text>Select</Text>
                </TouchableOpacity>
              </View>
            )):<Text>No Rooms Available</Text>}
          </ScrollView>
          <TouchableOpacity onPress={closeModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TwoSectionBtn
        total={totalPrice}
        count={selectedRooms.length}
        rooms={selectedRooms}
        link="Stay Details"
        navigation={navigation}
        dates={{ checkInDate, checkOutDate }}
      />
    </SafeAreaView>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#0186C1',
    paddingHorizontal: 10,
  },
  headerText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 12,
    color: 'white',
  },
  datePickerContainer: {
    color: '#fff',
    alignItems: 'center',
  },
  header2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#027DB1',
    elevation: 10,
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: 'white',
    padding: 5,
    width: '33%',
    alignItems: 'center',
  },
  checkText: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
    color: 'white',
  },
  activeOption: {
    backgroundColor: '#0186C1',
    elevation: 20,
    width: '35%',
    borderRadius: 10,
    padding: 10,
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
