import { View, Text, TextInput, Pressable, Image, ScrollView, ImageBackground, } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useFonts } from "expo-font";

export default function ProductRegistration() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    materials: "",
    origin: "",
    productionDate: "",
    description: "",
    image: null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setForm({ ...form, image: result.assets[0].uri });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "image" && value)
          formData.append("product_image", {
            uri: value,
            name: "upload.jpg",
            type: "image/jpeg",
          });
        else formData.append(key, value);
      });

      await axios.post("http://localhost:3000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/business");
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  const [fontsLoaded] = useFonts({
    "Garet-Book": require("../../assets/fonts/garet/Garet-Book.ttf"),
    "Garet-Heavy": require("../../assets/fonts/garet/Garet-Heavy.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
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
      source={require("../../assets/images/homebg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View 
      style={{
        flex: 1,
        backgroundColor: "rgba(231, 229, 226, 0.87)",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 27,
            paddingVertical: 110,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginBottom: 30,
              color: "#000",
              fontFamily: "Garet-Heavy", 
            }}
          >
            Register Product
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 40,
            }}
          >
            {/* LEFT COLUMN */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                PRODUCT NAME*
              </Text>
              <TextInput
                placeholder="Name of your product"
                value={form.name}
                onChangeText={(t) => setForm({ ...form, name: t })}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginBottom: 20,
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular",
                  fontSize: 13,
                }}
              />

              <Text style={{ fontSize: 14, fontWeight: "700",fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                PRODUCT TYPE*
              </Text>
              <TextInput
                placeholder="What type of handicraft is your product?"
                value={form.type}
                onChangeText={(t) => setForm({ ...form, type: t })}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginBottom: 20,
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular",
                  fontSize: 13,
                }}
              />

              <Text style={{ fontSize: 14, fontWeight: "700", fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                MATERIALS*
              </Text>
              <TextInput
                placeholder="What materials did you use?"
                value={form.materials}
                onChangeText={(t) => setForm({ ...form, materials: t })}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginBottom: 20,
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular", 
                  fontSize: 13,
                }}
              />

              <Text style={{ fontSize: 14, fontWeight: "700", fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                ORIGIN*
              </Text>
              <TextInput
                placeholder="Where is your product from?"
                value={form.origin}
                onChangeText={(t) => setForm({ ...form, origin: t })}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginBottom: 20,
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular", 
                  fontSize: 13,
                }}
              />

              <Text style={{ fontSize: 14, fontWeight: "700", fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                PRODUCTION DATE*
              </Text>
              <TextInput
                placeholder="When was your product made?"
                value={form.productionDate}
                onChangeText={(t) => setForm({ ...form, productionDate: t })}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  marginBottom: 20,
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular", 
                  fontSize: 13,
                }}
              />
            </View>

            {/* RIGHT COLUMN */}
            <View style={{ flex: 0.9 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                DESCRIPTION*
              </Text>
              <TextInput
                placeholder="Can you describe your product..."
                multiline
                value={form.description}
                onChangeText={(t) => setForm({ ...form, description: t })}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  height: 140,
                  textAlignVertical: "top",
                  marginBottom: 36,
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular",
                  fontSize: 13, 
                }}
              />

              <Text style={{ fontSize: 14, fontWeight: "700", fontFamily:"Montserrat-Regular", marginBottom: 6 }}>
                PRODUCT IMAGE*
              </Text>
              <Pressable
                onPress={pickImage}
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 12,
                  height: 160,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  fontFamily:"Montserrat-Regular", 
                }}
              >
                {form.image ? (
                  <Image
                    source={{ uri: form.image }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  <>
                    <Text style={{ fontSize: 36, marginBottom: 6 }}>☁️</Text>
                    <Text style={{ fontSize: 14, fontFamily:"Montserrat-Regular", }}>
                      UPLOAD IMAGE
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: "#e98669",
              paddingVertical: 14,
              borderRadius: 20,
              alignSelf: "center",
              width: 160,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "700",
                fontFamily:"Montserrat-Bold", 
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              SUBMIT
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
