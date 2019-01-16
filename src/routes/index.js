const path = require('path');

module.exports = (app, io) => {
  const healthController = require('../controllers/health');
  const notificationsController = require('../controllers/notifications')(io);

  app.get('/notifications-service/health', healthController.health);
  app.post('/notifications/send', notificationsController.send);
  app.get('/notifications-service/test', (req, res) => {
    res.sendFile(path.join(__dirname+'/../tests/index.html'));
  });

  app.get('/notifications/:hash', notificationsController.get);

  app.delete('/notifications/:id', notificationsController.remove);

};
