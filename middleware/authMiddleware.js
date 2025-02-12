import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, status: 401, message: 'Unauthorized' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ success: false, status: 401, message: 'Invalid Token' });
  }
};

export default authMiddleware;
