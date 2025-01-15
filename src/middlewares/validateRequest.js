module.exports = (req, res, next) => {
    const { user_id, message } = req.body;
    if (!user_id || !message) {
      return res.status(400).json({ error: 'user_id and message are required.' });
    }
    next();
  };
  