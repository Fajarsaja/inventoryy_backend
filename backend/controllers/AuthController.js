import Users from "../models/UserModel.js";
import argon2 from "argon2"

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
            return res.status(401).json({ msg: "password salah" });
        }
        req.session.userId = user.uuid;
        const { uuid, name, email, role } = user;
        res.status(200).json({ uuid, name, email, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const Me = async(req,res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "mohon login ke akun anda"})
    }
    const user = await Users.findOne({
        attributes: ['uuid','name','email','role'],   
        where: {
            uuid: req.session.userId
        }
    });
    if(!user)  return res.status(404).json({msg: "user tidak ditemukan"})
        res.status(200).json(user)
}

export const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "tidak dapat logout"})
            res.status(200).json({msg: "anda telah logout"})
    })
}

