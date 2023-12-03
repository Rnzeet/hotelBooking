import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const DashboardScreen = ({ data }) => {
    console.log(data, "data breached inside")
  return (
    <ScrollView style={styles.container}>
      {/* Line Chart */}
      <Text style={styles.chartTitle}>Occupancy Percentage Over Next Month</Text>
      <LineChart
        data={{
          labels: data.next_month_data.map(item => item.Date),
          datasets: [
            {
              data: data.next_month_data.map(item => item.OccupancyPercentage),
            },
          ],
        }}
        width={350}
        height={220}
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#007AFF',
          },
        }}
        bezier
        style={styles.chartStyle}
      />

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Rooms Sold Over Next Month</Text>
      <BarChart
        data={{
          labels: data.next_month_data.map(item => item.Date),
          datasets: [
            {
              data: data.next_month_data.map(item => item.RoomsSold),
            },
          ],
        }}
        width={350}
        height={220}
        yAxisSuffix=" rooms"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chartStyle}
      />

      {/* Pie Chart */}
      <Text style={styles.chartTitle}>Rooms for Sale Distribution</Text>
      <PieChart
        data={data.next_month_data_sum}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="Rooms_for_Sale"
        style={styles.chartStyle}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333333',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default DashboardScreen;
