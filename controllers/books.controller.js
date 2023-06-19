const Book = require("../models/book.model");

async function getAllBooks(req, res, next) {
    try {
        const books = await Book.find({});
        res.json({ data: books });
    } catch (e) {
        next(e);
    }
}

async function createBook(req, res, next) {
    try {
        const {title, description} = req.body;
        const result = await Book.create({
            title, description
        });

        res.json({ success: true, data: result });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllBooks,
    createBook
}