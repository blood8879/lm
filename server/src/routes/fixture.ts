import { Request, Response, Router } from "express";
import { objectToString } from "../api/utils";
import { Fixture } from "../models/Fixture";
import { Squad } from "../models/Squad";

const registerFixture = async(req: Request, res: Response) => {
    try {
        const fixture = new Fixture(req.body);
        
        // 프론트 단에서 콘솔 찍을 시 GMT+9 되는것 방지하기 위해 처리할 경우 아래와 같이 처리하는 방법1.
        // 현재는 timeZone을 이용하여 back단에서 조절할 필요 없도록 코드 수정해 놓았음.
        // fixture.matchDay = new Date(fixture.matchDay);

        // fixture.matchDay.setHours(fixture.matchDay.getHours()+9);

        fixture.save((err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true, doc
            });
        });
    } catch(e) {
        console.log(e);
    }
}

// 일정/결과 가져오기
const getFixtureByTeamId = async(req: Request, res: Response) => {
    const teamId = objectToString(req.params);
    const { searchType, limit } = req.query;
    // console.log("req.params===", req.query);

    if(searchType==="fixture") {
        await Fixture.find({ $or: [{ homeTeam: teamId }, { awayTeam: teamId }], $and: [{ $or: [{ isFinish: false }, { isFinish: null }]}]})
        .populate('homeTeam').populate('awayTeam')
        .sort({ "matchDay": 1 })
        .exec((err, fixture) => {
            if(err) res.status(400).send(err);
            res.status(200).send(fixture);
        })
    } else {
        await Fixture.find({ $or: [{ homeTeam: teamId }, { awayTeam: teamId }], $and: [{ isFinish: true }]})
        .populate('homeTeam').populate('awayTeam')
        .sort({ "matchDay": 1 })
        .exec((err, fixture) => {
            if(err) res.status(400).send(err);
            res.status(200).send(fixture);
        })
    }

    
}

// 세부 경기일정 가져오기
const getDetailFixtureById = async(req: Request, res: Response) => {
    const fixtureId = objectToString(req.params);

    // console.log("params==", req.params);
    await Fixture.findById(fixtureId)
        .populate('homeTeam').populate('awayTeam')
        .exec((err, fixture) => {
            if(err) res.status(400).send(err);
            res.status(200).send(fixture);
        })
}

// 경기결과 업데이트
const registerResult = async(req: Request, res: Response) => {
    const { fixtureId, isFinish, home_goals, away_goals, homeplayergoals, awayplayergoals } = req.body
    
    // await Fixture.findOneAndUpdate(
    //     { _id: fixtureId },
    //     { $set: { isFinish: isFinish, home_goals: home_goals, away_goals: away_goals }},
    //     // { new: true },
    // ).exec((err, fixture) => {
    //     if(err) res.status(400).send(err);
    //     res.status(200).send(fixture)
    // })
    
    await Fixture.findByIdAndUpdate(fixtureId, {
        isFinish: isFinish,
        home_goals: home_goals,
        away_goals: away_goals,
        homePlayerGoals: homeplayergoals,
        awayPlayerGoals: awayplayergoals
    }
    ).exec((err, fixture) => {
        if(err) res.status(400).send(err);
        res.status(200).json({ success: true, fixture });
    })
}

// 경기 참석
const attendToMatch = async(req: Request, res: Response) => {
    const { type, fixtureId, teamId, playerId } = req.body;
    console.log("req.body==", req.body);

    // 플레이어가 팀에 속해있는지 검사
    const isPlayerRegisteredTeam = await Squad.exists({ teamId: teamId, userId: playerId});
    const fixtureInfo = await Fixture.findById(fixtureId)
    const homeTeamId = fixtureInfo.homeTeam.toHexString();
    const awayTeamId = fixtureInfo.awayTeam.toHexString();

    if(!isPlayerRegisteredTeam) return;

    // 홈,어웨이 구분하여 참석명단에 push
    if (teamId === homeTeamId && type=="Attend") {
        await Fixture.findByIdAndUpdate(fixtureId, {
            $push: { homeSquad: playerId },
            $pull: { homeAbsent: playerId }
        }).exec((err, squad) => {
            if(err) res.status(400).send(err);
            res.status(200).send(squad)
        })
    } else if(teamId === awayTeamId && type=="Attend") {
        await Fixture.findByIdAndUpdate(fixtureId, {
            $push: { awaySquad: playerId },
            $pull: { awayAbsent: playerId }
        }).exec((err, squad) => {
            if(err) res.status(400).send(err);
            res.status(200).send(squad)
        })
    } else if(teamId === homeTeamId && type=="noAttend") {
        await Fixture.findByIdAndUpdate(fixtureId, {
            $pull: { homeSquad: playerId },
            $push: { homeAbsent: playerId },
        }).exec((err, squad) => {
            if(err) res.status(400).send(err);
            res.status(200).send(squad);
        })
    } else {
        await Fixture.findByIdAndUpdate(fixtureId, {
            $pull: { awaySquad: playerId },
            $push: { awayAbsent: playerId }
        }).exec((err, squad) => {
            if(err) res.status(400).send(err);
            res.status(200).send(squad);
        })
    }
    // let updateObj = {};
    // if(type == "Attend") {
    //     if(teamId == homeTeamId) updateObj = { $push: { homeSquad: playerId } };
    //     else updateObj = { $push: { awaySquad: playerId } };
    // } else if(type=="noAttend") {
    //     if(teamId == homeTeamId) updateObj = { $pull: { homeSquad: playerId } };
    //     else updateObj = { $pull: { awaySquad: playerId } };
    // }

    // await Fixture.findByIdAndUpdate(fixtureId, updateObj, (err, squad) => {
    //     if(err) res.status(400).send(err);
    //     res.status(200).send(squad);
    // }).exec();
}

const router = Router();
router.post("/registerFixture", registerFixture);
router.get("/:id", getFixtureByTeamId);
router.get("/:id/detail", getDetailFixtureById);
router.put("/registerResult", registerResult);
router.put("/attendToMatch", attendToMatch);

export default router;