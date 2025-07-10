const cron = require('node-cron');
const User = require('../models/User'); // Mongoose User model

cron.schedule('0 0 * * *', async () => { // ⏰ Daily at midnight
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const usersToDelete = await User.find({
      deleted: true,
      deletedAt: { $lt: sevenDaysAgo }
    });

    for (const user of usersToDelete) {
      await user.deleteOne(); // Hard delete from MongoDB
      console.log(`Deleted user: ${user._id}`);
    }
  } catch (err) {
    console.error('Cron Job Error:', err.message);
  }
});
