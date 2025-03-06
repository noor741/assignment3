import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect } from "react";

const API_URL = "https://numbersapi.p.rapidapi.com/{month}/{day}/date";
const API_HOST = "numbersapi.p.rapidapi.com";
const API_KEY = "YOUR_RAPIDAPI_KEY"; // Replace with your actual API key

export default function App() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (month && day) {
      fetchFact();
    }
  }, [month, day]);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        API_URL.replace("{month}", month).replace("{day}", day),
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": API_HOST,
            "X-RapidAPI-Key": API_KEY,
          },
        }
      );
      const data = await response.text();
      setFact(data);
    } catch (error) {
      console.error("Error fetching fact:", error);
      setFact("Could not retrieve fact. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Get an Interesting Date Fact</Text>
      <TextInput
        placeholder="Enter month (1-12)"
        keyboardType="numeric"
        value={month}
        onChangeText={setMonth}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter day (1-31)"
        keyboardType="numeric"
        value={day}
        onChangeText={setDay}
        style={styles.input}
      />
      {loading ? <Text>Loading...</Text> : <Text style={styles.fact}>{fact}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  fact: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
});
