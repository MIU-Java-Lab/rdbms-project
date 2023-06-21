const User = require("../models/user.model");

async function getAllUsers(req, res, next) {
    try {
        const queryParams = req.query;
        const users = await User.find(queryParams);
        res.json({data: users});
    } catch (e) {
        next(e);
    }
}

async function createUser(req, res, next) {
    try {
        const {...rest} = req.body;
        const result = await User.create(rest);

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function deleteUser(req, res, next) {
    try {
        const {user_id} = req.params;

        const result = await User.deleteOne({_id: user_id})

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function updateUser(req, res, next) {
    try {
        const {user_id} = req.params;
        const {...rest} = req.body;

        const result = await User.updateOne({_id: user_id}, {
            ...rest
        })

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}
async function getUserById(req, res, next) {
    try {
        const {user_id} = req.params;

        const result = await User.findOne({_id: user_id});

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
}