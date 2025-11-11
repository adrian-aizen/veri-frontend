import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";

export default function LoginButtons() {
  
  const router = useRouter();
  const [fontsLoaded] = useFonts({
      "Garet-Book": require("../assets/fonts/garet/Garet-Book.ttf"),
      "Garet-Heavy": require("../assets/fonts/garet/Garet-Heavy.ttf"),
      "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    });
  
     if (!fontsLoaded) {
      return <View><Text>Loading fonts...</Text></View>;
    }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        marginTop: 10,
      }}
    >
      {/* Continue as Buyer */}
      <TouchableOpacity
        onPress={() => router.push("/buyer")}
        style={{
          backgroundColor: "#e7e5e2",
          paddingVertical: 12,
          paddingHorizontal: 54,
          borderRadius: 50,
          borderWidth: 1.3,
          shadowColor: "#000000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3,
        }}
      >
        <Text
          style={{
            color: "#d6461f",
            fontSize: 16,
            fontWeight:"bold",
            fontFamily: "Garet-Book",
          }}
        >
          Scan
        </Text>
      </TouchableOpacity>

      {/* Login as Business */}
      <TouchableOpacity
        onPress={() => router.push("/login-business")}
        style={{
          backgroundColor: "#e7e5e2",
          paddingVertical: 12,
          paddingHorizontal: 45,
          borderRadius: 50,
          borderWidth: 1.3,
          shadowColor: "#000000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3,
        }}
      >
        <Text
          style={{
            color: "#d6461f",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Garet-Book",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>

    
  );
}
