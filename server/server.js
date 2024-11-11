// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());

// Cấu hình multer để lưu ảnh vào thư mục public/images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Tên file là unique ID + đuôi file
  },
});

const upload = multer({ storage: storage });

// Array lưu thông tin xe đạp (hoặc thay bằng database thật)
let bikes = [];

// API để tạo một chiếc xe đạp mới
app.post("/api/bikes", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file;

  if (!name || !price || !description || !image) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
  }

  // Lưu thông tin xe đạp
  const newBike = {
    id: bikes.length + 1,
    name,
    price,
    description,
    image: `/images/${image.filename}`, // Đường dẫn tới ảnh trong thư mục public
  };

  bikes.push(newBike);

  res.status(201).json({ message: "Tạo xe đạp thành công!", bike: newBike });
});

// Serve static files từ thư mục public
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
