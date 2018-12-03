const Notification = require('../models').Notification

module.exports = (io) => {
  return {
    send(req, res) {
      const { hash, message } = req.body;

      io.to(hash).emit('timer', message);
      console.log('Emited to', hash)
      res.sendStatus(200);
    },

    get(req, res) {
      const hash = req.params.hash;

      console.log('Getting notifications', hash);

      res.send([{
        "id": 1,
        "message": "hola"
      }, {
        "id": 2,
        "message": "chao"
      }]);
    }
  };
};
