const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    phone: String,
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
    },
    firstName: String,
    lastName: String,
    address: String,
    title: String,
});

module.exports = mongoose.model("users", userSchema);