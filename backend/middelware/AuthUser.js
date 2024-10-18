import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Akses ditolak, tidak ada token." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Menyimpan data user ke dalam req.user
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token tidak valid." });
    }
};


export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }
    try {
        const user = await Users.findOne({
            where: { uuid: req.session.userId }
        });
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        req.user = {
            id: user.uuid,  
            role: user.role
        };
        console.log("UserId:", req.userId)
        next();
    } catch (error) {
        console.error("Error pada middleware verifyUser:", error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};
export const adminOnly = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda" });
    }
    const user = await Users.findOne({ 
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });
    req.user = {
        id: user.id,
        role: user.role
    };
    
    next();
};
