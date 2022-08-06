require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require('path')


const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const URI = process.env.MONGODB_URI;

app.use(fileUpload())

app.use("/user", require("./routes/userRouter"));
app.use("/restaurant", require("./routes/restaurantRouter"));
app.use("/api", require("./routes/upload"));
app.use("/admin", require("./routes/adminRouter"))
app.use("/team", require("./routes/teamRouter"))

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.listen(5000, () => {
  console.log("Running on server 5000!");
});
