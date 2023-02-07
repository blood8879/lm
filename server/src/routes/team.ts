import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import { Team } from "../models/Team";
import auth from "../middlewares/auth";
import user from "../middlewares/user";

// server단에서 multer를 이용한 이미지 업로드와 client 단에서 register request보낼 때 Date.now() 시간 차이가 발생하여 
// db적재시 시간 통일을 위한 가변수 설정.
let filenameForRegtister = "";

const getTeamLists = async(req: Request, res: Response) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Team.find()
        .exec((err, teams) => {
            if(err) res.status(400).send(err);
            res.status(200).json({ teams });
        })
}

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

const router = Router();
router.get("/", getTeamLists);
router.post("/registerTeam", user, auth, registerTeam);
router.post("/registerTeam/emblemUpload", user, auth, emblemUpload.single('file'));

export default router;