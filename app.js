// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const routes = require("./routes/books")
const fs = require('fs')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/",async(req,res)=>{
    console.log(req.statusCode)
    await fs.writeFile("data.json", JSON.stringify({
                statusCode: res.statusCode,
                url: req.url,
                method: req.method,
                dirname: __dirname,
                time: new Date().toISOString()
            }), "utf-8");
    res.send("Hello World!")
})

app.use("/books",routes)
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});