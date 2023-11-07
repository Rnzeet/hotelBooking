
const RoomStatus = (checkInDatas) => {
    if (checkInDatas.room_booking_info.room_title === "Standard Room Testing") {
      return "ST";
    }
    else if (checkInDatas.room_booking_info.room_title === "Dulex Room") {
      return "DR";
    }
    else if (checkInDatas.room_booking_info.room_title === "AC single room") {
      return "ACSR";
    }
    else {
      return "MULTI"
    }
  }
  const RoomCard = ({ checkInDatas }) => {
  
    return (
      <View style={styles.container}>
        <View style={styles.roomType}>
          <Text>
            {RoomStatus(checkInDatas)}
          </Text>
        </View>
        <View>
          <Text>
            {checkInDatas.guest_first_name}
          </Text>
          <Text>
            {`#${checkInDatas.booking_id}`}
          </Text>
          <Text>
            {`${checkInDatas.from_date} > ${checkInDatas.to_date}`}
          </Text>
        </View>
        <View >
          <View>
            <Text>{`₹ ${checkInDatas.total_sale_amount}`}
            </Text>
          </View>
          <View>
            <Text>
              {`R X ${checkInDatas.room_booking_info.no_of_rooms} G X ${checkInDatas.room_booking_info.no_of_adults + checkInDatas.room_booking_info.no_of_children}`}
            </Text>
          </View>
        </View>
        <View style={styles.verticle}>
          <FontAwesome name="ellipsis-v" size={20} color="black" />
        </View>
      </View >
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5
    },
    roomType: {
      backgroundColor: '#FECD00',
      color: '#fff',
      borderRadius: 50,
      padding: 5,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginRight: 10,
      borderRightWidth: 2,
      borderRightColor: 'white'
    },
    verticle:{
      width:5,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:5,
    }
  })
  export default RoomCard