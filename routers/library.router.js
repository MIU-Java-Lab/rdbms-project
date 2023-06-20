const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getAllLibraries,
    createLibrary,
    deleteLibrary,
    updateLibrary,
    getLibraryById,
} = require("../controllers/library.controller");

router.get('/', getAllLibraries);
router.post('/', createLibrary);
router.delete('/:lib_id', deleteLibrary);
router.put('/:lib_id', updateLibrary);
router.get('/:lib_id', getLibraryById);

module.exports = router;