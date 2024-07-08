const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

dotenv.config({ path: ".env" });
console.log("DB_URI:", process.env.DB_URI);
// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes;
const user = require("./routes/userRoutes");
const restaurant = require("./routes/restaurantRoutes");
app.use("/api/v1/", user);
app.use("/api/v1/", restaurant);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is working on http://${process.env.PORT}`)
);
