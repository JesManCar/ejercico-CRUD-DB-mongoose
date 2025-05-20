const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
}, { timestamps: true });

const Task = mongoose.model('tareas', TaskSchema);

module.exports = Task;