const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const todomodel = require('./model/todo');

const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// CREATE - Insert Todo
app.post('/insert', async (req, res) => {
    const title = req.body.title;
    const completed = req.body.completed || false;

    if (!title) {
        return res.status(400).send("Title is required");
    }

    const todo = new todomodel({ title, completed });

    try {
        await todo.save();
        res.status(200).send("Inserted Data");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
    }
});

// READ - Get all Todos
app.get('/read', async (req, res) => {
    try {
        const todos = await todomodel.find({});
        res.status(200).json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error reading data");
    }
});

// UPDATE - Update Todo
app.put('/update', async (req, res) => {
    const id = req.body.id;
    const completed = req.body.completed;

    if (!id) return res.status(400).send("ID is required");

    try {
        const updatedTodo = await todomodel.findByIdAndUpdate(
            id,
            { completed },
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating data");
    }
});

// DELETE - Delete Todo
app.delete('/delete', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo = await todomodel.findByIdAndDelete(id);
        res.status(200).json(deletedTodo);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting data");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
