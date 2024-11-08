const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const noticeRoutes = require("./routes/noticeRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5173/student/dashboard",
    ],
  })
);

app.use("/api/notices", noticeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
