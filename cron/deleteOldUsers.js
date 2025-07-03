const cron = require('node-cron');
const { User } = require('../models');
const { Op } = require('sequelize');
cron.schedule('0 0 * * *', async () => {  // Runs every day at midnight
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const usersToDelete = await User.findAll({
    where: {
      deleted: true,
      deletedAt: { [Op.lt]: sevenDaysAgo }
    }
  });
  for (const user of usersToDelete) {
    await user.destroy(); // Hard delete from DB
    console.log(`Deleted user: ${user.id}`);
  }
});
