import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// Middleware untuk memverifikasi token JWT
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Akses ditolak, token tidak ditemukan' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ msg: 'Token tidak valid' });
        req.user = decoded; // Pastikan ini memiliki struktur seperti { id: 'user-id', role: 'user-role', ... }
        next();
    });
    
};

// Middleware untuk memverifikasi pengguna yang diizinkan mengakses resource tertentu
export const verifyUser = async (req, res, next) => {
    try {
        // Periksa apakah req.user ada
        if (!req.user || !req.user.uuid) {
            return res.status(401).json({ msg: "Autentikasi tidak valid, userId tidak ditemukan" });
        }

        // Cari user berdasarkan UUID dari token yang didecode
        const user = await Users.findOne({
            where: {
                uuid: req.user.uuid // Gunakan uuid dari payload
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
        }

        // Set data pengguna di request
        req.role = user.role;
        req.userId = user.id;

        next();
    } catch (error) {
        console.error("Error pada verifyUser:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};


export const adminOnly = async (req, res, next) => {
    // Ambil token dari header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await Users.findOne({ 
            where: {
                uuid: decoded.uuid
            }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });

        req.user = {
            id: user.id,
            role: user.role
        };
        
        next();
    } catch (error) {
        res.status(403).json({ msg: "Token tidak valid atau telah kedaluwarsa" });
    }
};
