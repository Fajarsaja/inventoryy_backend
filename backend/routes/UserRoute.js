import express from "express"
import {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
} from '../controllers/UserController.js';
import { verifyUser,verifyToken, adminOnly} from "../middelware/AuthUser.js";

const router = express.Router();

router.get('/users',verifyToken,verifyUser,adminOnly, getUsers);
router.get('/users/:id',verifyToken,verifyUser,adminOnly, getUsersById);
router.post('/users',verifyToken, verifyUser,adminOnly, createUsers);
router.patch('/users/:id',verifyToken, verifyUser,adminOnly,updateUsers);
router.delete('/users/:id',verifyToken,verifyUser,adminOnly, deleteUsers);

export default router