import authMiddleware from '@/middleware/authMiddleware';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import { userSchema } from '../../../utils/validators';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const users = await User.find().select('-password');
    return res.status(200).json({
      status: 200,
      message: 'Users fetched successfully',
      data: users,
    });
  }

  if (req.method === 'POST') {
    const { error } = userSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true, // Allow unknown fields in input
      stripUnknown: true  // But strip them from the validated result
    });

    if (error) return res.status(400).json({ success: false, status: 400, message: 'validation error', errors: error.details.map((detail) => detail.message), hints: 'Please check the data you are sending' });

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return res.status(201).json({ success: true, status: 201, message: 'User created successfully', data: { id: user._id, name, email } });
    } catch (error) {
      return res.status(400).json({ success: false, status: 400, message: 'User already exists' });
    }
  }

  return res.status(405).json({ success: false, status: 405, message: 'Method not allowed' });
}
// ✅ Apply middleware only to GET requests
export default function protectedHandler(req, res) {
  if (req.method === "GET") {
    return authMiddleware(handler)(req, res);
  }
  return handler(req, res);
}