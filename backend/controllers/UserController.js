import Penjualan from "../models/Usermodel.js";

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