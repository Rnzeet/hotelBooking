import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList,  TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal'; // Import the modal library

const RoomAvailabilityScreen = () => {
    const [roomData, setRoomData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editedData, setEditedData] = useState({
        room_id: null,
        house_keeping_ids: null,
        name: '',
        status: '',
        remarks: '',
        discrepancy: '',
        service: '',
    });

    const openModal = (item) => {
        console.log(item)
        setSelectedItem(item);
        setEditedData({
            room_id: item.room_id,
            house_keeping_ids: 1,
            name: item.name,
            status: item.status,
            remarks: item.remarks,
            discrepancy: item.discrepancy,
            service: item.service,
        });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
   const fetchDataFromApi = async () => {
    try {
        const response = await axios.post('https://api.ratebotai.com:8443/get_house_keeping_list', {
            hotel_code: 100087
        });
        setRoomData(response.data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
    const reload = () => { 
        fetchDataFromApi();
    } 
        

    const handleSave = async () => {
        // Perform API call with editedData

        // After a successful API call, refresh the list and close the modal

        // Example:
        try {
            // Perform API call here
            const response = await axios.post('https://api.ratebotai.com:8443/assigne_house_keeping_to_room', 
            
               editedData 
            );
             console.log(editedData)
            // Assuming the API call was successful
            closeModal();
            reload();

           alert(response.data.message);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchDataFromApi();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        fetchData();
    }, []);

    const getAvailabilityColor = (status) => {
        switch (status) {
            case 'Available':
                return '#4CAF50'; // Green for available
            case 'Occupied':
                return '#FFC107'; // Yellow for occupied
            case 'Departure':
                return '#FF5722'; // Orange for departure
            default:
                return '#333'; // Default color
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {openModal(item)}}
            style={styles.roomItem}
        >
            <Text style={styles.roomName}>{item.room_name}</Text>
            <Text style={[styles.availability, { color: getAvailabilityColor(item.Availability) }]}>
                {item.Availability}
            </Text>
            <View style={styles.detailsContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.detailHeading}>Room Number:</Text>
                    <Text style={styles.detailValue}>{item.room_number}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.detailHeading}>Room Type:</Text>
                    <Text style={styles.detailValue}>{item.room_type_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.detailHeading}>Status:</Text>
                    <Text style={styles.detailValue}>{item.status}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.detailHeading}>From Date:</Text>
                    <Text style={styles.detailValue}>{item.from_date}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.detailHeading}>To Date:</Text>
                    <Text style={styles.detailValue}>{item.to_date}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <FlatList
                data={roomData}
                renderItem={renderItem}
                keyExtractor={(item) => item.room_id?.toString()}
            />

            {/* Modal for editing data */}
            <Modal isVisible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Room Data</Text>
                        {/* Add TextInput components for each editable field */}
                        <TextInput
                            style={styles.input}
                            value={editedData.name}
                            onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                            placeholder="Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedData.status}
                            onChangeText={(text) => setEditedData({ ...editedData, status: text })}
                            placeholder="Status"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedData.remarks}
                            onChangeText={(text) => setEditedData({ ...editedData, remarks: text })}
                            placeholder="Remarks"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedData.discrepancy}
                            onChangeText={(text) => setEditedData({ ...editedData, discrepancy: text })}
                            placeholder="Discrepancy"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedData.service}
                            onChangeText={(text) => setEditedData({ ...editedData, service: text })}
                            placeholder="Service"
                        />

                        {/* Add TextInput components for other fields */}

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeModalBtn} onPress={closeModal}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0', // Light gray background
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', // Dark text color
    },
    roomItem: {
        backgroundColor: '#fff', // White background
        borderRadius: 8,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        padding: 16,
        marginBottom: 16,
    },
    roomName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // Dark text color
        marginBottom: 8,
    },
    availability: {
        fontSize: 18,
        color: '#4CAF50', // Green color for availability
        marginBottom: 8,
    },
    detailsContainer: {
        marginTop: 12, // Added margin at the top
    },
    detailHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Dark text color for heading

    },
    detailValue: {
        fontSize: 16,
        color: '#666', // Slightly darker gray text color for value
        marginBottom: 4,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
    },
    saveButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
        marginBottom: 10,
    },
    closeModalBtn: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
    },
});

export default RoomAvailabilityScreen;
