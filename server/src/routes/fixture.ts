import { Request, Response, Router } from "express";
import { objectToString } from "../api/utils";
import { Fixture } from "../models/Fixture";

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

// 팀별 전체 일정 가져오기
const getFixtureByTeamId = async(req: Request, res: Response) => {
    const teamId = objectToString(req.params);

    await Fixture.find({ $or: [{ homeTeam: teamId }, { awayTeam: teamId }], $and: [{ $or: [{ isFinish: false }, { isFinish: null }]}]})
        .populate('homeTeam').populate('awayTeam')
        .sort({ "matchDay": 1 })
        .exec((err, fixture) => {
            if(err) res.status(400).send(err);
            res.status(200).send(fixture);
        })
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
    const { fixtureId, isFinish, home_goals, away_goals } = req.body
    
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
        away_goals: away_goals
    }
    ).exec((err, fixture) => {
        if(err) res.status(400).send(err);
        res.status(200).json({ success: true, fixture });
    })
    
}

const router = Router();
router.post("/registerFixture", registerFixture);
router.get("/:id", getFixtureByTeamId);
router.get("/:id/detail", getDetailFixtureById);
router.put("/registerResult", registerResult);

export default router;