const Notification = require('../models').notifications

module.exports = (io) => {
  return {
    send(req, res) {
      const { event, hashes, message } = req.body;

      console.log(req.body);

      hashes.forEach(hash => {
        Notification
          .create({ event, hash, message })
          .then(notification => {
            io.to(hash).emit(event, notification);
            console.log('Emited', event, 'to', hash, ':', message)
          });
      });
      res.sendStatus(200);
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
