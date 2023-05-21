import connectMongo from "../../../database/conn"
import { Expense } from "../../../model/Schema"

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection failed" }))

    if (req.method === 'POST') {
        if (!req.body) return res.status(404).json({ error: 'Dont Have form Data' })
        const { userEmail } = req.body
        const checkExisting = await Expense.find({}, {userEmail});
        return res.json({data : checkExisting})
        // checkExisting.find()
        
        // if (checkExisting) {
        //     res.status(201).json({ status: true, data: checkExisting })
        // }
        // else {
        //     res.status(201).json({ status: true, data: "Not Found" })
        // }
    }

    else {
        res.status(500).json({ message: "HTTP Method not valid only POST Accepted" })
    }
}







// create a nextjs api that will search all expense of the userAgent, and from this filter out the data category wise