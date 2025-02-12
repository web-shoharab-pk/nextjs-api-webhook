import fs from 'fs';
import verifySignature from '../../utils/verifySignature';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, status: 405, message: 'Method not allowed' });

  if (!verifySignature(req)) return res.status(403).json({ success: false, status: 403, message: 'Invalid signature' });

  fs.writeFileSync('db.json', JSON.stringify(req.body, null, 2));
  return res.status(200).json({ success: true, status: 200, message: 'Received' });
}
