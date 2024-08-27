import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Penjualan = db.define('t_penjualan', {
    no_penjualan: DataTypes.STRING,
    tgl_penjualan: DataTypes.DATE,
    nama_barang: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
},{
    freezeTableName:true
});

export default Penjualan;

(async()=>{
    await db.sync();
})();