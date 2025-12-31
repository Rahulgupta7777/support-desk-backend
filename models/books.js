const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/books_db");
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
})

module.exports = mongoose.model("Book", bookSchema)
