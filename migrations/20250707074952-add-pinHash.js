module.exports = {
  async up(q, S) {
    await q.addColumn("Users", "pinHash", { type: S.STRING(60), allowNull: true });
  },
  async down(q) {
    await q.removeColumn("Users", "pinHash");
  }
};
