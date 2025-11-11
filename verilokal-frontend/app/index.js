import { Text, View, ImageBackground, Image } from "react-native";
import LoginButtons from "../components/LoginButtons";
import { useFonts } from "expo-font";

export default function Home() {
  const image = require("../assets/images/homebg.png");
  const [fontsLoaded] = useFonts({
    "Garet-Book": require("../assets/fonts/garet/Garet-Book.ttf"),
    "Garet-Heavy": require("../assets/fonts/garet/Garet-Heavy.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

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

      {/* Logo */}
      <Image
        source={require('../assets/images/verilokal_logo.png')}
        style={{ justifyContent: "center", alignItems: "center",  width:110, height: 140, }}
      >
      </Image>

      {/* Headline */}
      <Text
        style={{
          fontSize: 45,
          fontFamily: "Garet-Book",
          fontWeight: "bold",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Preserving what is
      </Text>

      <Text
        style={{
          fontSize: 55,
          fontFamily: "Garet-Heavy",
          textAlign: "center",
          color: "#d6461f",
          marginBottom: 12,
        }}
      >
        TRUE,
      </Text>

      <Text
        style={{
          fontSize: 45,
          fontFamily: "Garet-Book",
          fontWeight: "bold",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Empowering what
      </Text>

      <Text
        style={{
          fontSize: 45,
          fontFamily: "Garet-Book",
          fontWeight: "bold",
          textAlign: "center",
          color: "#000000",
          marginBottom: 12,
        }}
      >
        is{" "}
        <Text
          style={{
            fontFamily: "Garet-Heavy",
            fontSize: 55,
            color: "#d6461f",
          }}
        >
          OURS.
        </Text>
      </Text>

      {/* Subtext */}
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Garet-Book",
          textAlign: "center",
          color: "#000000",
          maxWidth: 500,
          lineHeight: 22,
          marginBottom: 10,
        }}
      >
        Ensuring genuine Filipino craftsmanship through secure QR verification and blockchain technology.
      </Text>
      {/* Login Buttons */}
      <LoginButtons />
      </View>
    </ImageBackground>
  );
}
