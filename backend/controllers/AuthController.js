import Users from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        const match = await argon2.verify(user.password, req.body.password);
        if (!match) {
            return res.status(401).json({ msg: "Password salah" });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { uuid: user.uuid, name: user.name, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { uuid: user.uuid, name: user.name, email: user.email, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Save refresh token 
        req.session.refreshToken = refreshToken;

       
        res.status(200).json({ 
            msg: "Login berhasil",
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const Me = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda" });
        }

        // Verifikasi token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ msg: "Token tidak valid login kembali" });

            // Ambil user berdasarkan uuid dari token
            const user = await Users.findOne({
                attributes: ['uuid', 'name', 'email', 'role'],
                where: {
                    uuid: decoded.uuid
                }
            });

            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

            res.status(200).json(user);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const LogOut = (req, res) => {
    // Hapus sesi yang menyimpan refresh token
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });

        res.status(200).json({ msg: "Anda telah logout" });
    });
};

