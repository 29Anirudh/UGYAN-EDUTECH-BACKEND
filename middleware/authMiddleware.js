const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Access denied' });

  const token = authHeader.split(' ')[1]; // Remove "Bearer "
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.id; // ✅ just store the id
    next();
  } catch {
    res.status(400).json({ error: 'Invalid token' });
  }
};
