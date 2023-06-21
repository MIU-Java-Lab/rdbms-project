const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema(
    {
        libraryID: {
            type: String,
            unique: true,
            required: true,
        },
        address: {type: String, required: true},
        name: {type: String, required: true},
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

const libraryModel = mongoose.model("libraries", librarySchema);

module.exports = libraryModel;