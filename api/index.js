// server port
const port = 4000;

// imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// middleware imports
const isAuth = require("./middleware/isAuth");
const isAdmin = require("./middleware/isAdmin");

// Route imports
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const adminRoutes = require("./routes/admin");

// Db connection
require("dotenv/config");
mongoose
  .connect(process.env.DBURI)
  // .connect("mongodb://mongo:27017/mern")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

// middleware
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ response: "Test" });
});

// Route middleware
app.use("/api/users", authRoutes);
app.use("/api/posts", isAuth, postsRoutes);
app.use("/api/users/admin", isAuth, isAdmin, adminRoutes);

app.listen(port, () => console.log(`server listening on port: ${port}`));
