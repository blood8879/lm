import { Request, Response, Router } from "express";
import { Player } from "../models/Player";
import auth from "../middlewares/auth";
import user from "../middlewares/user";
import { stringify } from "querystring";
import { objectToString } from "../api/utils";
import { User } from "../models/User";
import { Fixture } from "../models/Fixture";

const mongoose = require('mongoose');

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

// 선수 상세페이지(출전기록/골/어시)
const getPlayerStatsByTeam = async(req: Request, res: Response) => {
    const teamId = objectToString(req.params);
    const { playerId } = req.query;

    await Fixture.aggregate([
        {
            $match: {
                $and: [
                    {
                        $or: [
                            { $and: [
                                { homeTeam: mongoose.Types.ObjectId(teamId) },
                                { [`homePlayerGoals.${playerId}`]: { $exists: true } }
                            ]},
                            { $and: [
                                { homeTeam: mongoose.Types.ObjectId(teamId) },
                                { [`homePlayerAssists.${playerId}`]: { $exists: true } }
                            ]},
                            { $and: [
                                { awayTeam: mongoose.Types.ObjectId(teamId) },
                                { [`awayPlayerGoals.${playerId}`]: { $exists: true } }
                            ]},
                            { $and: [
                                { awayTeam: mongoose.Types.ObjectId(teamId) },
                                { [`awayPlayerAssists.${playerId}`]: { $exists: true } }
                            ]},
                            { $and: [
                                { homeTeam: mongoose.Types.ObjectId(teamId) },
                                { homeSquad: mongoose.Types.ObjectId(playerId) },
                                { isFinish: true }
                            ]},
                            { $and: [
                                { awayTeam: mongoose.Types.ObjectId(teamId) },
                                { awaySquad: mongoose.Types.ObjectId(playerId) },
                                { isFinish: true }
                            ]},
                        ]
                    }
                ],
            }
        },
        {
            $group: {
                // _id: playerId,
                _id: {
                    playerId: playerId,
                    teamId: teamId
                },
                totalCaps: {
                    $sum : 1
                },
                homeGoals: {
                    $sum: {
                        $add: [
                            { $ifNull: [`$homePlayerGoals.${playerId}`, 0] },
                        ]
                    }
                },
                awayGoals: {
                    $sum: {
                        $add: [
                            { $ifNull: [`$awayPlayerGoals.${playerId}`, 0]}
                        ]
                    }
                },
                homeAssists: {
                    $sum: {
                        $add: [
                            { $ifNull: [`$homePlayerAssists.${playerId}`, 0] },
                        ]
                    }
                },
                awayAssists: {
                    $sum: {
                        $add: [
                            { $ifNull: [`$awayPlayerAssists.${playerId}`, 0]}
                        ]
                    }
                },
                totalGoals: {
                    $sum: {
                        $add: [
                            { $ifNull: [`$homePlayerGoals.${playerId}`, 0] },
                            { $ifNull: [`$awayPlayerGoals.${playerId}`, 0] },
                        ]
                    }
                },
                totalAssists: {
                    $sum: {
                        $add: [
                            { $ifNull: [`$homePlayerAssists.${playerId}`, 0] },
                            { $ifNull: [`$awayPlayerAssists.${playerId}`, 0] },
                        ]
                    }
                }
            }
        }
    ]).exec((err, stats) => {
        // console.log("gg=",goals)
        if(err) res.status(400).send(err);
        res.status(200).send(stats);
    });
}

const router = Router();
router.post("/registerPlayer", registerPlayer);
router.get("/:id", getPlayerById);
router.get("/:id/detail", getPlayerStatsByTeam);
// router.post("/registerPlayer", user, auth, registerPlayer);

export default router;