require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));


// USER SCHEMA
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);


// FOOD SCHEMA
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysSinceIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Food = mongoose.model('Food', foodSchema);


// REGISTER
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        await user.save();
        res.status(201).send('User registered');

    } catch (error) {
        res.status(500).send('Server error');
    }
});


// LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).send('Invalid credentials');

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).send('Server error');
    }
});


// VERIFY TOKEN MIDDLEWARE
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) return res.status(403).send("Token required");

    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token");

        req.userId = decoded.userId;
        next();
    });
};


// ADD FOOD
app.post('/api/foods', verifyToken, async (req, res) => {
    try {
        const { name, daysSinceIAte } = req.body;

        const food = new Food({
            name,
            daysSinceIAte,
            user: req.userId
        });

        await food.save();
        res.status(201).json(food);

    } catch (error) {
        res.status(500).send('Server error');
    }
});


// UPDATE FOOD
app.put('/api/foods/:id', verifyToken, async (req, res) => {
    try {
        const { name, daysSinceIAte } = req.body;

        const food = await Food.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { name, daysSinceIAte },
            { new: true }
        );

        if (!food) return res.status(404).send('Food not found');

        res.json(food);

    } catch (error) {
        res.status(500).send('Server error');
    }
});


// DELETE FOOD
app.delete('/api/foods/:id', verifyToken, async (req, res) => {
    try {
        const food = await Food.findOne({ _id: req.params.id, user: req.userId });

        if (!food) return res.status(404).send('Food not found');

        await Food.deleteOne({ _id: req.params.id });
        res.send("Food item deleted");

    } catch (error) {
        res.status(500).send("Server error");
    }
});


// GET FOODS
app.get('/api/foods', verifyToken, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.userId });
        res.json(foods);

    } catch (error) {
        res.status(500).send("Server error");
    }
});


// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
