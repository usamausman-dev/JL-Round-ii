import connectMongo from "../../../database/conn";
import { UserProfile } from "../../../model/Schema";


export default async function handler(req, res) {
    try {
        await connectMongo();

        if (req.method === 'POST') {
            const { email, salary } = req.body;

            const user = await UserProfile.findOneAndUpdate(
                { email },
                { $set: { salary } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ success: false, message: 'User profile not found' });
            }
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}









