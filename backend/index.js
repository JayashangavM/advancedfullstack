// const express = require('express');
// const app = express();

// require('dotenv').config();
// require('./db');

// app.use(express.json());   // ← needed to read JSON body

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const mongoose = require('mongoose');
// const user = mongoose.model('user',userSchema);
// const newuser = new user({
//   username: "jai",
//   email: "jai@example.com",
//   age: 25
// });   
// newuser.save().then(() => 
//   console.log('User saved'));
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },   
//   age: { type: Number, required: true }
// });

// const User = mongoose.model('User', userSchema);

// app.get('/users/:userId', (req, res) => {
//   const userId = req.params.userId;
//   res.send(`User ID requested: ${userId}`);
// });

// app.get('/users/:userId/profile', (req, res) => {
//   const userId = req.params.userId;
//   const name = req.query.name;
//   res.send(`Profile of User ID: ${userId}, Name: ${name}`);
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running at ${process.env.PORT}`);
// });

const express = require('express');
const app = express();

require('dotenv').config();
require('./db');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const mongoose = require('mongoose');

// ✔ First create schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
});

// ✔ Then create model
const User = mongoose.model('User', userSchema);

// ✔ Then insert data
const newuser = new User({
  username: "jai",
  email: "jai@example.com",
  age: 25
});

newuser.save().then(() => console.log('User saved'));

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID requested: ${userId}`);
});

app.get('/users/:userId/profile', (req, res) => {
  const userId = req.params.userId;
  const name = req.query.name;
  res.send(`Profile of User ID: ${userId}, Name: ${name}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
