import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import { Team } from "../models/Team";
import auth from "../middlewares/auth";
import user from "../middlewares/user";
import { stringify } from "querystring";
import { objectToString } from "../api/utils";
import { Squad } from "../models/Squad";
import { Stadium } from "../models/Stadium";
import { Fixture } from "../models/Fixture";
import { Player } from "../models/Player";


const mongoose = require('mongoose');

// server단에서 multer를 이용한 이미지 업로드와 client 단에서 register request보낼 때 Date.now() 시간 차이가 발생하여 
// db적재시 시간 통일을 위한 가변수 설정.
let filenameForRegtister = "";

const getTeamLists = async(req: Request, res: Response) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    await Team.find()
        .exec((err, teams) => {
            if(err) res.status(400).send(err);
            res.status(200).json({ teams });
        })
}

const getTeambyId = async(req: Request, res: Response) => {
    // const teamId = stringify(req.params).split("=")[1];
    const teamId = objectToString(req.params);
    // console.log("teamId==", teamId);
    
    
    // await Team.findOne({ _id: teamId })
    //     .exec((err, team) => {
    //         if(err) res.status(400).send(err);
    //         console.log("team===", team);
    //         res.status(200).send(team);
    //     })

    await Team.findById(teamId).exec((err, team) => {
        if(err) res.status(400).send(err);
        // console.log("team===", team);
        res.status(200).send(team);
    });
}

const getSquadbyTeam = async(req: Request, res: Response) => {
    const teamId = objectToString(req.params);
    // const { searchType } = req.query;

    await Squad.find({ teamId: teamId })
        .populate('userId')
        .exec((err, squad) => {
        if(err) res.status(400).send(err);
        res.status(200).send(squad);
        });

    // if(searchType==="official") {
    //     await Squad.find({ teamId: teamId, confirmed: true })
    //     .populate('userId')
    //     .exec((err, squad) => {
    //     if(err) res.status(400).send(err);
    //     res.status(200).send(squad);
    //     });
    // } else if(searchType==="unofficial") {
    //     await Squad.find({ teamId: teamId })
    //     .populate('userId')
    //     .exec((err, squad) => {
    //         if(err) res.status(400).send(err);
    //         res.status(200).send(squad);
    //     })
    // }
}

// 팀등록
const registerTeam = async(req: Request, res: Response) => {
    const { name, emblem, description, published } = req.body;

    try {
        // 이미 등록된 팀일경우 팀명 뒤에 "A", "B", "C" 등 알파벳 붙여주는 것으로 로직 짜야함.
        const team = new Team(req.body);
        team.emblem = filenameForRegtister;

        team.save((err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
        filenameForRegtister = "";
    } catch(e) {
        console.log(e);
    }
}

// 팀 가입신청
const joinTeam = async(req: Request, res: Response) => {
    const squad = new Squad(req.body);

    try {
        squad.save((err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true, doc
            })
        })    
    } catch(e) {
        console.log(e);
    }
}

const emblemUpload = multer({
    storage: multer.diskStorage({
        destination: "public/emblem",
        filename: (req: Request, file, callback) => {
            const filename = `${Date.now()}_${file.originalname}`;
            filenameForRegtister = filename;
            callback(null, filename);
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            callback(null, true);
        } else {
            callback(new Error(`This File : ${filenameForRegtister} is not image Files.`))
        }
    }
});

// 팀 입단 승인
const givePermissionToPlayer = async(req: Request, res: Response) => {
    const { id, backNo, confirmed, teamId, userId } = req.body;
    console.log("req.body===", req.body);

    await Squad.findByIdAndUpdate(id, {
        backNo: backNo,
        confirmed: confirmed
    }).exec((err, squad) => {
        if(err) res.status(400).send(err);
        res.status(200).send(squad);
    })

    // 팀 가입되면 유저정보에 가입팀 리스트에 넣어줌.
    // await Player.findByIdAndUpdate(userId, {

    // })
}

// 경기장 등록
const registerStadium = (req: Request, res: Response) => {
    try {
        const stadium = new Stadium(req.body);

        stadium.save((err, stadium) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true, stadium
            })
        })
    } catch(e) {
        console.log(e);
    }
}

// 경기장 목록 가져오기
const getStadium = async(req: Request, res: Response) => {
    const teamId = objectToString(req.params);

    try {
        await Stadium.find({ team: teamId })
            .exec((err, stadium) => {
                if(err) return res.status(400).send(err);
                res.status(200).send(stadium);
            })
    } catch (e) {
        console.log(e);
    }
}

// 팀원 출장정보, 골, 어시 가져오기
const getPlayerStats = async(req: Request, res: Response) => {
    const teamId = objectToString(req.params);

    await Fixture.aggregate([
        {
            $match: {
                $or: [
                    { $and: [
                        { homeTeam: mongoose.Types.ObjectId(teamId) },
                        { homeSquad: { $exists: true, $not: { $size: 0 } } }
                    ]},
                    { $and: [
                        { awayTeam: mongoose.Types.ObjectId(teamId) },
                        { awaySquad: { $exists: true, $not: { $size: 0 } } }
                    ]}
                ]
            }
        },
        // 홈팀일 경우 homeSquad를 teamSquad필드에 할당, 반대일 경우 awaySquad필드에 할당 , $cond == if문
        {
            $addFields: {
                teamSquad: {
                    $cond: {
                        if: { $eq: [ "$homeTeam", mongoose.Types.ObjectId(teamId) ] },
                        then: "$homeSquad",
                        else: "$awaySquad"
                    }
                }
            }
        },
        {
            $addFields: {
                playerGoals: {
                    $objectToArray: {
                        $cond: {
                            if: { $eq: [ "$homeTeam", mongoose.Types.ObjectId(teamId) ] },
                            then: "$homePlayerGoals",
                            else: "$awayPlayerGoals"
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                playerAssists: {
                    $objectToArray: {
                        $cond: {
                            if: { $eq: [ "$homeTeam", mongoose.Types.ObjectId(teamId) ] },
                            then: "$homePlayerAssists",
                            else: "$awayPlayerAssists"
                        }
                    }
                }
            }
        },
        {
            $addFields: {
                isCleanSheet: {
                    $cond: {
                        if: {
                            $or: [
                                { $and: [
                                    { $eq: [ "$homeTeam", mongoose.Types.ObjectId(teamId) ] },
                                    { $eq: [ "$away_goals", 0 ] }
                                ]},
                                {
                                    $and: [
                                        { $eq: [ "$awayTeam", mongoose.Types.ObjectId(teamId) ] },
                                        { $eq: [ "$home_goals", 0 ] }
                                    ]
                                }
                            ]
                        },
                        then: 1,
                        else: null
                    }
                }
            }
        },
        {
            // 두개 이상의 배열을 $unwind할 경우 $count, $sum 집계시 문제가 생겨 그룹별로 $unwind하기 위해 $facet 함수 사용.
            $facet: {
                "totalCaps": [
                    { $unwind: "$teamSquad" },
                    { $group: { _id: "$teamSquad", totalCaps: { $sum: 1 } } }
                ],
                "totalGoals": [
                    { $unwind: "$playerGoals" },
                    { $group: { _id: "$playerGoals.k", totalGoals: { $sum: "$playerGoals.v" } } }
                ],
                "totalAssists": [
                    { $unwind: "$playerAssists" },
                    { $group: { _id: "$playerAssists.k", totalAssists: { $sum: "$playerAssists.v" } } }
                ],
                "cleanSheets": [
                    { $unwind: "$teamSquad" },
                    { $group: { _id: "$teamSquad", cleanSheets: { $sum: "$isCleanSheet" } } }
                ]
            }
        }
    ]).exec((err, stats) => {
        if(err) res.status(400).send(err);
        res.status(200).send(stats);
    })
}

const router = Router();
router.get("/", getTeamLists);
router.get("/:id", getTeambyId);
router.get("/:id/squad", getSquadbyTeam);
router.post("/registerTeam", user, auth, registerTeam);
router.post("/registerTeam/emblemUpload", user, auth, emblemUpload.single('file'));
router.post("/:id/join", joinTeam);
router.put("/updatePermissions", givePermissionToPlayer);
router.post("/registerStadium", registerStadium);
router.get("/:id/getStadium", getStadium);
router.get("/:id/stats", getPlayerStats)

export default router;