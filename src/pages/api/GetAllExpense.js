import connectMongo from "../../../database/conn"
import { Expense } from "../../../model/Schema"

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'GET') {

        const checkExisting = await Expense.find()
        if (checkExisting) {
            res.status(201).json({data: checkExisting})
        }
        else {
            res.status(201).json({ status: true, data: "Not Found" })

        }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }
}

