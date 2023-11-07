import AsyncStorage from "@react-native-async-storage/async-storage";


export const userDataRetriever = async () => {
  try {
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData;
    } else {
      console.log("User data not found.");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
}

export async function userDataRemover() {
  try {
    const res = await AsyncStorage.removeItem('userData');
    if (res === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error removing user data:', error);
    return false; // Return false in case of an error.
  }
}

export async function checkUserLoggedIn() {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return true;
    } else {
      console.log('User data not found.');
      return false;
    }
  } catch (error) {
    console.error('Error retrieving user data please login:', error);
    return false; // You might want to return false in case of an error.
  }
}
