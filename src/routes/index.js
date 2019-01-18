const path = require('path');

module.exports = (app, io) => {
  const healthController = require('../controllers/health');
  const notificationsController = require('../controllers/notifications')(io);

  app.get('/notifications-service/health', healthController.health);
  app.get('/notifications/:hash', notificationsController.get);
  app.post('/notifications/send', notificationsController.send);
  app.delete('/notifications/:id', notificationsController.remove);

};
