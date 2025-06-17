const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Exercise Tracker API is running!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
