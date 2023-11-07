import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View } from 'react-native';
import DatePicker from 'react-native-neat-date-picker';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome installed

const DatePickerComp = ({ selectedDate, onDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    onDateChange(date.dateString); // Pass the selected date back to the parent
  };

  const formattedDate = selectedDate.split('-'); // Splitting the date string
  const day = formattedDate[2];
  const month = new Date(selectedDate).toLocaleString('default', { month: 'short' });
  const year = formattedDate[0];

  return (
    <View>
      <TouchableOpacity
        style={styles.datePickerButton}
        activeOpacity={0.7}
        onPress={openDatePicker}
      >
       <Text style={styles.boldText}>{day}</Text>
       <View style={styles.dateTextContainer}>
       <Text style={styles.monthText}>{month}</Text>
        <Text style={styles.monthText}>{year}</Text>
       </View>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={onCancel}
      >
        <View style={styles.modalContainer}>
          <DatePicker
            isVisible={showDatePicker}
            mode="single"
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 10,
  },

  dateTextContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },

  boldText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 45,
  },

  monthText: {
    color: 'white',
    fontSize: 18,
  },

  yearText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DatePickerComp;
