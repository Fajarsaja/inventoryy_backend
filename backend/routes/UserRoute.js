import express from "express"
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
} from '../controllers/UserController.js';
import { verifyUser, adminOnly} from "../middelware/AuthUser.js";

const router = express.Router();

router.get('/users',verifyUser,adminOnly, getUsers);
router.get('/users/:id',verifyUser,adminOnly, getUsersById);
router.post('/users',verifyUser,adminOnly, createUsers);
router.patch('/users/:id', verifyUser,adminOnly,updateUsers);
router.delete('/users/:id',verifyUser,adminOnly, deleteUsers);

export default router