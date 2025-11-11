import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BottomMenu = () => {
  return (
    <View
      style={{
        ...styles.debug,
        borderTopWidth: 2,
        borderColor: "red",
        bottom: 0,
        position: "absolute",
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 10,
      }}
    >
      <MaterialCommunityIcons name="home-outline" size={32} color="black" />
      <MaterialCommunityIcons
        name="cards-heart-outline"
        size={32}
        color="black"
      />
      <MaterialCommunityIcons name="cart-outline" size={32} color="black" />
      <MaterialCommunityIcons name="account-outline" size={32} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  debug: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    marginTop: 20,
  },
});

export default BottomMenu;
