const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getUserById,
} = require("../controllers/users.controller");

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:user_id', deleteUser);
router.put('/:user_id', updateUser);
router.get('/:user_id', getUserById);

module.exports = router;