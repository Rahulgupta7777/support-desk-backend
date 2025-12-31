// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const routes = require("./routes/books")

const app = express();
app.use(express.json())
app.use(bodyParser.json());


app.use("/",(req,res)=>{
    res.send("Hello World!")
})

app.use("/Books",routes)
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});