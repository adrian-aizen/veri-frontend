import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, Text, TextInput } from "react-native";

export default function RegisterProduct() {
  const [name, setProductName] = useState("");
  const [type, setType] = useState("");
  const [materials, setMaterials] = useState("");
  const [origin, setOrigin] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [description, setDescription] = useState("");
  const [product_image, setProductImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");


  const pickImage = async () => {
    try {
      if (Platform.OS === "web") {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
            setProductImage({
              uri: URL.createObjectURL(file),
              file, 
              name: file.name,
              type: file.type,
            });
          }
        };
        input.click();
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const file = result.assets[0];
          setProductImage({
            uri: file.uri,
            name: file.fileName || "photo.jpg",
            type: file.mimeType || "image/jpeg",
          });
        }
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error", "Could not pick image.");
    }
  };

  const handleSubmit = async () => {
    if (!name || !origin || !materials || !description || !type || !productionDate || !product_image) {
      setMessage("All fields are required!")
      return;
    } 
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Unauthorized", "Please login first.");
        return;
      }

      setStatusMessage("Registering product...");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("origin", origin);
      formData.append("materials", materials);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("productionDate", productionDate);


      if (product_image) {
        if (Platform.OS === "web") {
          formData.append("product_image", product_image.file);
        } else {
          formData.append("product_image", {
            uri: product_image.uri,
            name: product_image.name,
            type: product_image.type,
          });
        }
      }

      const response = await axios.post("http://localhost:3000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Upload success:", response.data);
      setStatusMessage("✅ Product Registered Successfully!");
      Alert.alert("Success", "Product registered successfully!");

      setProductName("");
      setType("");
      setMaterials("");
      setOrigin("");
      setProductionDate("");
      setDescription("");
      setProductImage(null);
      
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Network or server error.");
      setStatusMessage("❌ Failed to register product.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>Register Product</Text>

      <TextInput placeholder="Product Name" value={name} onChangeText={setProductName} style={inputStyle} />
      <TextInput placeholder="Product Type" value={type} onChangeText={setType} style={inputStyle} />
      <TextInput placeholder="Materials used" value={materials} onChangeText={setMaterials} style={inputStyle} />
      <TextInput placeholder="Origin" value={origin} onChangeText={setOrigin} style={inputStyle} />
      <TextInput placeholder="Production Date (YYYY-MM-DD)" value={productionDate} onChangeText={setProductionDate} style={inputStyle} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} multiline style={[inputStyle, { height: 100 }]} />

      <Pressable
        onPress={pickImage}
        style={{
          borderWidth: 1.5,
          borderStyle: "dashed",
          borderColor: "#999",
          borderRadius: 10,
          paddingVertical: 30,
          alignItems: "center",
          marginBottom: 18,
          backgroundColor: "#fafafa",
        }}
      >
        <Text style={{ fontSize: 32, marginBottom: 8 }}>📷</Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#444" }}>Upload Product Image</Text>
      </Pressable>

      {product_image && (
        <Text style={{ fontWeight: "600", textAlign: "center", marginBottom: 10 }}>
          Uploaded: {product_image.name}
        </Text>
      )}

      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#0A84FF",
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>Submit Product</Text>
      </Pressable>

      {statusMessage ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#333", fontWeight: "600" }}>{statusMessage}</Text>
      ) : null}
    </ScrollView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
  backgroundColor: "#fff",
};
