// src/screens/HomeScreen.js
import React, { useEffect } from "react";
import { Button, FlatList, Text, View } from "react-native";
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Danh sách xe đạp</Text>
      <FlatList
        data={bikes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>Tên: {item.name}</Text>
            <Text>Giá: {item.price}</Text>
            <Text>Mô tả: {item.description}</Text>
          </View>
        )}
      />
      <Button
        title="Thêm xe đạp mới"
        onPress={() => navigation.navigate("AddBike")}
      />
    </View>
  );
};

export default HomeScreen;
