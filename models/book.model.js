const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: String,
    }
);

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;