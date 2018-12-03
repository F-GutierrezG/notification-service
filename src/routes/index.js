module.exports = (app, io) => {
  const healthController = require('../controllers/health');
  const notificationsController = require('../controllers/notifications')(io);

  app.get('/notifications-service/health', healthController.health);
  app.post('/notifications/send', notificationsController.send);

  app.get('/notifications/:hash', notificationsController.get);

  app.delete('/notifications/:hash/:id', notificationsController.remove);
};
