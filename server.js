// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 3000;

// const userRoutes = require("./routes/users");

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"));

// app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Exercise Tracker API is running!");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

//TEST 5

const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// POST /api/fileanalyse
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
