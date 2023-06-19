const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getAllBooks,
    createBook,
} = require("../controllers/books.controller");

router.get('/', getAllBooks);
router.post('/', createBook);

module.exports = router;