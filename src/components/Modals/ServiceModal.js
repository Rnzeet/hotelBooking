import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ServiceModal = ({ isVisible, onClose, onSelectService }) => {
  const services = [
    { id: 1, name: 'Ice Cream', price: 5 },
    { id: 2, name: 'Lunch', price: 10 },
    { id: 3, name: 'Snacks', price: 7 },
    { id: 4, name: 'Pickup', price: 15 },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const toggleService = (service) => {
    setSelectedServices((prevSelectedServices) => {
      const isServiceSelected = prevSelectedServices.some((s) => s.id === service.id);
      
      if (isServiceSelected) {
        // If the service is already selected, remove it
        return prevSelectedServices.filter((s) => s.id !== service.id);
      } else {
        // If the service is not selected, add it
        return [...prevSelectedServices, service];
      }
    });
  };
  

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Ons</Text>
          <ScrollView>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceItemContainer}>
                <TouchableOpacity
                  style={[
                    styles.serviceItem,
                    selectedServices.some((s) => s.id === service.id) && styles.selectedService,
                  ]}
                  onPress={() => toggleService(service)}
                >
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>$ {service.price}</Text>
                </TouchableOpacity>
                {selectedServices.some((s) => s.id === service.id) && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => {
                      const updatedServices = selectedServices.filter((s) => s.id !== service.id);
                      setSelectedServices(updatedServices);
                    }}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              onSelectService(selectedServices);
              onClose();
            }}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  serviceItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedService: {
    backgroundColor: '#0186C1',
  },
  serviceName: {
    fontSize: 16,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#0186C1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceModal;
