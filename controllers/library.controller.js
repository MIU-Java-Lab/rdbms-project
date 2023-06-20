const Library = require("../models/library.model");

async function getAllLibraries(req, res, next) {
    try {
        const libraries = await Library.find({});
        res.json({data: libraries});
    } catch (e) {
        next(e);
    }
}

async function createLibrary(req, res, next) {
    try {
        const {...rest} = req.body;
        const result = await Library.create(rest);

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function deleteLibrary(req, res, next) {
    try {
        const {lib_id} = req.params;

        const result = await Library.deleteOne({_id: lib_id})

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function updateLibrary(req, res, next) {
    try {
        const {lib_id} = req.params;
        const {...rest} = req.body;

        const result = await Library.updateOne({_id: lib_id}, {
            ...rest
        })

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

async function getLibraryById(req, res, next) {
    try {
        const {lib_id} = req.params;

        const result = await Library.findOne({_id: lib_id});

        res.json({success: true, data: result});
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllLibraries,
    createLibrary,
    deleteLibrary,
    updateLibrary,
    getLibraryById,
}