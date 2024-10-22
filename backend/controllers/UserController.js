import Users from "../models/UserModel.js"
import argon2 from "argon2"

export const getUsers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        // ( hanya admin yang dapat mengakses)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: "Forbidden: Anda tidak memiliki akses" });
        }

        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error pada getUsers:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const getUsersById = async(req, res) => {
    try{
        const response = await Users.findOne({
            attributes: ['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(erorr){
        res.status(500).json({msg: error.message});

    }
}
export const createUsers = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: "Semua field harus diisi" });
    }
    if (password !== confPassword) return res.status(400).json({msg: "password dan confirm password tidak cocok"})

    try {
        const hashedPassword = await argon2.hash(password);

        await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });

        res.status(201).json({ msg: "User berhasil dibuat" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};
export const updateUsers =async(req, res) => {
    try{
        const user = await Users.findOne({ 
            where: {
                uuid: req.params.id
            }
        });
        if(!user)  return res.status(404).json({msg: "user tidak ditemukan"})
        const {name, email, password, confPassword, role} = req.body;
        let hashPassword
        if(password === "" || password === null){
            hashPassword = user.password
        } else{
            hashPassword = await argon2.hash(password)
        }
        if (password !== confPassword) return res.status(400).json({msg: "password dan confirm password tidak cocok"})
            try {
                await user.update({
                    name: name,
                    email: email,
                    password: hashPassword,
                    role: role
                },{
                    where: {
                        id: user.id
                    }
                });
                res.status(200).json({msg: "user updated"})
            } catch (error) {
                res.status(400).json({msg: error.message}); 
            }
    } catch(erorr){
        res.status(500).json({msg: error.message});

    }

}
export const deleteUsers = async (req, res) => {
    const uuid = req.params.id;  
    try {
        const user = await Users.findOne({
            where: {
                uuid: uuid
            }
        });
        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }
        await Users.destroy({
            where: {
                uuid: uuid 
            }
        });
        res.status(200).json({ msg: "User berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

