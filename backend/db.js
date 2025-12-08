const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root@cluster0.2cc10c3.mongodb.net/";

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
