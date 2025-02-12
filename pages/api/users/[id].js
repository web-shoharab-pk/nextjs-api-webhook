import authMiddleware from '@/middleware/authMiddleware';
import mongoose from 'mongoose';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, status: 400, message: 'Invalid user ID' });
  }

  if (req.method === 'GET') {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ success: false, status: 404, message: 'User not found' });

    return res.status(200).json({ success: true, status: 200, message: 'User fetched successfully', data: user });
  }

  return res.status(405).json({ success: false, status: 405, message: 'Method not allowed' });
}

export default authMiddleware(handler);
