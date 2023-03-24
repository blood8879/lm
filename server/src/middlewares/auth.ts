import { Request, Response, NextFunction } from "express"
import { Player } from "../models/Player";
import { User } from "../models/User";


export default async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user: typeof User | undefined = res.locals.user;
        const player: typeof Player | undefined = res.locals.player;

        if(!user) throw new Error("Unauthenticated");

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Unauthenticated" });
    }
};