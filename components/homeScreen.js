import React, { useEffect } from "react";
import {
  Button,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setBikes } from "../redux/bikeSlice";

const HomeScreen = ({ navigation }) => {
  const bikes = useSelector((state) => state.bikes.bikes);
  const dispatch = useDispatch();

  const fetchBikes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/bikes");
      const data = await res.json();
      if (res.ok) {
        dispatch(setBikes(data));
      }
    } catch (error) {
      console.log("🚀 ~ fetchBikes ~ error:", error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Danh sách xe đạp</Text>
      <FlatList
        data={bikes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.bikeItem}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.imagePreview} />
            )}
            <Text style={styles.bikeName}>{item.name}</Text>
            <Text style={styles.bikePrice}>{item.price}</Text>
            <Text style={styles.bikeDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        )}
      />
      {/* Cập nhật lại nút "Thêm xe đạp mới" */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddBike")}
      >
        <Text style={styles.addButtonText}>Thêm xe đạp mới</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  bikeItem: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  bikeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
  },
  bikePrice: {
    fontSize: 16,
    marginBottom: 5,
    color: "#ff6f61",
    textAlign: "center",
  },
  bikeDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  imagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  // Cập nhật nút "Thêm xe đạp mới"
  addButton: {
    marginTop: 20,
    backgroundColor: "#ff6f61", // Màu nền nổi bật
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center", // Căn giữa nội dung nút
    marginBottom: 20,
    elevation: 4, // Thêm bóng đổ cho nút
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff", // Màu chữ trắng để dễ nhìn
    fontWeight: "bold",
  },
});

export default HomeScreen;
