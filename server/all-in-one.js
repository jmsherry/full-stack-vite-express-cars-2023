// Load environment variables (locally!)
require('dotenv').config()

// Import Modules
const express = require("express"); // server framework
const mongoose = require("mongoose"); // database tool
const cors = require("cors"); // Make API publicly available

// Get Environment Variables
const {
  PORT = 3333,
  DB_URL = "mongodb://localhost/todos_jump",
} = process.env;

// Create an app
const app = express();

// Add Middleware
app.use(express.static("public")); // static file serving
app.use(express.json()); // parse application/json
app.use(cors()); // <-- This package makes other people able to call your API (aka Cross-Origin Resource Sharing)


// Connect to Database
console.log('DB_URL', DB_URL);
const main = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('DB Connected');
  } catch (err) {
    console.log(err)
  }
}

main().catch(err => console.log(err));

// Define Schema
const { Schema } = mongoose;
const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Use to make model
const Todo = mongoose.model("Todo", TodoSchema);

// Routes with controllers (inline) that use models
const apiRoot = "/api/";
const version = "v1";
const fullAPIRoot = apiRoot + version;

// route is the app.get(URL,  here; controller is the function;
app.get(`${fullAPIRoot}/todos/:id?`, async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const todos = await Todo.find(query);  // here is the model being used
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.post(`${fullAPIRoot}/todos/`, async (req, res) => {
  const todoData = req.body;
  console.log("todoData", todoData);
  try {
    const newTodo = new Todo(todoData);
    const result = await newTodo.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.put(`${fullAPIRoot}/todos/:id`, async (req, res) => {
  const updateData = req.body;
  console.log(`Updating ${req.params.id}`, updateData);

    try {
      const result = await Todo.updateOne({ _id: req.params.id }, req.body);
      if(result.n === 0) return res.sendStatus(404)
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err)
    }
});

app.delete(`${fullAPIRoot}/todos/:id`, async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    if(result.n === 0) return res.sendStatus(404)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err)
  }
});

// 404 Route
app.all("*", (req, res) => {
  res.sendStatus(404);
});

// Start the server
app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
