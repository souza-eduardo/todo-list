const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  dueDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

module.exports = Todo = mongoose.model('Todo', todoSchema);