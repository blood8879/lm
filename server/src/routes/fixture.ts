import { Request, Response, Router } from "express";
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

const router = Router();
router.post("/registerFixture", registerFixture);

export default router;