// migrations/YYYYMMDDHHMMSS-add-txn-indexes.js
'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.addIndex('Transactions', {
      name: 'idx_user_createdAt',
      fields: ['fromUserId', 'createdAt'],
      using: 'BTREE'
    });
    await qi.addIndex('Transactions', {
      name: 'idx_user_type_createdAt',
      fields: ['fromUserId', 'type', 'createdAt'],
      using: 'BTREE'
    });
  },
  down: async (qi) => {
    await qi.removeIndex('Transactions', 'idx_user_createdAt');
    await qi.removeIndex('Transactions', 'idx_user_type_createdAt');
  }
};
