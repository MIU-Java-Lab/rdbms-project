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
    getBookByName,
    addBorrower,
} = require("../controllers/books.controller");
const {
    getAllHistories,
} = require("../controllers/booksHistory.controller");

router.get('/', getAllBooks);
router.post('/', createBook);
router.delete('/:book_id', deleteBook);
router.put('/:book_id', updateBook);
router.post('/:book_id/borrows', addBorrower);
router.get('/BookName', SortByBookName);
router.get('/Category', SortByCategory);
router.get('/Author', SortByAuthor);
router.get('/:book_id', getBookById);
router.get('/borrow/:filterParam', getBorrowedBooksByUserId);
router.get('/fee/:filterParam', calculateOverdueFees);
router.get('/filter/:filterParam', getBookByName);


router.get('/history/all', getAllHistories);

module.exports = router;