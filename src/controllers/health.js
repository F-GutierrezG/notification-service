module.exports = {
  health(req, res) {
    res.send({
      message: 'healthy'
    });
  }
};
