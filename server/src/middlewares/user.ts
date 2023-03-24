import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { Player } from "../models/Player";

export default async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token = "";

        if(req.route.path === "/me") {
            token = req.headers.cookie;
        } else {
            token = req.cookies.token;
        }

        // console.log("req===", req);

        if(!token) return next();

        const { email } : any = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email });
        const playerId = user['_id'];
        // console.log("playerId==", playerId);
        const player = await Player.findOne({ playerId });
        // console.log("player===", player);

        if(!user) throw new Error("Unauthenticated");

        // 유저 정보를 res.locals.user에 넣어주기
        res.locals.user = user;
        res.locals.player = player;
        // console.log("res.locals===", res.locals);
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Something went wrong" });
    }
}