import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Dashboard</Text>
      <Text style={styles.subTitle}>Registered Products</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable onPress={() => openModal(item)}>
              <Text style={styles.productName}>{item.name}</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push("/business/productRegistration")}
      >
        <Text style={styles.buttonText}>+ Register New Product</Text>
      </Pressable>

      {/* ✅ Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                {/* Product Image */}
                <Image source={{uri: `http://localhost:3000/${selectedProduct?.product_image?.replace(/\\/g, "/")}`}} style={styles.modalImage}/>
              
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text>Type: {selectedProduct.type}</Text>
                <Text>Materials: {selectedProduct.materials}</Text>
                <Text>Origin: {selectedProduct.origin}</Text>
                <Text>Production Date: {selectedProduct.productionDate}</Text>
                <Text style={{ marginTop: 8, fontWeight: "600" }}>Description:</Text>
                <Text>{selectedProduct.description}</Text>

                <View style={styles.qrContainer}>
                  {selectedProduct?.qr_code && (
                    <Image
                      source={{ uri: `http://localhost:3000/${selectedProduct.qr_code.replace(/\\/g, "/")}` }}
                      style={{ width: 160, height: 160, borderRadius: 8 }}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={styles.qrLabel}>Product QR Code</Text>
                </View>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f9f9f9" 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  subTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 12 

  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  productName: { 
    fontSize: 17, 
    fontWeight: "bold", 
    marginBottom: 6, 
    color: "#0066cc" 
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    marginTop: 18,
  },
  buttonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "600" 
  },
  modalOverlay: {
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    padding: 20,
  },
  modalContent: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 10, 
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10 
  },

  qrContainer: {
  marginTop: 18,
  alignItems: "center",
},
  qrPlaceholder: {
  width: 140,
  height: 140,
  backgroundColor: "#eaeaea",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ccc",
},

  qrLabel: {
  marginTop: 8,
  fontWeight: "600",
  color: "#444",
},
  closeButton: { 
    backgroundColor: "#000", 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 15 
  },
  closeButtonText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "600" },
});
/*
*/ 