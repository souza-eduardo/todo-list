const express = require('express');
const router = express.Router();

const Model = require('../model/todo');

router.post('/todolist', async (req, res) => {

  const todo = new Model({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status
  });

  try {
    const todoToSave = await todo.save();
    res.status(201).json(todoToSave);

  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/todolist', async (req, res) => {
  try {
    const todo = await Model.find();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/todolist/:id', async (req, res) => {
  try {
    const todo = await Model.findById(req.params.id);
    res.status(200).json(todo);
  } catch (erro) {
    res.status(400).json(error);
  }
});

router.patch('/todolist/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);

  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/todolist/:id', async (req, res) => {
  const result = await Model.findByIdAndDelete(req.params.id);
  res.send(`Deleted ${result.title}`);
});

module.exports = router;