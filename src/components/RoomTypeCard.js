import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoomTypeCard = (props) => {
  const [remainingRoom, setRemainingRoom] = useState(props.remainingRooms);
  const [selectedRooms, setSelectedRooms] = useState(0);

  const handleCardPress = () => {
    props.onRoomTypePress();
    if (remainingRoom > 0) {
      const newSelectedRooms = selectedRooms + 1;
      setSelectedRooms(newSelectedRooms);
      setRemainingRoom(remainingRoom - 1);

      // Calculate the price based on the new count
      const newPrice = newSelectedRooms * props.price;
      console.log(newPrice)

      // Pass the selected room details back to the parent component
      props.onRoomSelected({
        type: props.roomType,
        count: newSelectedRooms,
        price: newPrice,
        room: props.room,
        room_type_id: props.room_type_id,
      });
    }
  };

  const handleMinusPress = () => {
    if (selectedRooms > 0) {
      const newSelectedRooms = selectedRooms - 1;
      setSelectedRooms(newSelectedRooms);
      setRemainingRoom(remainingRoom + 1);

      // Calculate the price based on the new count
      const newPrice = newSelectedRooms * props.price;

      // Pass the selected room details back to the parent component
      props.onRoomSelected({
        type: props.roomType,
        count: newSelectedRooms,
        price: newPrice,
        room: props.room,
        room_type_id: props.room_type_id,
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.count}>
          <Text
            style={{
              alignItems: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: 20,
            }}
          >
            {`${selectedRooms}/${remainingRoom}`}
          </Text>
        </View>
        <View>
          <Text>{props.roomType}</Text>
          <Text>
            Base: {props.base} Max: {props.max}
          </Text>
        </View>
        <Text>${props.price}</Text>
        {selectedRooms > 0 && ( // Show minus button when at least one room is selected
          <TouchableOpacity onPress={handleMinusPress} style={styles.minusButton}>
            <Text style={styles.minusButtonText}>-</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RoomTypeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  count: {
    backgroundColor: '#FECD00',
    color: '#000',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: 10,
    borderRightWidth: 2,
    borderRightColor: 'white',
  },
  minusButton: {
    backgroundColor: 'red', // Change this to your desired color
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
