import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const CollapsibleCard = (available) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? "chevron-down" : "chevron-up"}
          type="evilicon"
          size={30}
        />
        {!isExpanded && <Text style={styles.cardHeaderText}>Available</Text>}
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.cardContent}>
          {available?.content && available?.content[0]?.data.length ? (
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Room Type</Text>
              <Text style={styles.tableHeaderText}>Available</Text>
              <Text style={styles.tableHeaderText}>Occupied</Text>
            </View>
          ) : null}
          {available?.content && available?.content[0]?.data.length ? (
            available?.content[0]?.data.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={[styles.tableCell, styles.roomTypeCell]}>
                  {item?.room_type_name}
                </Text>
                <Text style={[styles.tableCell, styles.availableCell]}>
                  {item?.available_rooms}
                </Text>
                <Text style={[styles.tableCell, styles.occupiedCell]}>
                  {item?.total_rooms_occupied}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataMessage}>No data available</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  cardHeader: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardContent: {
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightblue",
    padding: 10,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    fontSize: 16,
    flex: 1,
    // textAlign: 'center',
  },
  roomTypeCell: {
    flex: 2, // Adjust the flex value as needed
    marginRight: 10,
  },
  availableCell: {
    flex: 1, // Fixed width for Available column
    marginRight: 10,
  },
  occupiedCell: {
    flex: 1, // Fixed width for Available column
    marginRight: 10,
    textAlign: "center",
  },
  noDataMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
});

export default CollapsibleCard;
