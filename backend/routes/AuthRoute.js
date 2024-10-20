import express from "express";
import { Login, LogOut, Me } from '../controllers/AuthController.js';
import { verifyToken} from "../middelware/AuthUser.js";

const router = express.Router();

// Tambahkan middleware verifyToken ke endpoint `/me` untuk memastikan hanya pengguna yang sudah login yang bisa mengakses
router.get('/me', verifyToken, Me);
router.post('/login', Login);
router.delete('/logout', verifyToken, LogOut);

export default router;
