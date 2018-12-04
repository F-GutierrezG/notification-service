'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notifications', {
    event: {
      allowNull: false,
      type: DataTypes.STRING
    },
    hash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    message: {
      allowNull: true,
      type: DataTypes.JSONB
    }
  }, {
    schema: 'notifications'
  });
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};
