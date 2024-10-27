'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('t_penjualan', 'uuid', {
      type: DataTypes.UUID,
      allowNull: false, // Ubah sesuai kebutuhan
    });
  },


};

