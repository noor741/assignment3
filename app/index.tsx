"use client";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list';

const API_URL = "https://numbersapi.p.rapidapi.com/{month}/{day}/date";

export default function App() {
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [fact, setFact] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const data = [
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "11" },
        { value: "12" }];

    useEffect(() => {
        if (month && day) {
            fetchFact();
        }
    }, [month, day]);

    const fetchFact = async () => {
        const url = 'https://numbersapi.p.rapidapi.com/month/day/date';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '44cb245c52msha8295c33a8e59bdp18f556jsn9d96f0337644',
                'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
            }
        };
        setLoading(true);
        try {
            const response = await fetch(url.replace("month", month).replace("day", day), options)
                .then(response => response.text())
            console.log(response);
            setFact(response);
        }
        catch (error) {
            setError("Could not retrieve fact. Try again.");
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Get an Interesting Date Fact</Text>

            {/* dropdown menu */}
            <SelectList placeholder="Select Month" data={data} setSelected={setMonth} search={false} dropdownStyles={{ minWidth: 150 }} boxStyles={{ minWidth: 150 }} />

            {/* input for day */}
            <TextInput
                placeholder="Enter day (1-31)"
                keyboardType="numeric"
                style={styles.input}
                value={day}
                onChangeText={setDay}
            />
            <Text style={styles.fact}>{loading ? "Loading..." : fact}</Text>
            <Text style={styles.fact}>{error}</Text>
        </View>
    );
}
// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        width: 200,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 20,
        padding: 10,
        borderRadius: 9,
        maxHeight: 40,
    },
    fact: {
        fontSize: 18,
        marginTop: 20,
        padding: 20,
    },
    p1: {
        fontSize: 18,
        marginBottom: 10,

    },

});