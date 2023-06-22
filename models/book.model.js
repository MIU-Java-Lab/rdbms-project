const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        ISBN: {
            type: String,
            required: true,
        },
        libraryID: {
            type: String,
            required: true,
        },
        borrower: {
            userId: { // email
                type: String,
                match: /.+\@.+\..+/,
            },
            borrowDate: {type: Date},
            returnDate: Date,
            fee: Number,
        },
        publisher: {
            companyName: String,
            authors: [
                {
                    fullName: String
                }
            ],
            address: String,
            phone: String,
        },
        title: {type: String, required: true},
        subject: {type: String, default: ''},
        description: String,
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    }
);

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;