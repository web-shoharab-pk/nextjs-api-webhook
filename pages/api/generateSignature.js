import authMiddleware from "@/middleware/authMiddleware";
import { generateSignatureSchema } from "@/utils/validators";
import crypto from "crypto";

function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, status: 405, message: "Method Not Allowed" });
  }

  try {
    const { error } = generateSignatureSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });
    if (error) return res.status(400).json({ success: false, status: 400, message: "validation error", errors: error.details.map((detail) => detail.message), hints: "Please check the data you are sending" });
    const { payload } = req.body; // Expecting JSON payload
    if (!payload) {
      return res.status(400).json({ success: false, status: 400, message: "Payload is required" });
    }

    // Convert payload to a string
    const payloadString = JSON.stringify(payload);

    // Generate HMAC-SHA256 signature
    const signature = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET).update(payloadString).digest("hex");

    return res.status(200).json({ signature });
  } catch (error) {
    return res.status(500).json({ success: false, status: 500, message: "Internal Server Error" });
  }
}

export default authMiddleware(handler);
