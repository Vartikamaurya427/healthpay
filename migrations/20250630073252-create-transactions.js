'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      fromUserId: { type: Sequelize.INTEGER, allowNull: false },
      toUserEmail:{ type: Sequelize.STRING,  allowNull: false },
      amount:     { type: Sequelize.FLOAT,   allowNull: false },
      type:       { type: Sequelize.ENUM('send','receive','topup','request'), allowNull:false },
      status:     { type: Sequelize.ENUM('pending','success','failed'), defaultValue:'pending' },
      transactionId: Sequelize.STRING,
      referenceId:   Sequelize.STRING,
      note:          Sequelize.STRING,
      createdAt:     { type: Sequelize.DATE, allowNull:false },
      updatedAt:     { type: Sequelize.DATE, allowNull:false }
    });

    await queryInterface.addIndex('Transactions', ['fromUserId']);
    await queryInterface.addIndex('Transactions', ['fromUserId','type']);
    await queryInterface.addIndex('Transactions', ['fromUserId', 'createdAt']);

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Transactions');
  }
};
