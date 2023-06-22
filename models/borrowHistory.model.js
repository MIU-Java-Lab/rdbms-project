const mongoose = require("mongoose");

const borrowHistorySchema = new mongoose.Schema(
    {
        bookId: mongoose.Schema.Types.ObjectId,
        owners: [
            {
                ownerId: { // email
                    type: String,
                    match: /.+\@.+\..+/,
                },
                borrowDate: {type: Date},
                returnDate: Date,
                fee: Number,
            }
        ]
    }
);

const borrowHistoryModel = mongoose.model("borrowHistory", borrowHistorySchema);

module.exports = borrowHistoryModel;