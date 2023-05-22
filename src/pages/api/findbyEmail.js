import connectMongo from "../../../database/conn";
import { UserProfile } from "../../../model/Schema";

export default async function handler(req, res) {
    try {
        // Connect to MongoDB
        await connectMongo();

        if (req.method === "POST") {
            if (!req.body) {
                return res.status(400).json({ error: "No form data provided" });
            }

            const { email } = req.body;

            if (!isValidEmail(email)) {
                return res.status(400).json({ error: "Invalid email address" });
            }

            const checkExisting = await UserProfile.findOne({ email });

            if (checkExisting) {
                return res.status(200).json({ status: true, data: checkExisting });
            } else {
                return res.status(404).json({ status: false, data: "Not Found" });
            }
        } else {
            return res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
