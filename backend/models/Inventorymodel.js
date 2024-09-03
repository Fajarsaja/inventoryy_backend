import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js"


const {DataTypes} = Sequelize;

const Penjualan = db.define('t_penjualan', {
   
    no_penjualan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    tgl_penjualan: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    nama_barang: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.UUID, 
        allowNull: false,
        validate: {
            notEmpty: true,
        },

    }


},{
        freezeTableName:true
});

Users.hasMany(Penjualan)
Penjualan.belongsTo(Users, {foreignKey: 'userId'})

export default Penjualan;



