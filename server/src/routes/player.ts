import { Request, Response, Router } from "express";
import { Player } from "../models/Player";
import auth from "../middlewares/auth";
import user from "../middlewares/user";

const registerPlayer = async(req: Request, res: Response) => {
    try {
        const player = new Player(req.body);

        player.save((err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        })
    } catch(e) {
        console.log(e);
    }
}

const router = Router();
router.post("/registerPlayer", registerPlayer);
// router.post("/registerPlayer", user, auth, registerPlayer);

export default router;