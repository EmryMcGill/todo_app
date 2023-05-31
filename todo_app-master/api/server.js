const todoAPIRouter = require("./routes/todoAPI");
const express = require('express');
const { get } = require('http');
const app = express();

// ------------------MIDDLEWARE-----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
app.use('/todoAPI', todoAPIRouter);

app.listen(5000, () => console.log('http://localhost:5000/'));
