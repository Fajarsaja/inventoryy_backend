import Penjualan from "../models/Usermodel.js";

export const getUsers = async(req,res) =>{
    try{
        const response = await Penjualan.findAll();
        res.status(200).json(response)
    } catch(erorr){
        console.log(error.message);

    }
}

export const getUsersById = async(req,res) =>{
    try{
        const response = await Penjualan.findOne({
            where:{
                 id: req.params.id
            }
        });
        res.status(200).json(response)
    } catch(erorr){
        console.log(error.message);

    }
}

export const createUser = async(req,res) =>{
    try{
        await Penjualan.create(req.body);
        res.status(201).json({msg: "data created"});
    } catch(erorr){
        console.log(error.message);

    }
}

export const updateUser = async(req,res) =>{
    try{
        await Penjualan.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "data updated"});
    } catch(erorr){
        console.log(error.message);

    }
}

export const deleteUser = async(req,res) =>{
    try{
        await Penjualan.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "data deleted"});
    } catch(erorr){
        console.log(error.message);

    }
}