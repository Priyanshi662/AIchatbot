exports.tokenval = 
(req, res) => res.status(200).json({
    username: req.user.username
  });
