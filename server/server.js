const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sampleBiles = require("./bikes.json");

app.use(cors());

const bikes = sampleBiles || [];

app.use(bodyParser.json({ limit: "10000mb" })); // Đảm bảo có thể nhận chuỗi Base64 lớn

app.post("/api/bikes", (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "Thông tin không đầy đủ!" });
  }

  const bike = {
    id: new Date().toISOString(),
    name,
    price,
    description,
    image,
  };

  bikes.push(bike);

  res.status(201).json(bike);
});

app.get("/api/bikes", (req, res) => {
  res.status(200).json(bikes);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
