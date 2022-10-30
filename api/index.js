// server port
const port = 4000;

// imports
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

// middleware imports
const isAdmin = require("./middleware/isAdmin");
const isAuth = require("./middleware/isAuth");

// Route imports
const postsRoutes = require("./routes/posts");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// Db connection
require("dotenv/config");
mongoose
  .connect(process.env.DBURI)
  // .connect("mongodb://mongo:27017/mern")
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

// middleware
app.use(cors());
app.use(express.json());

// Route middleware
app.use("/api/users", authRoutes);
app.use("/api/posts", isAuth, postsRoutes);
app.use("/api/users/admin", isAuth, isAdmin, adminRoutes);

app.listen(port, () => console.log(`server listening on port: ${port}`));
