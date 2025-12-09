const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const FoodModel = require('./models/food');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MongoDB_URL)

app.use(cors());
app.use(express.json());

app.post('/insert', async (req, res) => {
    const foodname = req.body.foodname;
    const daysSinceIAte = req.body.daysSinceIAte;

    const food = new FoodModel({ foodname: foodname, daysSinceIAte: daysSinceIAte });
    try {
        await food.save();
        res.status(201).send('Food item inserted');
    } catch (err) {
        res.status(500).send("Error inserting food item");
    }
});

app.get('/read', async (req, res) => {
    try {
        const foods = await FoodModel.find({});
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).send("Error reading food items");
    }
});
app.put('/update', async (req, res) => {
    const newFoodname = req.body.newFoodname;
    const id = req.params.id;
    try {
        await FoodModel.findByIdAndUpdate(id, { foodname: newFoodname });
        res.status(200).send("Food item updated");
    } catch (error) {
        res.status(500).send("Error updating food item");
    }
});
app.delete('/delete', async (req, res) => {
    const id = req.params.id;
    try {
        await FoodModel.findByIdAndDelete(id);
        res.status(200).send("Food item deleted");
    } catch (error) {
        res.status(500).send("Error deleting food item");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});