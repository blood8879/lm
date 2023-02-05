import { Request, Response, Router } from "express";
import { Team } from "../models/Team";

// server단에서 multer를 이용한 이미지 업로드와 client 단에서 register request보낼 때 Date.now() 시간 차이가 발생하여 
// db적재시 시간 통일을 위한 가변수 설정.
let filenameForRegtister = "";

const registerTeam = async (req: Request, res: Response) => {
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

const router = Router();

export default router;