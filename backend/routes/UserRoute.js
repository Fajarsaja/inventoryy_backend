// routes/t_penjualan.js
import express from 'express';
import {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/UserController.js';

const router = express.Router();

/**
 * @swagger
 * /t_penjualan:
 *   get:
 *     summary: Get all inventory
 *     description: list of all inventory
 *     responses:
 *       200:
 *         description: A list of inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: inventory Id
 *                   name:
 *                     type: string
 *                     description: inventory name
 *                   amount:
 *                     type: number
 *                     description: inventory amount
 */
router.get('/t_penjualan', getUsers);

/**
 * @swagger
 * /t_penjualan/{id}:
 *   get:
 *     summary: Get inventory by Id
 *     description: specific inventory by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Id of theinventory
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details specific inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 amount:
 *                   type: number
 *       404:
 *         description: inventory not found
 */
router.get('/t_penjualan/:id', getUsersById);

/**
 * @swagger
 * /t_penjualan:
 *   post:
 *     summary: Create new inventory
 *     description: Add a new inventory to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: inventory created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/t_penjualan/', createUser);

/**
 * @swagger
 * /t_penjualan/{id}:
 *   patch:
 *     summary: Update inventory
 *     description: Modify inventory identified by its Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Id of theinventory to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: inventory updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: inventory not found
 */
router.patch('/t_penjualan/:id', updateUser);

/**
 * @swagger
 * /t_penjualan/{id}:
 *   delete:
 *     summary: Delete inventory
 *     description: Remove inventory by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of theinventory to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: inventory deleted successfully
 *       404:
 *         description: inventory not found
 */
router.delete('/t_penjualan/:id', deleteUser);

export default router;
