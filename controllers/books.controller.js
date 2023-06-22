const mongoose = require("mongoose");
const Book = require("../models/book.model");
const BorrowHistory = require("../models/borrowHistory.model");

async function getAllBooks(req, res, next) {
    try {
        const queryParams = req.query;
        let result;

        switch (queryParams.bookType) {
            case "checkout": {
                result = await Book.find({"borrower.userId": {$ne: null}});
                break;
            }
            case "overdue": {
                result = await Book.aggregate(
                    [
                        {$match: {"borrower.userId": {$ne: null}, "borrower.returnDate": {$lt: new Date()}}},
                        {
                            $lookup: {
                                from: "users",
                                localField: "borrower.userId",
                                foreignField: "email",
                                as: "userDetails"
                            }
                        },
                        {$unwind: '$userDetails'}
                    ]
                );
                break;
            }
            default:
                result = await Book.find({});
        }

        res.json({data: result});
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
        console.log(bookID);
        const result = await Book.findOne({_id: bookID});

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function getBookByName(req, res, next) {
    try {
        const {filterParam} = req.params;

        const result = await Book.find({
            $or: [
                {"publisher.authors.fullName": filterParam},   // Search by author
                {"subject": filterParam},                       // Search by category
                {"title": filterParam}                            // Search by book name
            ]
        });       // Sort by author name

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}


async function SortByAuthor(req, res, next) {
    try {
        const result = await Book.find().sort({"publisher.authors.fullName": 1});
        console.log(result);
        res.json({success: true, data: result});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function SortByCategory(req, res, next) {
    try {
        const result = await Book.find().sort({"subject": 1});
        console.log(result);
        res.json({success: true, data: result});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function SortByBookName(req, res, next) {
    try {
        const result = await Book.find().sort({"publisher.authors.fullName": 1});
        console.log(result);
        res.json({success: true, data: result});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function getBorrowedBooksByUserId(req, res, next) {
    try {
        const {filterParam} = req.params;
        console.log(filterParam);
        const result = await Book.find({"borrower.userId": filterParam});
        res.json({success: true, data: result});

    } catch (error) {
        next(error);
    }
}


async function calculateOverdueFees(req, res, next) {
    try {
        const {filterParam} = req.params;
        const currentDate = new Date();

        const overdueBooks = await Book.find({
            "borrower.userId": filterParam,
            "borrower.returnDate": {$lt: currentDate}
        });

        let totalOverdueFees = 0;

        overdueBooks.forEach((book) => {
            const returnDate = book.borrower.returnDate;
            const borrowDate = book.borrower.borrowDate;
            const daysOverdue = Math.floor((returnDate - borrowDate) / (1000 * 60 * 60 * 24));
            const overdueFeePerDay = book.borrower.fee; // Assuming an overdue fee of $5 per day
            if (daysOverdue > 15) {
                const overdueFee = daysOverdue * overdueFeePerDay;
                totalOverdueFees += overdueFee;
            }

        });

        console.log(totalOverdueFees);
        res.json({success: true, data: totalOverdueFees});
        return totalOverdueFees;
    } catch (error) {
        next(error);
    }
}

async function addBorrower(req, res, next) {
    try {
        const {book_id} = req.params;
        const {borrower} = req.body;

        const book = await Book.findOne({_id: book_id})

        if(!book) throw new Error("Book with given id not found!")
        if(book.borrower?.userId) throw new Error("Book is already borrowed")

        const result = await Book.updateOne({_id: book_id}, {
            borrower
        })
        await BorrowHistory.findOneAndUpdate(
            {bookId: new mongoose.Types.ObjectId(book_id)},
            {$push: {owners: {...borrower, ownerId: borrower.email}}},
            {upsert: true}
        )

        res.json({success: true, data: result});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    getBookById,
    getBookByName,
    SortByBookName,
    SortByCategory,
    getBorrowedBooksByUserId,
    calculateOverdueFees,
    SortByAuthor,
    addBorrower
}