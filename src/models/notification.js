'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notifications', {
    hash: {
      allowNull: false,
      type: DataTypes.STRING
    },
    message: {
      allowNull: true,
      type: DataTypes.TEXT
    }
  }, {
    schema: 'notifications'
  });
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};
