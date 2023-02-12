import { Request, Response } from "express";
import { Player } from "../models/Player";

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