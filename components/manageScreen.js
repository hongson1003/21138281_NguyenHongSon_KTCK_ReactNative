import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { addBike } from "../redux/bikeSlice";

const ManageScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();

  const handleAddBike = async () => {
    if (!name || !price || !description || !imageUri) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin và chọn ảnh.");
      return;
    }

    // Sửa đây để gửi đúng đối tượng image với uri, type và name
    const image = {
      uri: imageUri, // Đảm bảo rằng uri đúng
      type: "image/jpeg", // Chỉ định loại MIME của ảnh (chắc chắn rằng đây là đúng loại ảnh bạn gửi)
      name: `bike_${Date.now()}.jpg`, // Đặt tên ảnh
    };

    const body = {
      name: name,
      price: price,
      description: description,
      image: image.uri,
    };

    try {
      const response = await fetch("http://localhost:3000/api/bikes", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Thông báo", "Tạo xe đạp thành công!");
        setName("");
        setPrice("");
        setDescription("");
        setImageUri(null);
        dispatch(addBike(result));
        navigation.goBack(); // Quay lại HomeScreen
      } else {
        const errorData = await response.json();
        Alert.alert("Lỗi", errorData.message || "Tạo xe đạp thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      Alert.alert("Lỗi", "Không thể kết nối đến server.");
    }
  };

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Nút trở về Home */}
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Điều hướng về màn hình trước
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Trở về</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Thêm xe đạp mới</Text>
      <TextInput
        placeholder="Tên xe đạp"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Giá xe đạp"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TouchableOpacity onPress={handleChooseImage} style={styles.imageButton}>
        <Text style={styles.imageButtonText}>Chọn ảnh</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
      <Button title="Thêm xe đạp" onPress={handleAddBike} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
  // Style for back button
  backButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default ManageScreen;
