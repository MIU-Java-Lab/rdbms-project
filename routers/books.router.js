const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    getBookById,
    SortByBookName,
    SortByCategory,
    SortByAuthor,
    getBorrowedBooksByUserId,
    calculateOverdueFees,
    getBookByName
} = require("../controllers/books.controller");

router.get('/', getAllBooks);
router.post('/', createBook);
router.delete('/:book_id', deleteBook);
router.put('/:book_id', updateBook);
router.get('/BookName', SortByBookName);
router.get('/Category', SortByCategory);
router.get('/Author', SortByAuthor);
router.get('/:book_id', getBookById);
router.get('/borrow/:filterParam', getBorrowedBooksByUserId);
router.get('/fee/:filterParam', calculateOverdueFees);
router.get('/filter/:filterParam', getBookByName);
module.exports = router;