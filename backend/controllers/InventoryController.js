import Penjualan from "../models/Inventorymodel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getPaginate = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const isAdmin = req.user.role === "admin";

        const whereClause = {
            [Op.or]: [
                { no_penjualan: { [Op.like]: `%${search}%` } },
                { nama_barang: { [Op.like]: `%${search}%` } }
            ]
        };
        if (!isAdmin) {
            whereClause.userId = req.user.uuid; // gunakan req.user.uuid yang disimpan dari JWT
        }
        const totalRows = await Penjualan.count({
            where: whereClause
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Penjualan.findAll({
            where: whereClause,
            include: [{
                model: Users,
                attributes: ['name', 'role']
            }],
            offset: offset,
            limit: limit,
            order: [['id', 'DESC']],
            attributes: { exclude: ['userId'] }
        });
        res.json({
            result,
            page,
            limit,
            totalRows,
            totalPage
        });
    } catch (error) {
        console.error("Error pada getPaginate:", error.message);
        res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
    }
};


export const getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, userId } = req;

        const queryOptions = {
            where: { id }
        };

        if (role === "user") {
            queryOptions.where.userId = userId;
        }

        const response = await Penjualan.findOne({
            ...queryOptions,
            attributes: { exclude: ['userId', 'uuid'] }  
        });

        if (!response) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error pada getInventoryById:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export const checkNoPenjualan = async (req, res) => {
    const { no_penjualan } = req.params;
    try {
        const count = await Penjualan.count({
            where: {
                no_penjualan: no_penjualan
            }
        });
        const exists = count > 0;
        res.status(200).json({ exists });
    } catch (error) {
        console.error("Error pada checkNoPenjualan:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server saat memeriksa no_penjualan" });
    }
};

export const createInventory = async (req, res) => {
    try {
       
        const userId = req.user.uuid;
        const { no_penjualan, tgl_penjualan, nama_barang, qty, harga, subtotal, keterangan } = req.body;

        if (!no_penjualan || !tgl_penjualan || !nama_barang || !qty || !harga || !subtotal || !keterangan) {
            return res.status(400).json({ msg: "Semua field harus diisi" });
        }

        if (!userId) {
            return res.status(401).json({ msg: "Autentikasi tidak valid, userId tidak ditemukan" });
        }

        await Penjualan.create({
            no_penjualan,
            tgl_penjualan,
            nama_barang,
            qty,
            harga,
            subtotal,
            keterangan,
            userId 
        });

        res.status(201).json({ msg: "Data berhasil dibuat" });
    } catch (error) {
        console.error("Error pada createInventory:", error.message);
        console.error("Detail Error:", error); // Tambahkan ini untuk mendapatkan detail lengkap error
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};



export const updateInventory = async (req, res) => {
    try {
        const userRole = req.role; 
        const userId = req.session.userId; 
        const inventory = await Penjualan.findOne({
            where: {
                id: req.params.id,
                ...(userRole !== 'admin' && { userId: userId }) 
            }
        });
        if (!inventory) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }
        await inventory.update(req.body);
        res.status(200).json({ msg: "Data berhasil diperbarui" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};



export const deleteInventory = async (req, res) => {
    try {
        const inventory = await Penjualan.findOne({
            where: {
                id: req.params.id,
                ...(req.role !== 'admin' && { userId: req.session.userId }) 
            }
        });
        if (!inventory) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await inventory.destroy();
        res.status(200).json({ msg: "Data berhasil dihapus" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export const getNewNoPenjualan = async (req, res) => {
    try {
        const maxNoPenjualan = await Penjualan.max('no_penjualan');
        const newNoPenjualan = maxNoPenjualan ? maxNoPenjualan + 1 : 1;

        const formattedNoPenjualan = String(newNoPenjualan).padStart(4, '0');

        res.status(200).json({ newNoPenjualan: formattedNoPenjualan });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
