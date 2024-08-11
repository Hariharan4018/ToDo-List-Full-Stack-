const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todomodel = require("./models/todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get("/get", (req, res) => {
  Todomodel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Todomodel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Todomodel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.post("/add", (req, res) => {
  const task = req.body.task;
  Todomodel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
