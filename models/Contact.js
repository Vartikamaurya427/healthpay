
// models/contact.js

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    profileImage: {
      type: DataTypes.STRING
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'Contacts'
  });

  // Association with User (optional if needed)
  Contact.associate = (models) => {
    Contact.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Contact;
};
