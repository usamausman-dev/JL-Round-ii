import connectMongo from "../../../database/conn";
import { Expense } from "../../../model/Schema";



export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === "POST") {
      const { userEmail, expenseCategory } = req.body;

      if (!userEmail || !expenseCategory) {
        return res.status(400).json({ error: "User ID or expenseCategory parameter is missing" });
      }

      const expenses = await Expense.find({ userEmail, expenseCategory });

      return res.status(200).json({ data: expenses });
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
