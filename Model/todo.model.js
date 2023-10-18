const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  todo: { type: String, required: true },
  iscompleted: { type: Boolean, required: true },
  userId: { type: String, required: true },
});

const TodoModel = mongoose.model("Todo", todosSchema);

module.exports = { TodoModel };
