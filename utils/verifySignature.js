import crypto from 'crypto';
// ✅ Verify signature how can i use this in middleware
// example:
// export default authMiddleware(handler);
 
const verifySignature = (req) => {
  const signature = req.headers['x-signature'];
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET).update(payload).digest('hex');
  return signature === hmac;
};

export default verifySignature;
