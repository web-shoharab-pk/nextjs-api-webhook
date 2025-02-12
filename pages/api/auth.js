import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';
import { loginSchema } from '../../utils/validators';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') return res.status(405).json({ success: false, status: 405, message: 'Method not allowed' });

  const { error } = loginSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  });
  if (error) return res.status(400).json({ success: false, status: 400, message: 'validation error', errors: error.details.map((detail) => detail.message), hints: 'Please check the data you are sending' });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, status: 401, message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ success: false, status: 401, message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return res.status(200).json({ success: true, status: 200, message: 'Login successful', data: { token, user: { id: user._id, name: user.name, email } } });
}
