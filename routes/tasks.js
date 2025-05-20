const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 

router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the tasks" });
    }
});

router.get("/id/:id", async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to get the task" });
    }
});

router.put("/markAsCompleted/:id", async(req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        .then((task) => {
            if (!task) {
                return res.status(404).send({ message: "Task not found" });
            }
            task.completed = true;
            return task.save();
        });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to update the task" });
    }
});

router.put("/id/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        .then((task) => {
            if (!task) {
                return res.status(404).send({ message: "Task not found" });
            }
            task.name = req.params.title;
            return task.save();
        });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to update the task" });
    }
});

router.delete("/delete/:id", async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to delete the task" });
    }
});



module.exports = router;