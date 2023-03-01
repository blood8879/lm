import { Request, Response, Router } from "express";
import { Fixture } from "../models/Fixture";

const registerFixture = async(req: Request, res: Response) => {
    try {
        const fixture = new Fixture(req.body);
    } catch(e) {
        console.log(e);
    }
}

// const registerPlayer = async(req: Request, res: Response) => {
//     try {
//         const player = new Player(req.body);
//         player._id = req.body.userId;

//         player.save((err, doc) => {
//             User.findOneAndUpdate(
//                 { _id: player._id },
//                 { $set: { playerId: req.body.userId }},
//                 { new: true },
//                 (err) => {

//                 }
//             )
//             if(err) return res.json({ success: false, err });
//             return res.status(200).json({
//                 success: true
//             });
//         })
//     } catch(e) {
//         console.log(e);
//     }
// }

const router = Router();

export default router;