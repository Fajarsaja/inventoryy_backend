import  express from "express";
import {
    createUser,
    deleteUser,
    getUsers,
    getUsersById,
    updateUser
} from "../controllers/UserController.js"


const router = express.Router();

router.get('/t_penjualan',getUsers);
router.get('/t_penjualan/:id',getUsersById);
router.post('/t_penjualan/',createUser);
router.patch('/t_penjualan/:id',updateUser);
router.delete('/t_penjualan/:id',deleteUser);

export default router;