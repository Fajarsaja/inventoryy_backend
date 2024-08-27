import express from "express"
import {
    getInventory,
    getInventoryById,
    checkNoPenjualan,
    createInventory,
    updateInventory,
    deleteInventory,
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
 *               no_penjualan:
 *                 type: integer
 *                 description: Unique Id the  inventory
 *               tgl_penjualan:
 *                 type: string
 *                 format: date
 *                 description: Date of the  inventory
 *               nama_barang:
 *                 type: string
 *                 description: Name of the item 
 *               qty:
 *                 type: integer
 *                 description: Quantity of items 
 *               harga:
 *                 type: integer
 *                 description: Price item
 *               subtotal:
 *                 type: integer
 *                 description: Total inventory
 *               keterangan:
 *                 type: string
 *                 description: Additional notes about the inventory
 */
router.get('/t_penjualan', getInventory);

/**
 * @swagger
 * /t_penjualan/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     description: Retrieve a specific transaction by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the transaction
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of a specific transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 no_penjualan:
 *                   type: integer
 *                 tgl_penjualan:
 *                   type: string
 *                   format: date
 *                 nama_barang:
 *                   type: string
 *                 qty:
 *                   type: integer
 *                 harga:
 *                   type: integer
 *                 subtotal:
 *                   type: integer
 *                 keterangan:
 *                   type: string
 *       404:
 *         description: Transaction not found
 */
router.get('/t_penjualan/:id', getInventoryById);


/**
 * @swagger
 * /t_penjualan/check/{no_penjualan}:
 *   get:
 *     summary: Check if a number exists
 *     description: Check if the number exists in the database.
 *     parameters:
 *       - in: path
 *         name: no_penjualan
 *         required: true
 *         schema:
 *           type: string
 *         description: check.
 *     responses:
 *       200:
 *         description: Success response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *     
 */
router.get('/t_penjualan/check/:no_penjualan', checkNoPenjualan);

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
 *               no_penjualan:
 *                 type: integer
 *                 description: Unique Id the  inventory
 *               tgl_penjualan:
 *                 type: string
 *                 format: date
 *                 description: Date of the  inventory
 *               nama_barang:
 *                 type: string
 *                 description: Name of the item 
 *               qty:
 *                 type: integer
 *                 description: Quantity of items 
 *               harga:
 *                 type: integer
 *                 description: Price item
 *               subtotal:
 *                 type: integer
 *                 description: Total inventory
 *               keterangan:
 *                 type: string
 *                 description: Additional notes about the inventory
 *     responses:
 *       201:
 *         description: inventory created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/t_penjualan/', createInventory);

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
 *               no_penjualan:
 *                 type: integer
 *                 description: Unique Id the  inventory
 *               tgl_penjualan:
 *                 type: string
 *                 format: date
 *                 description: Date of the  inventory
 *               nama_barang:
 *                 type: string
 *                 description: Name of the item 
 *               qty:
 *                 type: integer
 *                 description: Quantity of items 
 *               harga:
 *                 type: integer
 *                 description: Price item
 *               subtotal:
 *                 type: integer
 *                 description: Total inventory
 *               keterangan:
 *                 type: string
 *                 description: Additional notes about the inventory
 *     responses:
 *       200:
 *         description: inventory updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: inventory not found
 */
router.patch('/t_penjualan/:id', updateInventory);

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
router.delete('/t_penjualan/:id', deleteInventory);

export default router;
