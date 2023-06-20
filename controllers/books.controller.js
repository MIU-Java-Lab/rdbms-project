const Book = require("../models/book.model");

async function getAllBooks(req, res, next) {
    try {
        const books = await Book.find({});
        res.json({data: books});
    } catch (e) {
        next(e);
    }
}

async function createBook(req, res, next) {
    try {
        const {...rest} = req.body;
        const result = await Book.create(rest);

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function deleteBook(req, res, next) {
    try {
        const {book_id: bookID} = req.params;

        const result = await Book.deleteOne({_id: bookID})

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function updateBook(req, res, next) {
    try {
        const {book_id: bookID} = req.params;
        const {...rest} = req.body;

        const result = await Book.updateOne({_id: bookID}, {
            ...rest
        })

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}
async function getBookById(req, res, next) {
    try {
        const {book_id: bookID} = req.params;

        const result = await Book.findOne({_id: bookID});

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    getBookById,
}