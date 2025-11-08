import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import qs from "qs";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";


export default function BusinessLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleBusinessLogin = async () => {
    if (!email || !password){
      setMessage("All fields are required!");
      return;
    }
    console.log("Login pressed!");
    try {
      const response = await axios.post("http://localhost:3000/api/login", 
        qs.stringify({email, password}),
      {
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      }
    );
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      setMessage(response.data.message);
      router.replace("/business");

    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("Incorrect Username or Password");
      } else {
        setMessage("Invalid Login!");
      }
    
    }
  };
  //CSS
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Business Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 6 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, marginBottom: 20, borderRadius: 6 }}
      />

      <Pressable
        onPress={handleBusinessLogin}
        style={{ backgroundColor: "#2563eb", padding: 14, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          Sign In
        </Text>
      </Pressable>

      <Text style={{ color: "red", marginTop: 10}}>{message}</Text>
    </View>
  );
}