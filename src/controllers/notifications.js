const Notification = require('../models').notifications

module.exports = (io) => {
  return {
    send(req, res) {
      const { hash, message } = req.body;

      Notification
        .create({ hash, message })
        .then(notification => {
          io.to(hash).emit('notification', notification);
          console.log('Emited to', hash)
          res.sendStatus(200);
        });
    },

    get(req, res) {
      const hash = req.params.hash;

      Notification
        .findAll({
          where: { hash }
        })
        .then(notifications => {
          res.send(notifications);
        });
    },

    remove(req, res) {
      const hash = req.params.hash;
      const id = req.params.id;

      Notification
        .destroy({
          where: { id, hash }
        })
        .then(() => {
          res.sendStatus(204);
        });
    }
  };
};
