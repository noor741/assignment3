import { View, Text, StyleSheet } from "react-native";
export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ color: "black" }}>Hello, world!</Text>
    </View>
  );
}
