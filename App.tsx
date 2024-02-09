import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        "https://mainnet.infura.io/v3/709f3206cb564b3e8829715d057ba657",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: 1,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.result) {
        const balanceInWei = parseInt(data.result, 16);
        const balanceInEther = balanceInWei / 1e18;
        setBalance(balanceInEther.toFixed(1));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageURI }} />

      <TextInput
        style={styles.input}
        placeholder="Enter Ethereum address"
        onChangeText={setAddress}
        value={address}
      />
      <TouchableOpacity style={styles.button} onPress={fetchBalance}>
        <Text style={styles.buttonText}>Fetch Balance</Text>
      </TouchableOpacity>
      {balance !== null && (
        <Text style={styles.balanceText}>Balance: {balance} Ether</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  balanceText: {
    marginTop: 20,
    fontSize: 18,
  },
});

var imageURI =
  "data:image/png;base64,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";
