const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

const bikes = [];

app.use(bodyParser.json({ limit: "10000mb" })); // Đảm bảo có thể nhận chuỗi Base64 lớn

app.post("/api/bikes", (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "Thông tin không đầy đủ!" });
  }

  bikes.push({ name, price, description, image });

  res.status(201).json({ message: "Tạo xe đạp thành công!" });
});

app.get("/api/bikes", (req, res) => {
  res.status(200).json(bikes);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
