const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    getBookById,
} = require("../controllers/books.controller");

router.get('/', getAllBooks);
router.post('/', createBook);
router.delete('/:book_id', deleteBook);
router.put('/:book_id', updateBook);
router.get('/:book_id', getBookById);

module.exports = router;