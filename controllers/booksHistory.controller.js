const History = require("../models/borrowHistory.model");

async function getAllHistories(req, res, next) {
    try {
        const result = await History.aggregate([
            {$lookup: {from: "books", localField: "bookId", foreignField: "_id", as: "bookDetails"}},
            {$unwind: '$bookDetails'},
        ]);

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllHistories
}