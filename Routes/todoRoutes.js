const express = require("express");
const app = express();
const { TodoModel } = require("../Model/todo.model");
const { Auth } = require("../middelware/authentication");
app.use(express.json());

const TodoRoutes = express.Router();
TodoRoutes.use(Auth);
TodoRoutes.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find({ userId: req.body.userId });
    res.status(200).send(todos);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

TodoRoutes.post("/create", async (req, res) => {
  let { todo, userId } = req.body;

  try {
    let NewTodo = new TodoModel({
      todo,
      iscompleted: false,
      userId,
    });
    NewTodo.save();
    res.status(201).send("todo created successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

TodoRoutes.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const oldtodo = await TodoModel.findOne({ _id: id });
    const useId_of_todo = oldtodo.userId;

    const userId_of_user = req.body.userId;
    if (useId_of_todo !== userId_of_user) {
      res.status(200).send("You are not athorised");
    } else {
      const status = !oldtodo.iscompleted;

      const newtodo = await TodoModel.findOneAndUpdate(
        { _id: id },
        { iscompleted: status }
      );

      res.status(200).send("Status updated successfully");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

TodoRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const oldtodo = await TodoModel.findOne({ _id: id });
    const useId_of_product = oldtodo.userId;
    const userId_of_user = req.body.userId;
    if (useId_of_product !== userId_of_user) {
      res.status(200).send("You are not athorised");
    } else {
      await TodoModel.findOneAndDelete({ _id: id });
      res.status(200).send("todo deleted successfully");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = { TodoRoutes };
