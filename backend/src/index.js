const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");
const adminRoutes = require("./routes/admin");

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => console.log("Backend running on port", PORT));
});
