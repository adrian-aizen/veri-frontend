import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useFonts } from "expo-font";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "HOME", route: "/" },
    { name: "ABOUT", route: "/about" },
    { name: "PRODUCTS", route: "/products" },
    { name: "CONTACT", route: "/contact" },
  ];

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
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.01)", 
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 0, 
        position: "absolute", 
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, 
        backdropFilter: "blur(10px)",
      }}
    >
      {/* App Title */}
      <Image
        source={require('../assets/images/verilokal_text.png')}
        style={{ justifyContent: "left", alignItems: "left",  width:140, height: 25, marginRight: 25,}}
      >

      </Image>

      {/* Nav Links */}
      <View style={{ flexDirection: "row", gap: 18 }}>
        {links.map((link) => (
          <TouchableOpacity
            key={link.route}
            onPress={() => router.push(link.route)}
          >
            <Text
              style={{
                color: pathname === link.route ? "#d6461f" : "#000000",
                fontWeight: pathname === link.route ? "bold" : "500",
                fontSize: 13,
                fontFamily: "Montserrat-Regular",
              }}
            >
              {link.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
