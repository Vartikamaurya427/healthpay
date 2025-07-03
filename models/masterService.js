module.exports = (sequelize, DataTypes) => {
  const MasterService = sequelize.define('MasterService', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true // e.g., "OTT", "Utility", etc.
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'MasterServices'
  });

  return MasterService;
};
