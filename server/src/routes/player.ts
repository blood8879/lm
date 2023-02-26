import { Request, Response, Router } from "express";
import { Player } from "../models/Player";
import auth from "../middlewares/auth";
import user from "../middlewares/user";
import { stringify } from "querystring";
import { objectToString } from "../api/utils";
import { User } from "../models/User";

const registerPlayer = async(req: Request, res: Response) => {
    try {
        const player = new Player(req.body);
        player._id = req.body.userId;

        player.save((err, doc) => {
            User.findOneAndUpdate(
                { _id: player._id },
                { $set: { playerId: req.body.userId }},
                { new: true },
                (err) => {

                }
            )
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        })
    } catch(e) {
        console.log(e);
    }
}

const getPlayerById = async(req: Request, res: Response) => {
    // const playerId = stringify(req.params).split("=")[1];
    const playerId = objectToString(req.params);

    console.log("parmas",req.params)

    await Player.findById(playerId)
        .exec((err, player) => {
        if(err) res.status(400).send(err);
        res.status(200).send(player);
    });
    
}

const router = Router();
router.post("/registerPlayer", registerPlayer);
router.get("/:id", getPlayerById);
// router.post("/registerPlayer", user, auth, registerPlayer);

export default router;