import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import { useFonts } from "expo-font";

export default function BusinessDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/products/my-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(); 
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const [fontsLoaded] = useFonts({
    "Garet-Book": require("../../assets/fonts/garet/Garet-Book.ttf"),
    "Garet-Heavy": require("../../assets/fonts/garet/Garet-Heavy.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
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
        paddingHorizontal: 20,
      }}
    >
      <View style={{ paddingHorizontal: 20, paddingVertical: 50, }}>
        {/* Header Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 28, fontFamily:"Garet-Heavy", marginRight: 80, color: "#000" }}>
            Business Dashboard
          </Text>
          <Pressable
            style={{
              backgroundColor: "#e98669",
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 30,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => router.push("/business/productRegistration")}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "700",
                fontFamily: "Montserrat-Regular",
                letterSpacing: 0.5,
              }}
            >
              REGISTER PRODUCT +
            </Text>
          </Pressable>
        </View>

        {/* Product List */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 12,
                padding: 18,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.name}
                </Text>
                <Pressable
                  onPress={() => openModal(item)}
                  style={{
                    borderWidth: 2,
                    borderColor: "#000",
                    borderRadius: 20,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>SHOW DETAILS</Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        {/* Show More */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 22, color: "#000" }}>⌄</Text>
          <Text style={{ fontSize: 14, color: "#444", fontWeight: "500" }}>
            SHOW MORE
          </Text>
        </View>

        {/* Product Details Modal */}
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              {selectedProduct && (
                <>
                  <Image
                    source={{
                      uri: `http://localhost:3000/${selectedProduct?.product_image?.replace(
                        /\\/g,
                        "/"
                      )}`,
                    }}
                    style={{
                      width: 250,
                      height: 250,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {selectedProduct.name}
                  </Text>
                  <Text>Type: {selectedProduct.type}</Text>
                  <Text>Materials: {selectedProduct.materials}</Text>
                  <Text>Origin: {selectedProduct.origin}</Text>
                  <Text>Production Date: {selectedProduct.productionDate}</Text>
                  <Text style={{ marginTop: 8, fontWeight: "600" }}>
                    Description:
                  </Text>
                  <Text>{selectedProduct.description}</Text>

                  <View style={{ marginTop: 18, alignItems: "center" }}>
                    {selectedProduct?.qr_code && (
                      <Image
                        source={{
                          uri: `http://localhost:3000/${selectedProduct.qr_code.replace(
                            /\\/g,
                            "/"
                          )}`,
                        }}
                        style={{
                          width: 160,
                          height: 160,
                          borderRadius: 8,
                        }}
                        resizeMode="contain"
                      />
                    )}
                    <Text
                      style={{
                        marginTop: 8,
                        fontWeight: "600",
                        color: "#444",
                      }}
                    >
                      Product QR Code
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      backgroundColor: "#000",
                      padding: 12,
                      borderRadius: 8,
                      marginTop: 15,
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Close
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  </ImageBackground>
)}