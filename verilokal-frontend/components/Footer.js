import { View, Text, Linking, TouchableOpacity } from "react-native";

export default function Footer() {
  return (
    <View
      style={{
        position: "absolute", 
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.01)", 
        paddingVertical: 16,
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(10px)", 
      }}
    >
      <Text
        style={{
          color: "#000000",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        © {new Date().getFullYear()} VeriLokal
      </Text>

      <View style={{ flexDirection: "row", gap: 16 }}>
        <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
          <Text style={{ color: "#d6461f", fontSize: 14 }}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
          <Text style={{ color: "#d6461f", fontSize: 14 }}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("mailto:support@woodcraft.com")}>
          <Text style={{ color: "#d6461f", fontSize: 14 }}>Email Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
