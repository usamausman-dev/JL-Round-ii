import connectMongo from "../../../database/conn";
import { UserProfile } from "../../../model/Schema";


export default async function handler(req, res) {
    try {
        await connectMongo();

        if (req.method === "POST") {
            const { name, email } = req.body;

            if (!name || !email) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const User = await UserProfile.create({ name, email });

            res.status(201).json({ User });
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}









