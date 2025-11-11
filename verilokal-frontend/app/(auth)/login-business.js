import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import qs from "qs";
import { useState } from "react";
import {  View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useFonts } from "expo-font";


export default function BusinessLogin() {
  const router = useRouter();
  const image = require("../../assets/images/homebg.png");
  const [fontsLoaded] = useFonts({
      "Garet-Book": require("../../assets/fonts/garet/Garet-Book.ttf"),
      "Garet-Heavy": require("../../assets/fonts/garet/Garet-Heavy.ttf"),
      "Montserrat-Regular": require("../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    });
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
  //fonts
  if (!fontsLoaded) {
      return (
        <View>
          <Text>Loading fonts...</Text>
        </View>
      );
    }

  //CSS
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ flex: 1, }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(231, 229, 226, 0.87)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
      {/* Login Card */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: 6,
          width: "90%",
          maxWidth: 800,
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo + Text */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingVertical: 20,
              paddingHorizontal: 30,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Image
              source={require('../../assets/images/verilokal_logo.png')}
              style={{ 
                justifyContent: "center", 
                alignItems: "center",  
                width: 115, 
                height: 145, 
                marginVertical: 20,
                }}
            >
            </Image>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "700",
                color: "#000",
                textAlign: "left", 
                fontFamily: "Times",
              }}
            >
              Welcome{"\n"}to{"\n"}
              <Text style={{ color: "#b04224", fontWeight: "800" }}>
                VeriLocal
              </Text>
            </Text>
          </View>
        </View>

        {/* Right: Login Form */}
        <View
          style={{
            flex: 1,
            paddingLeft: 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              fontFamily: "Montserrat-Bold",
              color: "#000",
              marginBottom: 20,
            }}
          >
            Login
          </Text>

          {/* Email */}
          <Text style={{ fontSize: 10, marginBottom: 5, fontFamily: "Montserrat-Regular",}}>Email*</Text>
          <TextInput
            placeholder="Enter your email"
            style={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 18,
              backgroundColor: "#ffffff",
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 15,
              fontFamily: "Montserrat-Regular",
              fontSize: 12,
            }}
          />

          {/* Password */}
          <Text style={{ fontSize: 10, marginBottom: 5, fontFamily: "Montserrat-Regular", }}>Password*</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 18,
              backgroundColor: "#ffffff",
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginBottom: 20,
              fontFamily: "Montserrat-Regular",
              fontSize: 12,
            }}
          />

          {/* Login Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#e98669",
              paddingVertical: 12,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 10,
            }}
            onPress={() => router.push("/business")}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          {/* Sign Up Text */}
          <Text style={{ textAlign: "center", fontFamily: "Montserrat-Regular"}}>
            Don’t have an account?{" "}
            <Text
              style={{ color: "#b04224", fontFamily: "Montserrat-Bold" }}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
      </View>
    </ImageBackground>
  );
}