import { Router, Request, Response} from "express";
import { User } from "../models/User";
import { isEmpty } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import auth from "../middlewares/auth";
import user from "../middlewares/user";
import nodeMailer from "nodemailer";

// const nodemailer = require('nodemailer');

const me = async(_:Request, res: Response) => {
    return res.json(res.locals.user);
}

// 회원가입
const signup = async(req: Request, res: Response) => {
    try {
        // 이미 사용중인 이메일인지 확인
        const emailUser = await User.findOne({ email: req.body.email });

        if(emailUser) {
            return res.json({ success: false, error: "email already exist." })
        }

        const user = new User(req.body);

        user.save((err, doc) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// 로그인
const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let errors : any = {};

        if (isEmpty(email)) errors.email = "please enter your email.";
        if (isEmpty(password)) errors.password = "please enter your password.";
        if (Object.keys(errors).length > 0) {
            return res.json(400).json(errors);
        }
        
        const user = await User.findOne({ email });

        if(!user) return res.status(404).json({ email: "this email is not registered." });

        const passwordMatches = await bcrypt.compare(password, user.password);

        if(!passwordMatches) {
            return res.status(401).json({ password: 'Oops! wrong password!' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        // 쿠키 저장
        res.set("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            secure: false
        }));

        return res.json({ user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// 로그아웃
const logout = async(_: Request, res: Response) => {
    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        })
    );

    res.status(200).json({ success: true })
};

// 회원정보 수정
const changeProfile = async(req: Request, res: Response) => {
    try {
        const { id, newPassword, newPasswordConfirm } = req.body;

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                return res.status(500).json({ error: 'Failed to update password.' });
            }

            bcrypt.hash(newPasswordConfirm, salt, async(err, hash) => {
                if(err) {
                    return res.status(500).json({ error: 'Failed to update password.' });
                }

                try {
                    await User.findByIdAndUpdate(id, {
                        password: hash,
                    }).exec((err, user) => {
                        if(err) {
                            return res.status(400).send(user);
                        }
                        return res.status(200).send(user);
                    });
                } catch (e) {
                    console.log(e);
                    return res.status(500).json({ error: 'Failed to update password.' });
                }
            })
        })
    } catch (e) {
        console.log(e);
    }
}

// 비밀번호 찾기
const findPassword = async(req: Request, res: Response) => {
    const variable = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,!,@,#,$,%,^,&,*,(,)".split(",");
    const randomPassword = createRandomPassword(variable, 8);

    // 임시 비밀번호 생성
    function createRandomPassword(variable, passwordLength) {
        let randomString = "";
        for(let i=0; i<passwordLength; i++) 
            randomString += variable[Math.floor(Math.random()*variable.length)];
            return randomString;
    }

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: { // 이메일을 보낼 계정 데이터 입력
            user: '@gmail.com',
            pass: ''
        },
    });

    const emailOptions = { // 옵션값 설정
        from: 'matcharchiveofficial@gmail.com',
        to: 'blood8879@naver.com', // email값 받아와서 발송
        subject: 'MatchArchive에서 임시 비밀번호를 알려드립니다.',
        html:
        "<h1>MatchArchive에서 새로운 임시 비밀번호를 알려드립니다.</h1> <h2> 비밀번호: " + randomPassword + "</h2>"
        +'<h3 styoe="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>'
    };
    transporter.sendMail(emailOptions, res);

    console.log()
    console.log("randomPasswd=====", randomPassword);
}

const router = Router();

router.get("/me", user, auth, me);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", user, auth, logout);
router.put("/changeProfile", user, auth, changeProfile);
router.post("/findPassword", findPassword);

export default router;