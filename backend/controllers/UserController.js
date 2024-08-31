import Penjualan from "../models/Usermodel.js";
import {Op} from "sequelize"


export const getPaginate = async(req,res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Penjualan.count({
        where: {
            [Op.or]: [{no_penjualan:{
                [Op.like]: '%'+search+'%'
        }}, {nama_barang: {
            [Op.like]: '%'+search+'%'
        }}]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Penjualan.findAll({
        where: {
            [Op.or]: [{no_penjualan:{
                [Op.like]: '%'+search+'%'
        }}, {nama_barang: {
            [Op.like]: '%'+search+'%'
        }}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    })
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    })
}


export const getInventory = async(req,res) =>{
    try{
        const response = await Penjualan.findAll();
        res.status(200).json(response);
    } catch(erorr){
        console.log(error.message);

    }
}



export const getInventoryById = async(req,res) =>{
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

export const checkNoPenjualan = async (req, res) => {
    const { no_penjualan } = req.params;
    try {
        const count = await Penjualan.count({
            where: {
                no_penjualan: no_penjualan
            }
        });
        const exists = count > 0;
        res.json({ exists });
    } catch (error) {
        console.log(error.message);
        
    }
};

export const createInventory = async(req,res) =>{
    try{
        await Penjualan.create(req.body);
        res.status(201).json({msg: "data created"});
    } catch(erorr){
        console.log(error.message);

    }
}

export const updateInventory = async(req,res) =>{
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

export const deleteInventory = async(req,res) =>{
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