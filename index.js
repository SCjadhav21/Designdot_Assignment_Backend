require("dotenv").config();
const { connection } = require("./Confige/db");
const express = require("express");
const app = express();
const cors = require("cors");
const { TodoRoutes } = require("./Routes/todoRoutes");
const { UserRoutes } = require("./Routes/user.routes");

app.use(express.json());
app.use(cors());

app.use("/user", UserRoutes, (req, res) => {
  res.status(404).send("Routes not found");
});

app.use("/todo", TodoRoutes, (req, res) => {
  res.status(404).send("Routes not found");
});
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DataBase`);
  } catch (err) {
    console.log("Error: cant connect to mongodb" + err);
  }

  console.log(`running on port ${process.env.port}`);
});
