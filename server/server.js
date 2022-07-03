const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const users = require("./routes/users");

dotenv.config();
app.use(express.json());
app.use(cors());

const httpServer = require("http").createServer(app);

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connexion mongo ok");
  }
);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log(`Server working on ${process.env.PORT}`);
});

app.use("/api/users", users);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, "..", "client/build", "index.html"));
  });
}
