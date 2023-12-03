import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Button } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import DatePickerComp from '../components/DateTimePicker';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// util.js
export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const NightAudit = () => {
    const [hotelCode, setHotelCode] = useState(null);
    const getHotelCode = () => {
        try {
            AsyncStorage.getItem('userData').then((value) => {
                if (value !== null) {
                    const userData = JSON.parse(value);
                    setHotelCode(userData.hotel_code);
                    // console.log(hotelCode)
                }
            });

        } catch (error) {
            alert("something went wrong")
        }
    }

    const currDate = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(currDate);
    const [refreshing, setRefreshing] = React.useState(false);

    const [apiData, setApiData] = useState(null);
    // console.log(selectedDate, hotelCode)


    const onRefresh = React.useCallback(() => {

        setRefreshing(true);
        setTimeout(() => {
            setSelectedDate(new Date().toISOString().slice(0, 10));
            const fetchData = async () => {
                try {
                    const response = await fetchDataFromApi();
                    setApiData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
            setRefreshing(false);

        }, 2000);

    }, [hotelCode, selectedDate]);
    const fetchDataFromApi = async () => {
        try {
            const dataToSend = {
                hotel_code: hotelCode,
                data: selectedDate,
            };
            const response = await axios.post('https://api.ratebotai.com:8443/night_audit_summary', dataToSend);
            return response;
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };
   
   
    const performNightAudit = async () => {
        try {
            const dataToSend = {
                audit_date: selectedDate,
                hotel_code: hotelCode,
            
            }
            const response = await axios.post('https://api.ratebotai.com:8443/perform_night_audit', dataToSend);
            alert(response.data.message);
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };
    useEffect(() => {
        getHotelCode();

        const fetchData = async () => {
            try {
                const response = await fetchDataFromApi();
                setApiData(response.data);
                // console.log(response.data)
                // console.log("first")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        hotelCode !== null ? fetchData() : getHotelCode();
    }, [hotelCode, selectedDate]);

    return (
        <View style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.header2}>
                <DatePickerComp
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    style={{ color: '#fff', alignItems: 'center' }}
                />
                <TouchableOpacity onPress={() => {
                    onRefresh()
                }
                }>
                    <FontAwesome name="repeat" size={30} color="white"

                    />
                </TouchableOpacity>
                <View >
                    <Button style={{padding:10}} title="Perform Night Audit" onPress={() => {
                        performNightAudit()
                    }
                    } />
                </View>
            </View>
            <ScrollView style={{ padding: 16, marginBottom: 10 }}>
                {apiData ? (
                    <View>
                        {/* Display account details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Account Details</Text>
                            <Text>Default Counter:</Text>
                            {apiData.data.account_details.default_counter.map((counter, index) => (
                                <View key={index} style={styles.item}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>Status:</Text>
                                        <Text>{counter.Status}</Text>
                                    </View>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>Balance:</Text>
                                        <Text>{counter.balance}</Text>
                                    </View>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>Revenue Received:</Text>
                                        <Text>{counter.revenue_received}</Text>
                                    </View>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>Withdrawals:</Text>
                                        <Text>{counter.withdrawals}</Text>
                                    </View>
                                </View>
                            ))}
                            <Text style={styles.label}>Total:</Text>
                            <View style={styles.item}>
                                <View style={styles.labelRow}>
                                    <Text>Balance: </Text>
                                    <Text>{apiData.data.account_details.total.balance}</Text>
                                </View>
                                <View style={styles.labelRow}>
                                    <Text>Revenue Received: </Text>
                                    <Text>{apiData.data.account_details.total.revenue_received}</Text>
                                </View>
                                <View style={styles.labelRow}>
                                    <Text>Withdrawals:</Text>
                                    <Text>{apiData.data.account_details.total.withdrawals}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Display booking revenue */}
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Booking Revenue</Text>
                            {Object.entries(apiData.data.booking_revenue).map(([key, value]) => (
                                <View key={key} style={styles.item}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>{key}:</Text>
                                        <Text>{value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Display housekeeping details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Housekeeping Details</Text>
                            <View style={styles.item}>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>Checked Out Rooms Marked Dirty: </Text>
                                    <Text>{apiData.data.housekeeping_details.checked_out_rooms_marked_dirty}</Text>
                                </View>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>Occupied Rooms Marked for Dirty:</Text>
                                    <Text> {apiData.data.housekeeping_details.occupied_rooms_marked_for_dirty}</Text>
                                </View>
                                <View style={styles.labelRow}>
                                    <Text style={styles.label}>Vacant Rooms Marked for Touchup:</Text>
                                    <Text>{apiData.data.housekeeping_details.vacant_rooms_marked_for_touchup}</Text>
                                </View>

                            </View>
                        </View>

                        {/* Display revenue list */}
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Revenue List</Text>
                            {Object.entries(apiData.data.revenue_list).map(([key, value]) => (
                                <View key={key} style={styles.item}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>{key}:</Text>
                                        <Text>{value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        {/* Display room details with BarCharts (horizontal) */}
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Room Details</Text>
                            <View style={styles.barChartContainer}>
                                {Object.entries(apiData.data.room_details).map(([key, value]) => (
                                    <View key={key} style={styles.barChart}>
                                        <Text style={styles.subSectionHeader}>{key.replaceAll('_', " ")}</Text>
                                        <BarChart
                                            horizontal
                                            data={{
                                                labels: ["Rooms", "Guests"],
                                                datasets: [{
                                                    data: [
                                                        value.rooms ? value.rooms : 0,
                                                        value.guest === "-" ? 0 : parseInt(value.guest),
                                                    ],
                                                }],
                                            }}
                                            width={300}
                                            height={200}
                                            chartConfig={{
                                                backgroundGradientFrom: "#f0f0f0",
                                                backgroundGradientTo: "#f0f0f0",
                                                decimalPlaces: 0,
                                                color: (opacity = 1) => getRandomColor(),
                                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                            }}
                                            style={{ marginVertical: 8, borderRadius: 8 }}
                                            fromZero
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>



                        {/* Display room tax */}
                        <View style={[styles.section, { paddingBottom: 10, marginBottom: 10 }]}>
                            <Text style={styles.sectionHeader}>Room Tax</Text>
                            {Object.entries(apiData.data.room_tax).map(([key, value]) => (
                                <View key={key} style={styles.item}>
                                    <View style={styles.labelRow}>
                                        <Text style={styles.label}>{key}:</Text>
                                        <Text>{value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Light gray background
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333', // Dark text color
    },
    header2: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1, // Add a bottom border
        borderBottomColor: '#ccc', // Color for the bottom border
        backgroundColor: '#0186C1', // Background color for the header
        paddingHorizontal: 10,
    },
    section: {
        marginBottom: 16,
        backgroundColor: '#fff', // White background
        padding: 16,
        borderRadius: 8,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555', // Dark gray text color
    },
    item: {
        marginLeft: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    barChart: {
        alignItems: 'center',
    },
    subSectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555', // Dark gray text color
    },
    count: {
     
        padding: 10,
    },

});

export default NightAudit;
